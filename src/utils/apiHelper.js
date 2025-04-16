// src/utils/apiHelper.js
import { GoogleGenAI, Modality } from '@google/genai';

async function generateImage(apiKey, contents) {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp-image-generation',
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  if (response.candidates && response.candidates[0] && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data; // Base64 image data
      }
    }
  }
  throw new Error('No image generated');
}

export { generateImage };