import CodeEditor from "@/components/editor/codeEditor";

export default function InterviewSessionPage() {
  return (
    <div className="h-full grid grid-cols-[320px_1fr_360px]">
      {/* Problem Panel */}
      <div className="border-r border-[--border] bg-[--bg]">
        <div className="h-11 px-4 flex items-center border-b border-[--border] bg-[--panel]">
          <span className="text-sm font-medium text-[--text]">
            Problem
          </span>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100%-44px)]">
          <h1 className="text-lg font-semibold text-[--text] mb-3">
            Longest Subarray
          </h1>

          <p className="text-sm text-[--muted] leading-6">
            Given an array of integers, return the length of the longest valid
            subarray satisfying the required condition.
          </p>
        </div>
      </div>

      {/* Code Editor */}
      <CodeEditor />

      {/* Interview Panel */}
      <div className="border-l border-[--border] bg-[--bg]">
        <div className="h-11 px-4 flex items-center justify-between border-b border-[--border] bg-[--panel]">
          <span className="text-sm font-medium text-[--text]">
            Interview
          </span>

          <span className="text-xs text-[--muted]">
            24:15 remaining
          </span>
        </div>

        <div className="p-5">
          {/* Stage */}
          <div className="mb-5 text-xs uppercase tracking-wide text-[--muted]">
            Understanding → Approach → Coding → Review
          </div>

          {/* Question */}
          <div className="mb-4">
            <p className="text-sm text-[--text] leading-6">
              What is your initial approach to solve this problem?
            </p>
          </div>

          {/* Answer */}
          <textarea
            placeholder="Explain your approach..."
            className="w-full h-40 resize-none rounded-md border border-[--border] bg-[--panel] text-[--text] placeholder:text-[--muted] p-3 outline-none"
          />

          {/* Submit */}
          <button className="mt-4 w-full rounded-md bg-[--primary] py-2 text-sm font-medium text-white hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}