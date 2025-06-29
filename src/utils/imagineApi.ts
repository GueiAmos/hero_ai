const IMAGINE_API_KEY = 'vk-Fvr7vsRP55DwK0f2O3jhc9aP2jd012f3nUoUoVW3LfEc2O';
const IMAGINE_API_URL = 'https://api.vyro.ai/v2/image/generations';

export interface ImagineApiResponse {
  id?: string;
  status?: string;
  image_url?: string;
  error?: string;
  data?: {
    url: string;
  };
}

export const generateImageWithImagine = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  console.log('Generating image with Imagine.art API...');
  
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

  // Créer un prompt optimisé pour Imagine.art
  const prompt = `Beautiful anime-style illustration of a ${ageDescription} character in a modern adventure setting with ${secretWord} elements. Vibrant colors, detailed character design, expressive features, magical atmosphere. High-quality digital art, portrait orientation, cinematic composition. No text or words in the image.`;

  try {
    console.log('Making request to Imagine.art API...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout
    
    // Créer FormData pour la requête
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('style', 'anime');
    formData.append('aspect_ratio', '3:4'); // Portrait orientation
    formData.append('seed', Math.floor(Math.random() * 10000).toString());
    
    const response = await fetch(IMAGINE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${IMAGINE_API_KEY}`,
      },
      body: formData,
      signal: controller.signal
    });

    console.log('Imagine.art API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Imagine.art API error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        console.warn('Imagine.art API authentication failed - check API key');
      } else if (response.status === 429) {
        console.warn('Imagine.art API rate limit exceeded');
      } else if (response.status === 400) {
        console.warn('Imagine.art API bad request - prompt may be invalid');
      }
      
      clearTimeout(timeoutId);
      return getFallbackImage();
    }

    const data: ImagineApiResponse = await response.json();
    console.log('Imagine.art API response received:', data);
    
    // Vérifier différents formats de réponse possibles
    if (data.image_url) {
      console.log('Image generated successfully:', data.image_url);
      clearTimeout(timeoutId);
      return data.image_url;
    } else if (data.data?.url) {
      console.log('Image generated successfully:', data.data.url);
      clearTimeout(timeoutId);
      return data.data.url;
    } else if (data.id) {
      // Si on a un ID, on doit attendre la génération
      console.log('Image generation started, waiting for completion...');
      const imageUrl = await pollForCompletion(data.id);
      clearTimeout(timeoutId);
      return imageUrl;
    } else {
      console.warn('No image URL or ID received from Imagine.art API');
      clearTimeout(timeoutId);
      return getFallbackImage();
    }
    
  } catch (error) {
    console.error('Error generating image with Imagine.art:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Imagine.art API request timed out');
    }
    
    return getFallbackImage();
  }
};

const pollForCompletion = async (jobId: string): Promise<string> => {
  const maxAttempts = 30; // 30 attempts max (5 minutes)
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`${IMAGINE_API_URL}/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${IMAGINE_API_KEY}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to check generation status: ${response.status}`);
      }
      
      const data: ImagineApiResponse = await response.json();
      
      if (data.status === 'completed' || data.status === 'success') {
        if (data.image_url) {
          console.log('Imagine.art image generated successfully:', data.image_url);
          return data.image_url;
        } else if (data.data?.url) {
          console.log('Imagine.art image generated successfully:', data.data.url);
          return data.data.url;
        }
      }
      
      if (data.status === 'failed' || data.status === 'error') {
        console.error('Imagine.art generation failed');
        return getFallbackImage();
      }
      
      // Attendre 10 secondes avant de vérifier à nouveau
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
      
    } catch (error) {
      console.error('Error polling Imagine.art status:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.warn('Imagine.art generation timed out');
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