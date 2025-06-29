const LEONARDO_API_KEY = 'YOUR_LEONARDO_API_KEY'; // Vous devrez fournir votre clé API Leonardo
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v1/generations';

export interface LeonardoImageResponse {
  sdGenerationJob: {
    generationId: string;
  };
}

export interface LeonardoJobResponse {
  generations_by_pk: {
    id: string;
    status: string;
    generated_images: Array<{
      id: string;
      url: string;
      likeCount: number;
      nsfw: boolean;
    }>;
  };
}

export const generateImageWithLeonardo = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  console.log('Generating image with Leonardo AI...');
  
  // Analyser l'histoire pour extraire les éléments visuels clés
  const storyExcerpt = storyText.substring(0, 1000);
  
  // Extraire l'âge approximatif du héros depuis l'histoire
  const ageMatch = storyText.match(/(\d+)\s*ans?/);
  const heroAge = ageMatch ? parseInt(ageMatch[1]) : 20;
  
  // Déterminer le style d'âge pour l'illustration
  let ageDescription = '';
  if (heroAge <= 12) {
    ageDescription = 'young child';
  } else if (heroAge <= 17) {
    ageDescription = 'teenager';
  } else if (heroAge <= 25) {
    ageDescription = 'young adult';
  } else if (heroAge <= 35) {
    ageDescription = 'adult';
  } else {
    ageDescription = 'mature adult';
  }

  // Créer un prompt optimisé pour Leonardo AI
  const prompt = `Beautiful anime-style illustration of a ${ageDescription} character in a modern setting with ${secretWord} elements. Vibrant colors, detailed character design, expressive features, magical atmosphere. High quality digital art, portrait orientation, cinematic composition. No text or words in image.`;

  try {
    console.log('Making request to Leonardo AI API...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout
    
    // Première requête pour lancer la génération
    const response = await fetch(LEONARDO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Creative model
        width: 832,
        height: 1216, // Portrait orientation
        num_images: 1,
        guidance_scale: 7,
        num_inference_steps: 30,
        scheduler: "DPM_SOLVER",
        presetStyle: "ANIME",
        public: false,
        promptMagic: true,
        alchemy: true
      }),
      signal: controller.signal
    });

    console.log('Leonardo AI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Leonardo AI API error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        console.warn('Leonardo AI API authentication failed - check API key');
      } else if (response.status === 429) {
        console.warn('Leonardo AI API rate limit exceeded');
      } else if (response.status === 400) {
        console.warn('Leonardo AI API bad request - prompt may be invalid');
      }
      
      clearTimeout(timeoutId);
      return getFallbackImage();
    }

    const data: LeonardoImageResponse = await response.json();
    console.log('Leonardo AI generation started:', data.sdGenerationJob.generationId);
    
    // Attendre que la génération soit terminée
    const imageUrl = await pollForCompletion(data.sdGenerationJob.generationId);
    
    clearTimeout(timeoutId);
    return imageUrl;
    
  } catch (error) {
    console.error('Error generating image with Leonardo AI:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Leonardo AI API request timed out');
    }
    
    return getFallbackImage();
  }
};

const pollForCompletion = async (generationId: string): Promise<string> => {
  const maxAttempts = 30; // 30 attempts max (5 minutes)
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to check generation status: ${response.status}`);
      }
      
      const data: LeonardoJobResponse = await response.json();
      const generation = data.generations_by_pk;
      
      if (generation.status === 'COMPLETE' && generation.generated_images.length > 0) {
        const image = generation.generated_images[0];
        if (!image.nsfw && image.url) {
          console.log('Leonardo AI image generated successfully:', image.url);
          return image.url;
        }
      }
      
      if (generation.status === 'FAILED') {
        console.error('Leonardo AI generation failed');
        return getFallbackImage();
      }
      
      // Attendre 10 secondes avant de vérifier à nouveau
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
      
    } catch (error) {
      console.error('Error polling Leonardo AI status:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.warn('Leonardo AI generation timed out');
  return getFallbackImage();
};

const getFallbackImage = (): string => {
  const modernImages = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1000&fit=crop'
  ];
  
  return modernImages[Math.floor(Math.random() * modernImages.length)];
};