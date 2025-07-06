declare module '@vercel/node' {
  export interface VercelRequest {
    method?: string;
    body?: any;
    query?: any;
    headers?: any;
  }
  export interface VercelResponse {
    status(code: number): VercelResponse;
    json(obj: any): void;
  }
}