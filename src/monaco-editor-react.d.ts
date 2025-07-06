declare module '@monaco-editor/react' {
  import * as React from 'react';
  import type * as Monaco from 'monaco-editor';

  export interface OnMount {
    (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco): void;
  }

  export interface EditorProps {
    height?: string | number;
    language?: string;
    value?: string;
    defaultLanguage?: string;
    defaultValue?: string;
    theme?: string;
    onChange?: (value: string | undefined) => void;
    onMount?: OnMount;
    options?: { [key: string]: any };
  }

  const Editor: React.FC<EditorProps>;
  export default Editor;
}