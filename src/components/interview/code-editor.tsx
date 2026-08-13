"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  initialCode: string;
  language?: string;
}

export function CodeEditor({
  initialCode,
  language = "typescript",
}: CodeEditorProps) {
  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        defaultValue={initialCode}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          lineHeight: 22,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: {
            top: 14,
            bottom: 14,
          },
        }}
      />
    </div>
  );
}