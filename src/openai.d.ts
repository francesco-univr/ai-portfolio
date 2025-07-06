declare module 'openai' {
  class OpenAI {
    constructor(options: { apiKey: string });
    chat: {
      completions: {
        create(args: any): Promise<any>;
      };
    };
  }
  export default OpenAI;
}