export interface ChatRequest {
  message: string;
  concept?: string;
}

export interface ChatResponse {
  success: boolean;
  error?: string;
}

class ChatService {
  async sendMessage(request: ChatRequest): Promise<ReadableStream<string>> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    // Create a readable stream from the response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    return new ReadableStream({
      start(controller) {
        function pump(): Promise<void> {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            
            const text = decoder.decode(value, { stream: true });
            controller.enqueue(text);
            return pump();
          });
        }
        return pump();
      }
    });
  }

  getConceptDisplayName(conceptId: string): string {
    const conceptMap: Record<string, string> = {
      'stablecoin': 'Stablecoins',
      'circle': 'Circle',
      'oya-protocol': 'Oya Protocol',
      'testnet': 'Testnet',
      'dogecoin': 'Dogecoin',
      'supply-cap': 'Supply Cap',
      'hardfork': 'Hardfork',
      'gas-limit': 'Gas Limit',
      'private-keys': 'Private Keys',
      'seed-phrases': 'Seed Phrases',
      'cold-storage': 'Cold Storage',
      'layer2': 'Layer 2 Solutions',
      'optimism': 'Optimism',
      'arbitrum': 'Arbitrum'
    };

    return conceptMap[conceptId] || conceptId;
  }
}

export const chatService = new ChatService();