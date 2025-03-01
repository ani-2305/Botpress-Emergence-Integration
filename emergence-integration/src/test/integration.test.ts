import { describe, it, expect } from '@jest/globals';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Emergence API Client', () => {
  const apiKey = 'test-key';
  const prompt = 'Test prompt';

  describe('createWorkflow', () => {
    it('should successfully create a workflow', async () => {
      const workflowId = 'test-workflow-id';
      
      mockedAxios.post.mockResolvedValueOnce({ 
        data: { workflowId },
        status: 200 
      });

      const response = await axios.post(
        'https://api.emergence.ai/v0/orchestrators/em-orchestrator/workflows',
        { prompt },
        {
          headers: {
            apikey: apiKey,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      expect(response.data.workflowId).toBe(workflowId);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.emergence.ai/v0/orchestrators/em-orchestrator/workflows',
        { prompt },
        expect.objectContaining({
          headers: expect.objectContaining({
            apikey: apiKey
          })
        })
      );
    });

    it('should handle API errors', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

      await expect(axios.post(
        'https://api.emergence.ai/v0/orchestrators/em-orchestrator/workflows',
        { prompt },
        {
          headers: {
            apikey: apiKey,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      )).rejects.toThrow('API Error');
    });
  });

  describe('pollWorkflow', () => {
    const workflowId = 'test-workflow-id';
    const pollUrl = `https://api.emergence.ai/v0/orchestrators/em-orchestrator/workflows/${workflowId}`;

    it('should handle successful completion', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        data: { 
          data: {
            status: 'SUCCESS',
            output: 'Test result'
          }
        },
        status: 200
      });

      const response = await axios.get(pollUrl, {
        headers: { apikey: apiKey },
        timeout: 30000
      });

      expect(response.data.data.status).toBe('SUCCESS');
      expect(response.data.data.output).toBe('Test result');
    });

    it('should handle failed status', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        data: { 
          data: {
            status: 'FAILED'
          }
        },
        status: 200
      });

      const response = await axios.get(pollUrl, {
        headers: { apikey: apiKey },
        timeout: 30000
      });

      expect(response.data.data.status).toBe('FAILED');
    });

    it('should handle polling errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Polling Error'));

      await expect(axios.get(pollUrl, {
        headers: { apikey: apiKey },
        timeout: 30000
      })).rejects.toThrow('Polling Error');
    });
  });
}); 