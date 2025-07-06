export interface ScholarProfile {
  name: string;
  hIndex: number;
  citations: number;
  i10Index: number;
}

export const fetchScholarProfile = async (authorId: string): Promise<ScholarProfile | null> => {
  const endpoint = `https://r.jina.ai/http://scholar.google.com/citations?user=${authorId}&hl=en&oi=ao`;
  // jina.ai extracts readable text; quick workaround to circumvent CORS.
  const res = await fetch(endpoint);
  if (!res.ok) return null;
  const text = await res.text();
  // naive parse
  const hMatch = text.match(/h-index\s*(\d+)/i);
  const cMatch = text.match(/Citations\s*(\d+)/i);
  const i10Match = text.match(/i10-index\s*(\d+)/i);
  return {
    name: authorId,
    hIndex: hMatch ? parseInt(hMatch[1], 10) : 0,
    citations: cMatch ? parseInt(cMatch[1], 10) : 0,
    i10Index: i10Match ? parseInt(i10Match[1], 10) : 0
  };
};