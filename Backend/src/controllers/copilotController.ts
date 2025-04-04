import { Request, Response } from "express";
import openai from "../config/copilot";

export const testCopilotConnection = async (req: Request, res: Response) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Please tell me what is 2+2? write only final result!" }],
      model: "gpt-35-turbo-instruct",
      max_tokens: 50,

    });

    res.json(response.choices);
  } catch (error) {
    console.error("Azure OpenAI Error:", error);
    res.status(500).json({ error: "Failed to connect to Azure OpenAI" });
  }
};