// src/app/api/gemini/route.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import { applyCors, handleOptionsRequest } from '../../lib/cors';

export async function OPTIONS(request) {
  return handleOptionsRequest(request);
}

export async function POST(request) {
  let content, instruction;
  try {
    const body = await request.json();
    content = body.content;
    instruction = body.instruction;
  } catch (e) {
    return applyCors(request, { error: 'Invalid JSON body.' }, 400);
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return applyCors(request, { error: 'Gemini API key not configured.' }, 500);
  }
  if (!content || !instruction) {
    return applyCors(request, { error: 'Missing content or instruction.' }, 400);
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `${instruction}\n\n${content}`;
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      return applyCors(request, { error: 'No response from Gemini API.' }, 502);
    }

    const summary = result.response.text?.() || 'No summary available.';
    return applyCors(request, { summary }, 200);
  } catch (error) {
    console.error('Error generating content with Gemini API:', error);
    if (error.response && error.response.status) {
      return applyCors(request, { error: `Gemini API error: ${error.response.statusText}` }, error.response.status);
    }
    return applyCors(request, { error: 'Internal Server Error' }, 500);
  }
}