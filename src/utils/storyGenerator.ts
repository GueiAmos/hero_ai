import { StoryData } from '../types';
import { generateStoryWithGemini, generateTitleWithGemini } from './geminiApi';
import { generateImageWithFreeService } from './freeImageApi';

export const generateStory = async (heroName: string, secretWord: string, language: string, size: string): Promise<StoryData> => {
  try {
    // Generate story text with Gemini
    const storyContent = await generateStoryWithGemini(heroName, secretWord, language, size);
    
    // Generate original title based on the story
    const title = await generateTitleWithGemini(heroName, secretWord, storyContent, language);
    
    // Generate custom illustration with free services
    const imageUrl = await generateImageWithFreeService(heroName, secretWord, storyContent);
    
    return {
      heroName,
      secretWord,
      language,
      size,
      title,
      content: storyContent,
      imageUrl
    };
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Fallback to template-based generation if API fails
    return generateFallbackStory(heroName, secretWord, language, size);
  }
};

const generateFallbackStory = (heroName: string, secretWord: string, language: string, size: string): StoryData => {
  const getWordMultiplier = (size: string): number => {
    switch (size) {
      case 'small': return 0.7;
      case 'medium': return 1;
      case 'long': return 1.5;
      case 'veryLong': return 2;
      default: return 1;
    }
  };

  const multiplier = getWordMultiplier(size);
  
  const storyTemplates = {
    fr: [
      `Dans un monde où la technologie et la magie coexistent, ${heroName} découvre un secret qui va changer sa vie à jamais. Tout commence quand ${heroName} trouve un mystérieux ${secretWord} dans les données de son smartphone.

${multiplier > 0.7 ? `Ce ${secretWord} n'est pas ordinaire - il pulse d'une énergie étrange qui semble connectée aux réseaux sociaux du monde entier. ${heroName} réalise que chaque like, chaque partage, chaque connexion humaine génère une forme d'énergie magique.` : ''}

${multiplier > 1 ? `Mais cette découverte attire l'attention d'une corporation qui exploite cette énergie pour manipuler les émotions des gens. ${heroName} doit naviguer entre le monde virtuel et réel, utilisant à la fois sa connaissance de la technologie et sa nouvelle compréhension de la magie du ${secretWord}.

Avec l'aide d'amis de différentes cultures rencontrés en ligne, ${heroName} apprend que la vraie force ne vient pas de la technologie ou de la magie, mais de l'authenticité des connexions humaines.` : ''}

${multiplier > 1.5 ? `L'aventure mène ${heroName} à travers des défis qui reflètent les problèmes de notre époque : la désinformation, l'isolement social, les préjugés. Mais grâce au pouvoir du ${secretWord} et à la solidarité de sa communauté diverse, ${heroName} découvre comment transformer ces défis en opportunités de croissance.

La bataille finale ne se déroule pas avec des épées ou des sorts, mais avec la vérité, l'empathie et le courage de rester authentique dans un monde qui pousse à la conformité.` : ''}

Finalement, ${heroName} comprend que le véritable héros n'est pas celui qui possède des pouvoirs extraordinaires, mais celui qui utilise ses talents uniques pour créer des ponts entre les gens et inspirer le changement positif. Le ${secretWord} devient le symbole de cette nouvelle compréhension : que chaque personne a le pouvoir de faire une différence dans le monde.`
    ],
    en: [
      `In a world where technology and magic coexist, ${heroName} discovers a secret that will change their life forever. It all begins when ${heroName} finds a mysterious ${secretWord} in their smartphone data.

${multiplier > 0.7 ? `This ${secretWord} is no ordinary object - it pulses with strange energy that seems connected to social networks worldwide. ${heroName} realizes that every like, every share, every human connection generates a form of magical energy.` : ''}

${multiplier > 1 ? `But this discovery attracts the attention of a corporation that exploits this energy to manipulate people's emotions. ${heroName} must navigate between the virtual and real worlds, using both their knowledge of technology and their new understanding of the ${secretWord}'s magic.

With help from friends of different cultures met online, ${heroName} learns that true strength doesn't come from technology or magic, but from the authenticity of human connections.` : ''}

${multiplier > 1.5 ? `The adventure leads ${heroName} through challenges that reflect the problems of our time: misinformation, social isolation, prejudice. But thanks to the power of the ${secretWord} and the solidarity of their diverse community, ${heroName} discovers how to transform these challenges into opportunities for growth.

The final battle doesn't take place with swords or spells, but with truth, empathy, and the courage to remain authentic in a world that pushes for conformity.` : ''}

Finally, ${heroName} understands that the true hero isn't the one who possesses extraordinary powers, but the one who uses their unique talents to build bridges between people and inspire positive change. The ${secretWord} becomes the symbol of this new understanding: that every person has the power to make a difference in the world.`
    ]
  };

  const templates = storyTemplates[language as keyof typeof storyTemplates] || storyTemplates.en;
  const content = templates[0];
  
  const title = language === 'fr' ? `Le Secret du ${secretWord} Numérique` : `The Secret of the Digital ${secretWord}`;
  const imageUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
  
  return {
    heroName,
    secretWord,
    language,
    size,
    title,
    content,
    imageUrl
  };
};