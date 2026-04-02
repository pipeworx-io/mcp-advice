/**
 * Advice MCP — wraps Advice Slip API (free, no auth)
 *
 * Tools:
 * - random_advice: Get a random piece of advice
 * - search_advice: Search for advice slips by keyword
 * - get_advice: Get a specific advice slip by ID
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.adviceslip.com';

type RawAdviceSlip = {
  id: number;
  advice: string;
};

type RawRandomResponse = {
  slip: RawAdviceSlip;
};

type RawSearchResponse = {
  total_results: string;
  query: string;
  slips: RawAdviceSlip[] | string;
  message?: { type: string; text: string };
};

type RawGetResponse = {
  slip: RawAdviceSlip;
};

function formatSlip(slip: RawAdviceSlip) {
  return {
    id: slip.id,
    advice: slip.advice,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_advice',
    description: 'Get a random piece of advice from the Advice Slip API.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'search_advice',
    description: 'Search for advice slips containing a specific keyword or phrase.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword or phrase to search for within advice text.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_advice',
    description: 'Get a specific advice slip by its numeric ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The numeric ID of the advice slip to retrieve.',
        },
      },
      required: ['id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_advice':
      return randomAdvice();
    case 'search_advice':
      return searchAdvice(args.query as string);
    case 'get_advice':
      return getAdvice(args.id as number);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomAdvice() {
  const res = await fetch(`${BASE_URL}/advice`);
  if (!res.ok) throw new Error(`Advice Slip API error: ${res.status}`);

  const data = (await res.json()) as RawRandomResponse;
  return formatSlip(data.slip);
}

async function searchAdvice(query: string) {
  const res = await fetch(`${BASE_URL}/advice/search/${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Advice Slip API error: ${res.status}`);

  const data = (await res.json()) as RawSearchResponse;

  // API returns { message: { type: "notice", text: "..." } } when no results found
  if (data.message) {
    return { total_results: 0, query, slips: [] };
  }

  const slips = Array.isArray(data.slips) ? data.slips : [];

  return {
    total_results: parseInt(data.total_results, 10),
    query: data.query,
    slips: slips.map(formatSlip),
  };
}

async function getAdvice(id: number) {
  const res = await fetch(`${BASE_URL}/advice/${id}`);
  if (!res.ok) throw new Error(`Advice Slip API error: ${res.status}`);

  const data = (await res.json()) as RawGetResponse;
  return formatSlip(data.slip);
}

export default { tools, callTool } satisfies McpToolExport;
