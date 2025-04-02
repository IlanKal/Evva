import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;


if (!endpoint || !apiKey) {
  throw new Error("Missing Azure OpenAI configuration in .env");
}

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: `${endpoint}/openai/deployments/gpt-35-turbo-instruct`,
  defaultQuery: { 'api-version': '2025-01-01-preview' },
  defaultHeaders: { 'api-key': apiKey },
});

export default openai;
