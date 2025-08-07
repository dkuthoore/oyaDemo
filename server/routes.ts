import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Gemini service
  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    : null;

  const chatRequestSchema = z.object({
    message: z.string(),
    concept: z.string().optional(),
  });

  // Concept to prompt mapping
  const getConceptPrompt = (concept: string): string => {
    const conceptMap: Record<string, string> = {
      stablecoin: "Stablecoins",
      circle: "Circle (the company behind USDC)",
      "oya-protocol": "Oya Protocol",
      testnet: "Blockchain testnets",
      dogecoin: "Dogecoin",
      "supply-cap": "Supply cap in cryptocurrency tokenomics",
      hardfork: "Blockchain hardforks",
      "gas-limit": "Gas limits in blockchain networks",
      "private-keys": "Private keys in cryptocurrency",
      "seed-phrases": "Seed phrases and wallet recovery",
      "cold-storage": "Cold storage for cryptocurrency",
      layer2: "Layer 2 scaling solutions",
      optimism: "Optimism Layer 2 network",
      arbitrum: "Arbitrum Layer 2 network",
    };

    const conceptName = conceptMap[concept] || concept;
    return `Teach me about ${conceptName}. Give me a brief, concise overview.`;
  };

  // Lesson generation endpoint
  app.post("/api/generate-lesson", async (req: Request, res: Response) => {
    try {
      const { topic } = req.body;

      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const prompt = `Please generate a thorough, detailed, 10-page lesson on ${topic}. Assume the user is a beginner and start with fundamental, simple concepts, building in complexity as the lesson goes on. Give prominent examples, cite sources, and be professional. The output should be in json and should have a title, summary, table of contents, content, and quiz section.

Use this JSON structure:
{
  "title": "Introduction to ${topic}",
  "summary": "A 2-sentence summary of what this lesson covers and what students will learn.",
  "tableOfContents": {
    "1": "Section 1 title",
    "2": "Section 2 title",
    "3": "Section 3 title"
  },
  "content": [
    {
      "sectionNumber": 1,
      "title": "Section title",
      "body": "Detailed content here..."
    }
  ],
  "quiz": [
    {
      "question": "Question text?",
      "options": ["Option 1", "Option 2", "Option 3"],
      "answer": "Correct option"
    }
  ]
}`;

      const veniceResponse = await fetch(
        "https://api.venice.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.VENICE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "qwen-2.5-qwq-32b",
            messages: [
              {
                role: "system",
                content:
                  "You are an AI Tutor with the role of teaching users various topics in the Web3, Cryptocurrency, and Blockchain industry. Whatever prompts you receive, remember that you are only an expert in cryptocurrency, and you should not answer questions about unrelated topics. For any given topic, you will create a 10 page lesson on the topic, along with a corresponding quiz to test the user's understanding of the topic. All of your responses should be clear, and easy to understand. Also, format your output using markdown formatting syntax, make sure things look professional and well formatted.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 8000,
          }),
        },
      );

      if (!veniceResponse.ok) {
        console.error("Venice API error:", await veniceResponse.text());
        return res.status(500).json({ error: "Failed to generate lesson" });
      }

      const veniceData = await veniceResponse.json();
      const content = veniceData.choices[0].message.content;

      // Try to parse JSON from the response
      let lessonData;
      try {
        // Extract JSON from the response (it might be wrapped in markdown)
        const jsonMatch =
          content.match(/```json\n?(.*?)\n?```/) ||
          content.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
        lessonData = JSON.parse(jsonString);
      } catch (parseError) {
        console.error("Failed to parse lesson JSON:", parseError);
        return res
          .status(500)
          .json({ error: "Failed to parse lesson content" });
      }

      res.json({ lesson: lessonData });
    } catch (error) {
      console.error("Lesson generation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Chat endpoint with streaming
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, concept } = chatRequestSchema.parse(req.body);

      if (!ai) {
        return res.status(500).json({ error: "Gemini API not configured" });
      }

      // Use concept prompt if provided, otherwise use the user message (system prompt handles formatting)
      const prompt = concept ? getConceptPrompt(concept) : message;

      // Set up streaming response
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: {
            role: "system",
            parts: [
              {
                text: "You are an AI Chatbot with the role of teaching users various topics in the Web3, Cryptocurrency, and Blockchain industry. Whatever prompts you receive, remember that you are only an expert in cryptocurrency, and you should not answer questions about unrelated topics. All of your responses should be clear, concise (2 paragraphs or less), and easy to understand. Also, format your output using markdown formatting syntax.",
              },
            ],
          },
        },
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
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
