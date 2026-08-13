import {getQuestions} from "@/lib/interview/questions";

async function main() {
  const data = await getQuestions("Arrays", "Easy");
  console.log(data);
}

main().catch(console.error);