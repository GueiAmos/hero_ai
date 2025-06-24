import { StoryData } from '../types';
import { generateStoryWithGemini, generateImagePromptWithGemini } from './geminiApi';

export const generateStory = async (heroName: string, secretWord: string, language: string): Promise<StoryData> => {
  try {
    // Generate story text with Gemini
    const storyContent = await generateStoryWithGemini(heroName, secretWord, language);
    
    // Generate image prompt based on the story
    const imagePrompt = await generateImagePromptWithGemini(heroName, secretWord, storyContent);
    
    // For now, we'll use a thematic placeholder image
    // In a full implementation, you would use the imagePrompt with an image generation API
    const imageUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
    
    const title = language === 'fr' ? `L'Aventure de ${heroName}` : `The Adventure of ${heroName}`;
    
    return {
      heroName,
      secretWord,
      language,
      title,
      content: storyContent,
      imageUrl
    };
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Fallback to template-based generation if API fails
    return generateFallbackStory(heroName, secretWord, language);
  }
};

const generateFallbackStory = (heroName: string, secretWord: string, language: string): StoryData => {
  const storyTemplates = {
    fr: [
      `Il était une fois ${heroName}, un héros courageux qui vivait dans un royaume magique. Un jour, en explorant une forêt mystérieuse, ${heroName} découvrit un objet étrange: un ${secretWord} brillant d'une lumière dorée.

Cette découverte marqua le début d'une aventure extraordinaire. Le ${secretWord} possédait un pouvoir ancien, capable de révéler la vraie force qui sommeillait en ${heroName}. Face à un défi qui semblait insurmontable, notre héros comprit que le courage ne venait pas de la force physique, mais de la confiance en soi.

Grâce au ${secretWord} et à sa détermination, ${heroName} surmonta tous les obstacles. L'aventure lui révéla que le véritable héros était en lui depuis le début, n'attendant qu'à être découvert.

Ainsi se termine l'histoire de ${heroName}, qui apprit que chacun porte en soi les graines de la grandeur, et qu'il suffit parfois d'un ${secretWord} magique pour les faire germer.`
    ],
    en: [
      `Once upon a time, there lived a brave hero named ${heroName} in a magical kingdom. One day, while exploring a mysterious forest, ${heroName} discovered something extraordinary: a golden ${secretWord} glowing with magical light.

This discovery marked the beginning of an incredible adventure. The ${secretWord} possessed ancient power, capable of revealing the true strength that lay dormant within ${heroName}. Facing a challenge that seemed insurmountable, our hero learned that courage doesn't come from physical strength, but from self-confidence.

With the help of the ${secretWord} and unwavering determination, ${heroName} overcame every obstacle. The adventure revealed that the true hero had been within all along, just waiting to be discovered.

Thus ends the story of ${heroName}, who learned that everyone carries the seeds of greatness within them, and sometimes all it takes is a magical ${secretWord} to make them bloom.`
    ]
  };

  const templates = storyTemplates[language as keyof typeof storyTemplates] || storyTemplates.en;
  const content = templates[0];
  
  const title = language === 'fr' ? `L'Aventure de ${heroName}` : `The Adventure of ${heroName}`;
  const imageUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
  
  return {
    heroName,
    secretWord,
    language,
    title,
    content,
    imageUrl
  };
};