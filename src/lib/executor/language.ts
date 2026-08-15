import {InterviewLanguage } from "@/types/interview";

const JUDGE0_LANGUAGE_IDS: Record<
  InterviewLanguage,
  number
> = {
  typescript: 74,
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};

export function getJudge0LanguageId(
  language: InterviewLanguage
): number {
  const languageId = JUDGE0_LANGUAGE_IDS[language];

  if (!languageId) {
    throw new Error("UNSUPPORTED_LANGUAGE");
  }

  return languageId;
}

export function getLanguageName(
  language: InterviewLanguage
): string {
  return language.charAt(0).toUpperCase() + language.slice(1);
}