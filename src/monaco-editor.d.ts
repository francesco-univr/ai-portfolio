declare module 'monaco-editor' {
  export namespace editor {
    // Minimal subset used in the project – extend as needed
    interface IStandaloneCodeEditor {
      getValue(): string;
      setValue(value: string): void;
      layout(): void;
    }
  }
}