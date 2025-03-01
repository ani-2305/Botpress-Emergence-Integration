import { IntegrationDefinition } from '@botpress/sdk'
import z from 'zod'

export default new IntegrationDefinition({
  name: 'emergence-integration',
  version: '0.1.0',
  
  configuration: {
    schema: z.object({
      apiKey: z.string().describe('Your Emergence API key')
    }) as any
  },

  actions: {
    callOrchestrator: {
      input: {
        schema: z.object({
          prompt: z.string().describe('User query to pass to Emergence orchestrator')
        }) as any
      },
      output: {
        schema: z.object({
          text: z.string().describe('Response from the Emergence orchestrator')
        }) as any
      }
    }
  },

  events: {},
  channels: {},
  user: {
    tags: {}
  }
}) 