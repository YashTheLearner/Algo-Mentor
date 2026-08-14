"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  language?: string;
  onChange: (value: string) => void;
}

export function CodeEditor({
  code,
  language = "typescript",
  onChange,
}: CodeEditorProps) {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => {
          onChange(value ?? "");
        }}
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
          wordWrap: "on",
          tabSize: 2,
        }}
      />
    </div>
  );
}