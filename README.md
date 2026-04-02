# @pipeworx/mcp-advice

MCP server for the [Advice Slip API](https://api.adviceslip.com) — get random advice, search advice slips, and look up by ID. Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `random_advice` | Get a random piece of advice |
| `search_advice` | Search for advice slips by keyword |
| `get_advice` | Get a specific advice slip by ID |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "advice": {
      "type": "url",
      "url": "https://gateway.pipeworx.io/advice"
    }
  }
}
```

## CLI Usage

```bash
npx @anthropic-ai/mcp-client https://gateway.pipeworx.io/advice
```

## License

MIT
