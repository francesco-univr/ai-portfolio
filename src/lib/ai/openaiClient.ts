import OpenAI from 'openai';

// Singleton pattern to avoid multiple initializations
let client: OpenAI | null = null;

export const getOpenAIClient = () => {
  if (!client) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error('OpenAI API key not provided. Set VITE_OPENAI_API_KEY env variable.');
    }
    client = new OpenAI({ apiKey });
  }
  return client;
};