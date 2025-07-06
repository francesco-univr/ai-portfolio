import { VercelRequest, VercelResponse } from '@vercel/node';
import { getOpenAIClient } from '../src/lib/ai/openaiClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body as { text: string };
  if (!text) {
    return res.status(400).json({ error: 'Text not provided' });
  }

  try {
    const openai = getOpenAIClient();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an academic assistant. Extract key research concepts and output JSON array of ConceptEvolution objects.'
        },
        { role: 'user', content: text }
      ],
      response_format: { type: 'json_object' }
    });

    const json = response.choices[0].message.content;
    res.json(JSON.parse(json ?? '[]'));
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
}