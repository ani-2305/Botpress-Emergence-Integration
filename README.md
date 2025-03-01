# Botpress Emergence AI Web Orchestrator Integration

This integration allows you to use [Emergence AI's Web Orchestrator](https://api.emergence.ai/) within your Botpress chatbots. It enables your bots to perform web automation tasks through natural language commands using Emergence AI's powerful web automation capabilities.

---

## Project Overview

- **`integration.definition.ts`**: Main TypeScript file that:
  1. Defines the integration configuration schema
  2. Specifies the integration's actions
  3. Sets up the integration metadata (name, version, title)

- **`src/index.ts`**: Implementation file that:
  1. Handles API communication with Emergence
  2. Creates and polls web automation workflows
  3. Returns responses to the chatbot

- **`src/test/integration.test.ts`**: Test suite that:
  1. Verifies the integration's functionality
  2. Tests workflow creation and polling
  3. Ensures proper error handling

- **`icon.svg`**: Integration icon displayed in the Botpress interface

---

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or later)
- pnpm package manager
- A Botpress Cloud account
- An Emergence AI API key

### 2. Install Dependencies

```bash
pnpm install
```

This installs all necessary dependencies defined in `package.json`.

### 3. Configure the Integration

When adding the integration to your chatbot, you'll need to provide:
- Your Emergence AI API key

The integration will securely store this configuration.

### 4. Build and Deploy

```bash
pnpm run build
pnpm run deploy
```

This will:
1. Build the integration
2. Deploy it to your Botpress Cloud workspace
3. Make it available for use in your chatbots

### 5. Use in Your Chatbot

Once deployed, you can use the integration's action in your chatbot flows:

1. Configure the Integration:
   - Go to your Botpress Cloud dashboard
   - Navigate to "Integrations"
   - Find "Emergence Web Orchestrator"
   - Click "Configure"
   - Enter your Emergence API key in the required field
   - Save the configuration

2. Add to Your Flow:
   - Add an "Integration" node
   - Select "Emergence Web Orchestrator"
   - Choose the "Call Orchestrator" action
   - Configure the prompt for web automation

Example prompt:
```
Please go to CNN.com and find the latest AI investment news.
```

The integration will:
- Send the prompt to Emergence AI
- Create a web automation workflow
- Poll for results
- Return the findings to your chatbot

---

## Integration Structure

- **`integration.definition.ts`**  
  Defines the integration's interface including:
  - Configuration schema (API key)
  - Available actions
  - Integration metadata

- **`src/index.ts`**  
  Contains the core implementation:
  - API communication with Emergence
  - Workflow management
  - Response handling

- **`src/test/integration.test.ts`**  
  Test suite ensuring:
  - Proper API interaction
  - Error handling
  - Response formatting

---

## Action Details

### Call Orchestrator

**Input Schema:**
```typescript
{
  prompt: string // User query to pass to Emergence orchestrator
}
```

**Output Schema:**
```typescript
{
  text: string // The response from Emergence
}
```

This action:
1. Takes a natural language prompt
2. Creates an Emergence workflow
3. Polls for completion
4. Returns the results

---

## Error Handling

The integration handles various scenarios:
- Invalid API keys
- Network errors
- Timeout conditions
- Failed workflows

Each error is properly caught and returns meaningful messages to the chatbot.

---

## Testing

Run the test suite:

```bash
pnpm test
```

This runs all tests in `src/test/integration.test.ts` to verify:
- Integration functionality
- API communication
- Error handling

---

## Support

For issues with:
- **Botpress Integration**: Contact Botpress support
- **Emergence AI**: Visit [Emergence AI support](https://api.emergence.ai/)

--- 