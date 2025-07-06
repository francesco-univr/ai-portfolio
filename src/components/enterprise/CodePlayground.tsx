import React, { useState, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';

// ---------------------------------------------------------------------------------------------------------------------
// Supported languages – extend as additional runtimes become available
// ---------------------------------------------------------------------------------------------------------------------

export type PlaygroundLanguage = 'javascript' | 'typescript' | 'python' | 'r';

interface ExecutionResult {
  output: string;
  errors?: string;
  timeMs: number;
}

// ---------------------------------------------------------------------------------------------------------------------
// Web-Worker based evaluator for JavaScript / TypeScript (simple prototype)
// ---------------------------------------------------------------------------------------------------------------------

const runJsInWorker = (code: string): Promise<string> => {
  return new Promise((resolve) => {
    const blob = new Blob([
      `self.onmessage = async (e) => {\n` +
        `  try {\n` +
        `    const result = await (async () => { ${code} })();\n` +
        `    self.postMessage({ type: 'success', value: result });\n` +
        `  } catch (err) {\n` +
        `    self.postMessage({ type: 'error', value: err?.toString?.() });\n` +
        `  }\n` +
        `};`
    ], { type: 'application/javascript' });

    const worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = (e) => {
      if (e.data.type === 'success') {
        resolve(String(e.data.value));
      } else {
        resolve(`Error: ${e.data.value}`);
      }
      worker.terminate();
    };
    worker.postMessage({});
  });
};

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------

export const CodePlayground: React.FC = () => {
  const [language, setLanguage] = useState<PlaygroundLanguage>('javascript');
  const [code, setCode] = useState<string>(`// Write your JS here\nconsole.log('Hello world');`);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [running, setRunning] = useState(false);
  const editorRef = useRef<any>();

  const runCode = useCallback(async () => {
    setRunning(true);
    const start = performance.now();
    try {
      let output = '';
      if (language === 'javascript' || language === 'typescript') {
        output = await runJsInWorker(code);
      } else {
        output = `Runtime for ${language} not yet available.`;
      }
      const timeMs = performance.now() - start;
      setResult({ output: String(output), timeMs });
    } catch (err: any) {
      setResult({ output: '', errors: err?.message ?? String(err), timeMs: 0 });
    } finally {
      setRunning(false);
    }
  }, [code, language]);

  return (
    <div className="w-full h-full flex flex-col bg-cyber-black/80 rounded-xl overflow-hidden text-white">
      <div className="flex items-center px-4 py-2 gap-4 bg-midnight">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as PlaygroundLanguage)}
          className="bg-gray-800 text-white rounded px-2 py-1 text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python (coming soon)</option>
          <option value="r">R (coming soon)</option>
        </select>
        <button
          onClick={runCode}
          disabled={running}
          className="px-3 py-1 bg-neon-blue/90 hover:bg-neon-blue rounded text-sm disabled:opacity-60"
        >
          {running ? 'Running…' : 'Run'}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={(value: string | undefined) => setCode(value ?? '')}
          onMount={(editor: Monaco.editor.IStandaloneCodeEditor) => {
            editorRef.current = editor;
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontFamily: 'Fira Code, monospace',
            fontSize: 14,
            automaticLayout: true
          }}
        />
      </div>

      {/* Output */}
      <div className="px-4 py-3 bg-cyber-black text-sm border-t border-gray-700 min-h-24 overflow-auto whitespace-pre-wrap">
        {result ? (
          result.errors ? (
            <span className="text-red-400">{result.errors}</span>
          ) : (
            <span>{result.output}</span>
          )
        ) : (
          <span className="text-gray-400">Output will appear here</span>
        )}
        {result && (
          <div className="mt-2 text-xs text-gray-500">Executed in {result.timeMs.toFixed(1)} ms</div>
        )}
      </div>
    </div>
  );
};

export default CodePlayground;