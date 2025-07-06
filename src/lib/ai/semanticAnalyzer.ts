import { getOpenAIClient } from './openaiClient';

export interface ConceptEvolution {
  concept: string;
  timeline: Array<{
    date: string;
    relevance_score: number;
    context: string;
  }>;
  trend_direction: 'emerging' | 'stable' | 'declining';
  related_concepts: string[];
}

export class SemanticAnalyzer {
  async extractConcepts(text: string): Promise<ConceptEvolution[]> {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // fallback: gpt-3.5-turbo
      messages: [
        {
          role: 'system',
          content:
            'You are an academic research assistant. Extract key research concepts, their evolution over time and relationships from the user text. Return ONLY valid JSON matching the TypeScript ConceptEvolution[] schema.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2
    });

    try {
      const parsed = JSON.parse(response.choices[0].message.content ?? '[]');
      return parsed as ConceptEvolution[];
    } catch (err) {
      console.error('Failed to parse OpenAI response', err);
      return [];
    }
  }
}