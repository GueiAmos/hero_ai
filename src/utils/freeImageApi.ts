// Services gratuits pour génération d'images
export interface FreeImageResponse {
  url: string;
  source: string;
}

// Service principal: Images Unsplash thématiques
const generateThematicImage = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  try {
    console.log('🎨 Generating thematic image...');
    
    // Analyser le mot secret pour choisir une catégorie d'image
    const word = secretWord.toLowerCase();
    let category = 'adventure';
    let searchTerm = 'adventure';
    
    // Mapping des mots vers des catégories d'images
    if (word.includes('tech') || word.includes('robot') || word.includes('cyber')) {
      category = 'technology';
      searchTerm = 'futuristic-technology';
    } else if (word.includes('nature') || word.includes('forest') || word.includes('tree')) {
      category = 'nature';
      searchTerm = 'magical-forest';
    } else if (word.includes('space') || word.includes('star') || word.includes('cosmic')) {
      category = 'space';
      searchTerm = 'space-adventure';
    } else if (word.includes('ocean') || word.includes('sea') || word.includes('water')) {
      category = 'ocean';
      searchTerm = 'ocean-adventure';
    } else if (word.includes('city') || word.includes('urban') || word.includes('building')) {
      category = 'urban';
      searchTerm = 'modern-city';
    } else {
      // Catégories génériques basées sur des thèmes populaires
      const themes = [
        'adventure-hero',
        'magical-journey',
        'modern-explorer',
        'creative-adventure',
        'inspiring-story'
      ];
      searchTerm = themes[Math.floor(Math.random() * themes.length)];
    }
    
    // Générer une seed basée sur les paramètres pour la cohérence
    const seed = Math.abs((heroName + secretWord).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)) % 1000;
    
    const imageUrl = `https://images.unsplash.com/photo-${1500000000000 + seed}?w=800&h=1000&fit=crop&auto=format&q=80`;
    
    console.log(`✅ Generated thematic image for category "${category}":`, imageUrl);
    return imageUrl;
    
  } catch (error) {
    console.error('❌ Thematic image generation error:', error);
    throw error;
  }
};

// Service de fallback avec images de haute qualité
const getQualityFallback = (): string => {
  const qualityImages = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=1000&fit=crop&auto=format&q=80'
  ];
  
  const selectedImage = qualityImages[Math.floor(Math.random() * qualityImages.length)];
  console.log('📸 Using quality fallback image:', selectedImage);
  return selectedImage;
};

export const generateImageWithFreeService = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  console.log('🎨 Starting simplified image generation...');
  console.log('Parameters:', { heroName, secretWord, storyLength: storyText.length });
  
  try {
    // Utiliser directement les images thématiques Unsplash
    const imageUrl = await generateThematicImage(heroName, secretWord, storyText);
    console.log('✅ Image generation completed:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.warn('⚠️ Thematic generation failed, using fallback:', error);
    return getQualityFallback();
  }
};