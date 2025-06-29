// Services gratuits pour génération d'images
export interface FreeImageResponse {
  url: string;
  source: string;
}

// Service 1: Pollinations AI (gratuit et fiable)
const generateWithPollinations = async (prompt: string): Promise<string> => {
  try {
    console.log('Trying Pollinations AI with prompt:', prompt);
    
    // Nettoyer et encoder le prompt
    const cleanPrompt = prompt.replace(/[^a-zA-Z0-9\s,.-]/g, '').trim();
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    
    // Générer une seed unique basée sur le prompt
    const seed = Math.abs(cleanPrompt.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0));
    
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=1000&seed=${seed}&enhance=true&model=flux`;
    
    console.log('Generated Pollinations URL:', imageUrl);
    
    // Test de connectivité simple
    const testResponse = await fetch(imageUrl, { 
      method: 'HEAD',
      timeout: 10000
    }).catch(() => null);
    
    if (testResponse && testResponse.ok) {
      console.log('✅ Pollinations AI image verified');
      return imageUrl;
    }
    
    // Si HEAD échoue, essayer quand même l'URL (parfois HEAD ne fonctionne pas mais GET oui)
    console.log('⚠️ HEAD request failed, but trying URL anyway');
    return imageUrl;
    
  } catch (error) {
    console.error('❌ Pollinations AI error:', error);
    throw error;
  }
};

// Service 2: Picsum avec seed personnalisé
const generateWithPicsum = async (heroName: string, secretWord: string): Promise<string> => {
  try {
    console.log('Trying Picsum with creative seed...');
    
    // Créer une seed unique basée sur les paramètres
    const seedString = `${heroName}-${secretWord}-${Date.now()}`;
    const seed = Math.abs(seedString.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)) % 1000;
    
    const imageUrl = `https://picsum.photos/seed/${seed}/800/1000?blur=0&grayscale=0`;
    
    console.log('Generated Picsum URL:', imageUrl);
    return imageUrl;
    
  } catch (error) {
    console.error('❌ Picsum error:', error);
    throw error;
  }
};

// Service 3: Lorem Picsum avec ID spécifique
const generateWithLoremPicsum = async (): Promise<string> => {
  try {
    console.log('Trying Lorem Picsum with random ID...');
    
    // Utiliser un ID aléatoire entre 1 et 1000
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const imageUrl = `https://picsum.photos/id/${randomId}/800/1000`;
    
    console.log('Generated Lorem Picsum URL:', imageUrl);
    return imageUrl;
    
  } catch (error) {
    console.error('❌ Lorem Picsum error:', error);
    throw error;
  }
};

// Service 4: Placeholder avec couleurs dynamiques
const generatePlaceholder = async (heroName: string, secretWord: string): Promise<string> => {
  try {
    console.log('Generating placeholder image...');
    
    // Générer des couleurs basées sur le nom et mot secret
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9'];
    const bgColor = colors[Math.abs(heroName.charCodeAt(0)) % colors.length];
    const textColor = '2C3E50';
    
    const imageUrl = `https://via.placeholder.com/800x1000/${bgColor}/${textColor}?text=${encodeURIComponent('Hero AI')}`;
    
    console.log('Generated placeholder URL:', imageUrl);
    return imageUrl;
    
  } catch (error) {
    console.error('❌ Placeholder error:', error);
    throw error;
  }
};

export const generateImageWithFreeService = async (heroName: string, secretWord: string, storyText: string): Promise<string> => {
  console.log('🎨 Starting image generation with free services...');
  console.log('Parameters:', { heroName, secretWord, storyLength: storyText.length });
  
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

  // Créer un prompt optimisé pour Pollinations
  const prompt = `anime style portrait of ${ageDescription} character, modern adventure theme, ${secretWord} elements, vibrant colors, detailed digital art, magical atmosphere`;

  console.log('Generated prompt:', prompt);

  // Essayer les services dans l'ordre de préférence
  const services = [
    { name: 'Pollinations AI', fn: () => generateWithPollinations(prompt) },
    { name: 'Picsum Creative', fn: () => generateWithPicsum(heroName, secretWord) },
    { name: 'Lorem Picsum', fn: () => generateWithLoremPicsum() },
    { name: 'Placeholder', fn: () => generatePlaceholder(heroName, secretWord) }
  ];

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    try {
      console.log(`🔄 Trying ${service.name}...`);
      const imageUrl = await service.fn();
      console.log(`✅ ${service.name} succeeded:`, imageUrl);
      return imageUrl;
    } catch (error) {
      console.warn(`❌ ${service.name} failed:`, error);
      if (i === services.length - 1) {
        console.log('🔄 All services failed, using hardcoded fallback');
        return getFallbackImage();
      }
    }
  }

  return getFallbackImage();
};

const getFallbackImage = (): string => {
  const modernImages = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1000&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1000&fit=crop&auto=format'
  ];
  
  const selectedImage = modernImages[Math.floor(Math.random() * modernImages.length)];
  console.log('📸 Using fallback image:', selectedImage);
  return selectedImage;
};