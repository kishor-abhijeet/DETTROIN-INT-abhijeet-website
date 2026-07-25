const cache = new Map();
const API_URL =
  import.meta.env.VITE_ASSISTANT_API_URL ||
  "http://localhost:8787/api/assistant";

export async function askSchoolAssistant(question) {
  const key = question.trim().toLowerCase();
  if (cache.has(key)) return cache.get(key);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "The assistant is temporarily unavailable.");
  cache.set(key, data);
  return data;
}
