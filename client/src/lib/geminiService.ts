import { GoogleGenAI } from "@google/genai";

class GeminiService {
  private ai: GoogleGenAI | null = null;
  
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.ai) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async *streamResponse(prompt: string): AsyncGenerator<string> {
    if (!this.ai) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const response = await this.ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error('Gemini streaming error:', error);
      throw new Error('Failed to stream AI response');
    }
  }

  getConceptPrompt(concept: string): string {
    const conceptMap: Record<string, string> = {
      'stablecoin': 'Stablecoins',
      'circle': 'Circle (the company behind USDC)',
      'oya-protocol': 'Oya Protocol',
      'testnet': 'Blockchain testnets',
      'dogecoin': 'Dogecoin',
      'supply-cap': 'Supply cap in cryptocurrency tokenomics',
      'hardfork': 'Blockchain hardforks',
      'gas-limit': 'Gas limits in blockchain networks',
      'private-keys': 'Private keys in cryptocurrency',
      'seed-phrases': 'Seed phrases and wallet recovery',
      'cold-storage': 'Cold storage for cryptocurrency',
      'layer2': 'Layer 2 scaling solutions',
      'optimism': 'Optimism Layer 2 network',
      'arbitrum': 'Arbitrum Layer 2 network'
    };

    const conceptName = conceptMap[concept] || concept;
    return `Give me a brief overview of ${conceptName}`;
  }
}

export const geminiService = new GeminiService();