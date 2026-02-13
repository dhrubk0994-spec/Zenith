
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getConciergeResponse = async (userPrompt: string, cartItems: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        systemInstruction: `You are the Zenith Luxury Concierge. 
        The brand "Zenith" represents the peak of minimalist elegance (similar to Dior or Armani).
        Our catalog includes high-end t-shirts ($85), hoodies ($145), and sweaters ($120) made from organic cotton.
        Current cart: ${JSON.stringify(cartItems)}.
        Be sophisticated, brief, and extremely helpful. Use luxury vocabulary (exquisite, tailored, silhouette, heritage).
        Always suggest styling advice that emphasizes "less is more".`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Concierge Error:", error);
    return "The Concierge is currently attending to another client. How may I assist you otherwise?";
  }
};
