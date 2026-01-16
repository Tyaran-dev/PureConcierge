export async function generatePackages(quizAnswers: {
  interests: string[];
  personality: string;
  pace: string;
  budget_level: string;
  travel_with: string;
  days_range: string;
}) {
  const res = await fetch("http://localhost:5000/pacakes/generatePackges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quizAnswers }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate packages");
  }

  const data = await res.json(); // ✅ اقرأ مرة واحدة فقط
  console.log("API response:", data);

  return data;
}
