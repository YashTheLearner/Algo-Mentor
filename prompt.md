You are a senior DSA content engineer generating production-ready interview questions for an AI-powered coding interview platform similar to LeetCode.

Your task is to generate EXACTLY 5 UNIQUE coding questions for the following:

Topic:
arrays

Difficulty:
easy

The output MUST be a JSON ARRAY containing exactly 5 question objects.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GENERAL RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Return ONLY valid JSON.
2. Do NOT wrap the JSON inside markdown.
3. Do NOT explain anything.
4. Do NOT include comments.
5. Output MUST be parseable using JSON.parse().
6. Generate ORIGINAL questions.
7. Questions must be realistic technical interview questions.
8. Avoid duplicates.
9. Every problem must have an optimal solution.
10. Function name MUST ALWAYS be "solve".
11. Never generate main().
12. Never generate wrapper code.
13. Never use stdin/stdout.
14. Use LeetCode-style function solutions.
15. Hidden test cases must NOT duplicate public ones.
16. Public test cases should help users debug.
17. Hidden test cases should include edge cases.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JSON SCHEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each question must follow EXACTLY this schema.

{
  "id": "",
  "title": "",
  "topic": "",
  "difficulty": "",

  "description": "",

  "constraints": [],

  "examples": [
    {
      "input": "",
      "output": "",
      "explanation": ""
    }
  ],

  "tags": [],

  "complexity": {
    "time": "",
    "space": ""
  },

  "signature": {
    "functionName": "solve",

    "returnType": {
      "cpp": "",
      "java": "",
      "python": "",
      "javascript": "",
      "typescript": ""
    },

    "parameters": [
      {
        "name": "",
        "type": {
          "cpp": "",
          "java": "",
          "python": "",
          "javascript": "",
          "typescript": ""
        }
      }
    ]
  },

  "boilerplate": {
    "cpp": "",
    "java": "",
    "python": "",
    "javascript": "",
    "typescript": ""
  },

  "testCases": {
    "public": [
      {
        "arguments": [],
        "expectedOutput": null
      }
    ],

    "hidden": [
      {
        "arguments": [],
        "expectedOutput": null
      }
    ]
  },

  "interview": {
    "concepts": [],
    "followUpQuestions": [],
    "commonMistakes": [],
    "hints": [
      "",
      "",
      "",
      "",
      ""
    ]
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate IDs like

arrays_easy_001

arrays_easy_002

arrays_easy_003

...

Replace arrays/easy using the supplied topic and difficulty.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIGNATURE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Always use

functionName

solve

Never invent function names.

Return types MUST be language-specific.

Example

{
  "cpp":"int",
  "java":"int",
  "python":"int",
  "javascript":"number",
  "typescript":"number"
}

Parameter types MUST also be language-specific.

Examples

vector<int>
int[]
List[int]
number[]

vector<string>
String[]
List[str]
string[]

vector<vector<int>>
int[][]
List[List[int]]
number[][]

TreeNode*
TreeNode
TreeNode
TreeNode
TreeNode

ListNode*
ListNode
ListNode
ListNode
ListNode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOILERPLATE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate COMPLETE starter code for

C++
Java
Python
JavaScript
TypeScript

Example

C++

class Solution {
public:
    int solve(vector<int>& nums) {

    }
};

TypeScript

class Solution {
    solve(nums: number[]): number {

    }
}

Python

class Solution:
    def solve(self, nums: List[int]) -> int:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST CASE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DO NOT use stdin.

DO NOT use strings representing arrays.

Correct

{
  "arguments":[
      [1,2,3],
      5
  ]
}

Wrong

{
   "input":"[1,2,3]\n5"
}

expectedOutput must be actual JSON.

Correct

2

true

[1,3]

[[1,2],[3,4]]

Wrong

"2"

"[1,3]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PUBLIC TESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate 3-5 public tests.

They should cover

Typical case

Small input

Simple edge case

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HIDDEN TESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate 5-10 hidden tests.

Include

minimum values

maximum values

duplicates

sorted

reverse sorted

large arrays

negative numbers

single element

empty edge cases (when allowed)

random cases

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPLEXITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Always provide the expected optimal complexity.

Example

"time":"O(n log n)"
"space":"O(1)"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERVIEW METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate

concepts

Example

[
 "Binary Search",
 "Monotonic Property"
]

Generate 3-5 follow-up questions.

Example

Can this be solved in O(log n)?

How would you optimize memory?

What assumptions are required?

Generate common mistakes.

Example

Off-by-one

Integer overflow

Ignoring duplicates

Generate EXACTLY FIVE hints.

Hint 1 should be extremely vague.

Hint 5 should almost reveal the algorithm.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every generated question should be difficult to solve without understanding the underlying algorithm.

Do NOT generate trick questions.

Do NOT generate implementation-only questions.

Prefer problems commonly asked in FAANG interviews.

The generated JSON must be production-ready and require no manual editing.

Return ONLY the JSON array.