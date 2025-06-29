// Alternative gratuite utilisant plusieurs services
export interface FreeImageResponse {
  url: string;
  source: string;
}

// Service 1: Utiliser Pollinations AI (gratuit)
const generateWithPollinations = async (prompt: string): Promise<string> => {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=1000&seed=${Math.floor(Math.random() * 1000000)}`;
    
    // Vérifier que l'image est accessible
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (response.ok) {
      console.log('Image generated with Pollinations AI:', imageUrl);
      return imageUrl;
    }
    throw new Error('Pollinations AI failed');
  } catch (error) {
    console.error('Pollinations AI error:', error);
    throw error;
  }
};

// Service 2: Utiliser Picsum avec overlay text (fallback créatif)
const generateWithPicsum = async (heroName: string, secretWord: string): Promise<string> => {
  try {
    const seed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/seed/${heroName}-${secretWord}-${seed}/800/1000`;
    
    console.log('Generated creative image with Picsum:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Picsum error:', error);
    throw error;
  }
};

// Service 3: Utiliser Unsplash avec recherche thématique
const generateWithUnsplash = async (secretWord: string): Promise<string> => {
  try {
    // Mots-clés basés sur le mot secret
    const keywords = [
      'adventure', 'hero', 'journey', 'magic', 'fantasy', 'story', 
      'book', 'imagination', 'dream', 'creative', 'art', 'colorful'
    ];
    
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    const searchTerm = secretWord.length > 2 ? secretWord : randomKeyword;
    
    const imageUrl = `https://source.unsplash.com/800x1000/?${searchTerm},illustration,art`;
    
    console.log('Generated thematic image with Unsplash:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Unsplash error:', error);
    throw error;
  }
};

export const generateImageWithFreeService = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  console.log('Generating image with free services...');
  
  // Analyser l'histoire pour extraire les éléments visuels clés
  const storyExcerpt = storyText.substring(0, 500);
  
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

  // Créer un prompt optimisé
  const prompt = `Beautiful anime style illustration of a ${ageDescription} character in a modern adventure with ${secretWord} elements, vibrant colors, detailed art, magical atmosphere, portrait orientation`;

  // Essayer les services dans l'ordre de préférence
  const services = [
    () => generateWithPollinations(prompt),
    () => generateWithUnsplash(secretWord),
    () => generateWithPicsum(heroName, secretWord)
  ];

  for (let i = 0; i < services.length; i++) {
    try {
      const imageUrl = await services[i]();
      return imageUrl;
    } catch (error) {
      console.warn(`Service ${i + 1} failed, trying next...`);
      if (i === services.length - 1) {
        // Si tous les services échouent, utiliser une image par défaut
        return getFallbackImage();
      }
    }
  }

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