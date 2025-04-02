import { Request, Response } from "express";
import { AzureOpenAI } from "azure-openai"; // ייבוא הספרייה

// יצירת אובייקט של ה-Azure OpenAI Client
const openAIClient = new AzureOpenAI({
  apiKey: process.env.COPILOT_API_KEY, // ודא שה-API Key נמצא בקובץ .env
  endpoint: process.env.COPILOT_ENDPOINT, // Endpoint של Azure Copilot
});

// פונקציה שמבצעת קריאה ל-API של Copilot
export const testCopilotConnection = async (req: Request, res: Response) => {
  try {
    // שליחה של בקשה ל-API של Copilot דרך ה-Azure OpenAI Client
    const response = await openAIClient.completions.create({
      model: "gpt-3.5-turbo", // או כל מודל אחר שברצונך להשתמש בו
      prompt: "Hello, Copilot!",
      max_tokens: 5,
    });

    // מחזירים את התשובה מה-API
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to Copilot API" });
  }
};
