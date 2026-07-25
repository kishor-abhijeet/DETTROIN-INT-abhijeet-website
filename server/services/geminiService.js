const MODEL = "gemini-2.0-flash";
export async function askGemini(question, context) {
  if (!process.env.GEMINI_API_KEY) return null;
  const sources = context
    .map((item) => `- ${item.title}: ${item.content}`)
    .join("\n");
  const prompt = `You are the Kalyani School Admission and Information Assistant. Answer only using the school database below. Do not invent fees, dates, policies, eligibility decisions, or facilities. If the database does not answer the question, respond exactly: "I couldn't find this information in our school database." Keep the reply concise, warm and helpful.\n\nSCHOOL DATABASE:\n${sources}\n\nQUESTION: ${question}`;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 280 },
      }),
    },
  );
  if (!response.ok)
    throw new Error(`Gemini request failed (${response.status})`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}
