const GEMINI_API_KEY = 'AIzaSyBo3gNMAfmFBesB82lcNaa8AN-cqEN5UE0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateStoryWithGemini = async (heroName: string, secretWord: string, language: string): Promise<string> => {
  const prompt = language === 'fr' 
    ? `Écris une histoire inspirante et magique pour tous les âges. Le héros s'appelle ${heroName}. L'histoire doit inclure de manière créative et surprenante le mot "${secretWord}". Le héros doit surmonter un petit défi et découvrir sa force intérieure à la fin. L'histoire doit être positive, aventureuse et faire environ 300-400 mots. Utilise un style narratif engageant avec des descriptions vivantes.`
    : `Write an inspiring and magical adventure story for all ages. The hero is named ${heroName}. The story must creatively include the word "${secretWord}" in a surprising and positive way. The hero should overcome a small challenge and discover their inner strength by the end. The story should be positive, adventurous, and about 300-400 words long. Use an engaging narrative style with vivid descriptions.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No story generated');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating story with Gemini:', error);
    throw error;
  }
};

export const generateImagePromptWithGemini = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  const prompt = `Based on this story about ${heroName} and the word "${secretWord}", create a detailed image description for an illustration. The description should be suitable for image generation AI and include: the main character ${heroName}, the setting, key visual elements from the story, and a family-friendly, colorful, inspiring art style. Keep it under 100 words and focus on visual elements only.

Story: ${storyText.substring(0, 500)}...`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No image prompt generated');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating image prompt with Gemini:', error);
    throw error;
  }
};