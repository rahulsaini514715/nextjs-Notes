import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDTeu9B7TAwCPnQiD15dEm5o5BMtpW0zcQ");

export async function getGenerativeAIResponse(prompt: string): Promise<string> {
  try {
    if (!prompt) throw new Error("Prompt missing");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text().trim().replace(/```/g, "");
    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);
    throw new Error(error?.message || "AI generation failed");
  }
}
