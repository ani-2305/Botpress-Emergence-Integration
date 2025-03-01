import { IntegrationDefinition } from '@botpress/sdk'
import { z } from '@botpress/sdk'

const INTEGRATION_NAME = 'botpress-emergence-integration'

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  version: '0.1.0',
  title: 'Emergence Web Orchestrator',

  configuration: {
    schema: z.object({
      apiKey: z.string().describe('Your Emergence API key')
    })
  },

  // No events for this integration
  events: {},

  // A single action to "call the orchestrator"
  actions: {
    callOrchestrator: {
      input: {
        schema: z.object({
          prompt: z.string().describe('User query to pass to Emergence orchestrator')
        })
      },
      output: {
        schema: z.object({
          text: z.string().describe('The response from Emergence')
        })
      }
    }
  },

  icon: 'icon.svg',

  // No channels needed for this example
  channels: {},

  // No user tags needed
  user: {
    tags: {}
  }
})
