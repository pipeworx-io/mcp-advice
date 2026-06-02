# mcp-advice

Advice MCP — wraps Advice Slip API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_advice` | Get a random piece of advice. Returns the advice text and slip ID for reference or follow-up queries. |
| `search_advice` | Search for advice by keyword or phrase (e.g., "confidence", "relationships"). Returns matching advice slips with text and IDs. |
| `get_advice` | Get a specific advice slip by its numeric ID (e.g., "42"). Returns the full advice text. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "advice": {
      "url": "https://gateway.pipeworx.io/advice/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Advice data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
