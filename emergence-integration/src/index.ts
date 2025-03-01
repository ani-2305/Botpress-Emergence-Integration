import { Integration } from '@botpress/sdk'
import axios from 'axios'
import { integrationName } from '../package.json'

interface Config {
  apiKey: string
}

interface ActionInput {
  prompt: string
}

interface ActionOutput {
  text: string
}

type EmergenceDefinition = {
  name: typeof integrationName
  configuration: Config
  actions: {
    callOrchestrator: {
      input: ActionInput
      output: ActionOutput
    }
  }
}

export default new Integration({
  actions: {
    callOrchestrator: async ({ ctx, input }: { ctx: any; input: any }) => {
      const apiKey: string = ctx.configuration.apiKey
      const prompt: string = input.prompt

      if (!apiKey) {
        throw new Error('No Emergence API key configured.')
      }

      // Step A: Create Emergence workflow
      let workflowId: string
      try {
        const createResp = await axios.post(
          'https://api.emergence.ai/v0/orchestrators/em-orchestrator/workflows',
          { prompt },
          {
            headers: {
              apikey: apiKey,
              'Content-Type': 'application/json'
            },
            timeout: 30000
          }
        )
        workflowId = createResp.data.workflowId
      } catch (err) {
        throw new Error(`Error creating Emergence workflow: ${(err as Error).message}`)
      }

      const pollUrl = `https://api.emergence.ai/v0/orchestrators/em-orchestrator/workflows/${workflowId}`

      // Step B: Poll for status
      let attempts = 0
      const maxAttempts = 10
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

      while (attempts < maxAttempts) {
        attempts++
        await delay(10000) // 10s between polls

        try {
          const pollResp = await axios.get(pollUrl, {
            headers: { apikey: apiKey },
            timeout: 30000
          })

          const dataObj = pollResp.data?.data || {}
          const status = dataObj.status || 'UNKNOWN'

          if (status === 'SUCCESS') {
            // Return the final text
            const text: string = dataObj.output ?? 'No output provided by Emergence.'
            return { text }
          } else if (status === 'FAILED' || status === 'TIMEOUT') {
            return { text: `Workflow ended with status ${status}` }
          }
        } catch (err) {
          throw new Error(`Polling error: ${(err as Error).message}`)
        }
      }

      return { text: 'No result after maximum polling attempts.' }
    }
  },

  register: async ({ logger }: { logger: any }) => {
    logger.forBot().info('Botpress integration enabled!')
  },

  unregister: async () => {
    // Cleanup if needed
  },

  handler: async () => {
    // Typically Emergence does not push data via webhooks, so no special logic needed
  },

  channels: {}
})
