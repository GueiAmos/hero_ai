const GEMINI_API_KEY = 'AIzaSyC9cWtFP2Cxe3kpY-Epv4TQwOiCSKyIff0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const IMAGEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface ImagenResponse {
  candidates: Array<{
    image: {
      imageUri: string;
    };
  }>;
}

const getWordCount = (size: string): string => {
  switch (size) {
    case 'small': return '400-600';
    case 'medium': return '700-1000';
    case 'long': return '1200-1600';
    case 'veryLong': return '1800-2500';
    default: return '700-1000';
  }
};

export const generateStoryWithGemini = async (heroName: string, secretWord: string, language: string, size: string): Promise<string> => {
  const wordCount = getWordCount(size);
  
  const prompt = language === 'fr' 
    ? `Écris une histoire palpitante et fascinante adaptée aux lecteurs de 12 ans et plus. Le héros s'appelle ${heroName}. L'histoire doit inclure de manière créative et surprenante le mot "${secretWord}". 

EXIGENCES IMPORTANTES:
- Histoire de ${wordCount} mots environ
- Vocabulaire accessible mais riche, adapté aux 12 ans et plus
- Intrigue palpitante avec des rebondissements
- Intégrer des éléments de la société moderne (technologie, réseaux sociaux, environnement, diversité culturelle)
- Le héros doit surmonter des défis réalistes et découvrir sa force intérieure
- Ton narratif captivant avec des descriptions vivantes
- Histoire positive et inspirante qui fait réfléchir
- Inclure des valeurs comme l'amitié, le courage, la persévérance, l'acceptation des différences

L'histoire doit être moderne, pertinente et refléter les enjeux actuels tout en restant une aventure extraordinaire.`
    : `Write a thrilling and fascinating story suitable for readers aged 12 and up. The hero is named ${heroName}. The story must creatively include the word "${secretWord}" in a surprising and positive way.

IMPORTANT REQUIREMENTS:
- Story of approximately ${wordCount} words
- Accessible but rich vocabulary, suitable for ages 12 and up
- Thrilling plot with twists and turns
- Integrate elements of modern society (technology, social media, environment, cultural diversity)
- The hero should overcome realistic challenges and discover their inner strength
- Engaging narrative tone with vivid descriptions
- Positive and inspiring story that makes readers think
- Include values like friendship, courage, perseverance, acceptance of differences

The story should be modern, relevant, and reflect current issues while remaining an extraordinary adventure.`;

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
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: size === 'veryLong' ? 2048 : 1536,
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

export const generateTitleWithGemini = async (heroName: string, secretWord: string, storyContent: string, language: string): Promise<string> => {
  const prompt = language === 'fr'
    ? `Crée un titre accrocheur et original pour cette histoire. Le titre doit être captivant, mystérieux et donner envie de lire l'histoire. Il ne doit PAS simplement être "L'Aventure de ${heroName}". Sois créatif et inspiré par le contenu de l'histoire et le mot "${secretWord}".

Histoire: ${storyContent.substring(0, 800)}...

Réponds uniquement avec le titre, sans guillemets ni explications.`
    : `Create a catchy and original title for this story. The title should be captivating, mysterious, and make people want to read the story. It should NOT simply be "The Adventure of ${heroName}". Be creative and inspired by the story content and the word "${secretWord}".

Story: ${storyContent.substring(0, 800)}...

Respond only with the title, without quotes or explanations.`;

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
          maxOutputTokens: 100,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No title generated');
    }

    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error generating title with Gemini:', error);
    return language === 'fr' ? `L'Aventure de ${heroName}` : `The Adventure of ${heroName}`;
  }
};

export const generateImageWithGemini = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  const prompt = `Create a beautiful Studio Ghibli or anime-style illustration for a story about ${heroName}. The image should be:

STYLE REQUIREMENTS:
- Studio Ghibli aesthetic: soft, dreamy, hand-drawn animation style
- Anime/manga inspired character design
- Watercolor-like textures and soft lighting
- Whimsical and magical atmosphere
- Rich, vibrant colors with gentle gradients
- Detailed backgrounds with natural elements

CONTENT REQUIREMENTS:
- Show the main character ${heroName} as an anime/manga style character
- Include elements related to "${secretWord}" creatively integrated into the scene
- Family-friendly and suitable for all ages
- Inspiring and adventurous scene
- Beautiful natural or fantastical setting
- Soft, warm lighting reminiscent of Ghibli films

TECHNICAL SPECIFICATIONS:
- High quality, detailed illustration
- Professional anime/manga art style
- Aspect ratio suitable for story illustration
- Colors should be warm, inviting, and magical

Based on this story excerpt: ${storyText.substring(0, 500)}...

The illustration should capture the wonder and magic of Studio Ghibli films while telling the story of ${heroName}'s adventure.`;

  try {
    const response = await fetch(`${IMAGEN_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        sampleCount: 1,
        aspectRatio: "3:4",
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      console.warn(`Imagen API error: ${response.status}, falling back to placeholder`);
      // Fallback to a Ghibli-style placeholder
      return `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop`;
    }

    const data: ImagenResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.warn('No image generated, using fallback');
      return `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop`;
    }

    return data.candidates[0].image.imageUri;
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    // Fallback to anime/fantasy themed placeholder
    return `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop`;
  }
};