import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';

export async function registerRoutes(app: Express): Promise<Server> {
  // Gemini service
  const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

  const chatRequestSchema = z.object({
    message: z.string(),
    concept: z.string().optional()
  });

  // Concept to prompt mapping
  const getConceptPrompt = (concept: string): string => {
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
  };

  // Chat endpoint with streaming
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, concept } = chatRequestSchema.parse(req.body);
      
      if (!ai) {
        return res.status(500).json({ error: 'Gemini API not configured' });
      }

      // Use concept prompt if provided, otherwise use the user message
      const prompt = concept ? getConceptPrompt(concept) : message;
      
      // Set up streaming response
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          res.write(text);
        }
      }
      
      res.end();
    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
