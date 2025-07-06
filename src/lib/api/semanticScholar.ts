export interface PaperSummary {
  paperId: string;
  title: string;
  year: number;
  citationCount: number;
  authors: string[];
}

export const fetchPaper = async (paperId: string): Promise<PaperSummary | null> => {
  const res = await fetch(`https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=title,year,citationCount,authors`);
  if (!res.ok) return null;
  const json = await res.json();
  return {
    paperId: json.paperId,
    title: json.title,
    year: json.year,
    citationCount: json.citationCount,
    authors: json.authors?.map((a: any) => a.name) ?? []
  };
};