"use client";

import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const starterCode = `function solve(nums: number[]): number {
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    while (false) {
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`;

export default function CodeEditor({
  value = starterCode,
  onChange,
}: CodeEditorProps) {
  return (
    <div className="h-full flex flex-col border-l border-r border-[--border] bg-[--bg]">
      {/* header */}
      <div className="h-11 px-4 flex items-center justify-between border-b border-[--border] bg-[--panel]">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[--text] font-medium">solution.ts</span>
          <span className="text-[--muted] text-xs">TypeScript</span>
        </div>

        <button className="px-3 py-1 text-xs rounded-md bg-[--primary] text-white hover:opacity-90 transition">
          Run
        </button>
      </div>

      {/* editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={value}
          onChange={(v) => onChange?.(v ?? "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "var(--font-mono)",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbersMinChars: 3,
            padding: {
              top: 12,
            },
          }}
        />
      </div>
    </div>
  );
}