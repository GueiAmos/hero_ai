const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
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
    case 'small': return '500-700';
    case 'medium': return '800-1200';
    case 'long': return '1300-1800';
    case 'veryLong': return '2000-2800';
    default: return '800-1200';
  }
};

const getRandomAge = (): number => {
  const ageRanges = [
    [8, 12],   // Enfant
    [13, 17],  // Adolescent
    [18, 25],  // Jeune adulte
    [26, 35],  // Adulte
    [36, 50],  // Adulte mûr
    [51, 65],  // Senior actif
    [16, 19],  // Lycéen
    [20, 24],  // Étudiant
    [25, 30],  // Jeune professionnel
    [31, 45],  // Professionnel expérimenté
    [10, 14],  // Pré-adolescent
    [40, 60]   // Adulte confirmé
  ];
  
  const selectedRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
  return Math.floor(Math.random() * (selectedRange[1] - selectedRange[0] + 1)) + selectedRange[0];
};

const getRandomProfession = (age: number): string => {
  if (age <= 12) {
    return ['élève de primaire', 'enfant curieux', 'petit explorateur', 'jeune inventeur', 'apprenti magicien', 'collectionneur de trésors'][Math.floor(Math.random() * 6)];
  } else if (age <= 17) {
    return ['lycéen', 'étudiante au collège', 'apprenti mécanicien', 'jeune artiste', 'sportif amateur', 'musicienne débutante', 'passionné de sciences', 'créateur de contenu'][Math.floor(Math.random() * 8)];
  } else if (age <= 25) {
    return ['étudiant en université', 'stagiaire en entreprise', 'jeune entrepreneur', 'artiste indépendant', 'développeur junior', 'journaliste débutant', 'designer graphique', 'photographe freelance', 'coach sportif', 'influenceur'][Math.floor(Math.random() * 10)];
  } else if (age <= 35) {
    return ['ingénieur logiciel', 'professeur', 'médecin généraliste', 'architecte', 'chef cuisinier', 'consultant', 'avocat junior', 'psychologue', 'vétérinaire', 'pilote', 'chercheur', 'entrepreneur'][Math.floor(Math.random() * 12)];
  } else if (age <= 50) {
    return ['directeur commercial', 'chirurgien', 'professeur universitaire', 'architecte senior', 'chef étoilé', 'consultant expert', 'avocat associé', 'psychologue clinicien', 'vétérinaire spécialisé', 'commandant de bord', 'directeur de recherche'][Math.floor(Math.random() * 11)];
  } else {
    return ['expert-conseil', 'professeur émérite', 'médecin-chef', 'maître architecte', 'critique gastronomique', 'mentor d\'entreprise', 'juge', 'thérapeute expérimenté', 'directeur de clinique vétérinaire', 'instructeur de vol', 'scientifique renommé'][Math.floor(Math.random() * 11)];
  }
};

const getRandomPersonality = (): string => {
  const traits = [
    'curieux et déterminé',
    'créatif et empathique', 
    'courageux mais prudent',
    'intelligent et observateur',
    'optimiste et persévérant',
    'timide mais loyal',
    'audacieux et généreux',
    'réfléchi et patient',
    'spontané et bienveillant',
    'analytique et passionné',
    'charismatique et inspirant',
    'méticuleux et perfectionniste',
    'aventurier et libre',
    'sage et protecteur',
    'innovant et visionnaire'
  ];
  return traits[Math.floor(Math.random() * traits.length)];
};

const getRandomSetting = (): string => {
  const settings = [
    'une métropole futuriste aux gratte-ciels lumineux',
    'une petite ville côtière aux maisons colorées',
    'un campus universitaire verdoyant',
    'une forêt mystérieuse aux arbres centenaires',
    'un laboratoire de recherche ultra-moderne',
    'un quartier artistique plein de street art',
    'une station spatiale en orbite',
    'un village de montagne isolé',
    'une île tropicale paradisiaque',
    'un centre-ville animé et cosmopolite',
    'une base sous-marine secrète',
    'un parc national préservé',
    'un désert aux dunes dorées',
    'une cité flottante sur l\'océan',
    'un monde virtuel aux possibilités infinies'
  ];
  return settings[Math.floor(Math.random() * settings.length)];
};

const checkApiKey = (): void => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file.');
  }
};

export const generateStoryWithGemini = async (heroName: string, secretWord: string, language: string, size: string): Promise<string> => {
  checkApiKey();
  
  const wordCount = getWordCount(size);
  const heroAge = getRandomAge();
  const profession = getRandomProfession(heroAge);
  const personality = getRandomPersonality();
  const setting = getRandomSetting();
  
  const prompt = language === 'fr' 
    ? `Écris une histoire captivante, moderne et originale qui sort des sentiers battus.

PERSONNAGE PRINCIPAL:
- Nom: ${heroName}
- Âge: ${heroAge} ans
- Profession/Statut: ${profession}
- Personnalité: ${personality}
- Lieu principal: ${setting}

ÉLÉMENT CENTRAL: "${secretWord}" doit être au cœur de l'intrigue de manière créative et inattendue. Ce n'est pas juste un objet mentionné, mais l'élément déclencheur de toute l'aventure.

EXIGENCES CRÉATIVES STRICTES:
- Histoire de ${wordCount} mots environ
- INTERDICTION absolue des clichés fantasy (pas de dragons, sorciers, royaumes magiques)
- Univers contemporain ou futuriste avec des enjeux actuels
- Intégrer la technologie moderne (IA, réalité virtuelle, biotechnologie, etc.)
- Créer des situations uniques jamais vues
- Développer des personnages secondaires mémorables
- Inclure des rebondissements surprenants
- Aborder des thèmes profonds (identité, liberté, progrès, humanité)

THÈMES MODERNES À EXPLORER:
- Intelligence artificielle et conscience
- Réalité virtuelle vs réalité
- Biotechnologie et amélioration humaine
- Écologie et durabilité
- Diversité culturelle et inclusion
- Innovation technologique
- Éthique scientifique
- Connexions humaines à l'ère numérique

STYLE NARRATIF:
- Ton moderne, dynamique et engageant
- Dialogues naturels et percutants
- Descriptions immersives et détaillées
- Rythme soutenu avec des moments de réflexion
- Fin ouverte qui fait réfléchir

INTERDICTIONS:
- Pas de magie traditionnelle
- Pas de créatures fantastiques
- Pas de quête classique
- Pas de "il était une fois"
- Pas de monde médiéval

Crée une histoire qui pourrait être adaptée en film de science-fiction moderne !`
    : `Write a captivating, modern and original story that breaks new ground.

MAIN CHARACTER:
- Name: ${heroName}
- Age: ${heroAge} years old
- Profession/Status: ${profession}
- Personality: ${personality}
- Main setting: ${setting}

CENTRAL ELEMENT: "${secretWord}" must be at the heart of the plot in a creative and unexpected way. It's not just a mentioned object, but the trigger for the entire adventure.

STRICT CREATIVE REQUIREMENTS:
- Story of approximately ${wordCount} words
- ABSOLUTE PROHIBITION of fantasy clichés (no dragons, wizards, magical kingdoms)
- Contemporary or futuristic universe with current issues
- Integrate modern technology (AI, virtual reality, biotechnology, etc.)
- Create unique situations never seen before
- Develop memorable secondary characters
- Include surprising plot twists
- Address deep themes (identity, freedom, progress, humanity)

MODERN THEMES TO EXPLORE:
- Artificial intelligence and consciousness
- Virtual reality vs reality
- Biotechnology and human enhancement
- Ecology and sustainability
- Cultural diversity and inclusion
- Technological innovation
- Scientific ethics
- Human connections in the digital age

NARRATIVE STYLE:
- Modern, dynamic and engaging tone
- Natural and impactful dialogue
- Immersive and detailed descriptions
- Sustained pace with moments of reflection
- Open ending that makes you think

PROHIBITIONS:
- No traditional magic
- No fantastic creatures
- No classic quest
- No "once upon a time"
- No medieval world

Create a story that could be adapted into a modern science fiction film!`;

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
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
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
  checkApiKey();
  
  const prompt = language === 'fr'
    ? `Analyse cette histoire moderne et crée un titre accrocheur qui capture son essence futuriste.

HISTOIRE: ${storyContent.substring(0, 1200)}...

CRITÈRES POUR LE TITRE:
- Style moderne et technologique
- Évoque l'innovation et le futur
- Fait référence subtilement au concept de "${secretWord}"
- Suscite la curiosité sans tout révéler
- Maximum 6 mots
- Éviter les formules banales

EXEMPLES DE STYLES MODERNES:
- "Code [Concept]"
- "Projet ${secretWord}"
- "L'Algorithme de [élément]"
- "Nexus [Concept]"
- "Protocol [élément]"

Réponds uniquement avec le titre, sans guillemets.`
    : `Analyze this modern story and create a catchy title that captures its futuristic essence.

STORY: ${storyContent.substring(0, 1200)}...

TITLE CRITERIA:
- Modern and technological style
- Evokes innovation and the future
- Subtly references the concept of "${secretWord}"
- Sparks curiosity without revealing everything
- Maximum 6 words
- Avoid banal formulas

MODERN STYLE EXAMPLES:
- "Code [Concept]"
- "Project ${secretWord}"
- "The [element] Algorithm"
- "Nexus [Concept]"
- "Protocol [element]"

Respond only with the title, without quotes.`;

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
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
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
  console.log('Generating image with enhanced Gemini Imagen...');
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
    console.warn('Gemini API key not configured, using fallback image');
    return getFallbackImage();
  }
  
  // Analyser l'histoire pour extraire les éléments visuels clés
  const storyExcerpt = storyText.substring(0, 2000);
  
  // Extraire des informations contextuelles
  const ageMatch = storyText.match(/(\d+)\s*ans?/);
  const heroAge = ageMatch ? parseInt(ageMatch[1]) : 25;
  
  // Analyser le contexte technologique/moderne
  const techKeywords = ['technologie', 'intelligence artificielle', 'virtuel', 'numérique', 'futur', 'laboratoire', 'ordinateur', 'robot', 'hologramme'];
  const hasTechContext = techKeywords.some(keyword => storyText.toLowerCase().includes(keyword));
  
  const prompt = `Create a stunning, highly detailed illustration that perfectly captures the essence and key scene of this modern story.

STORY CONTEXT ANALYSIS:
- Main character: ${heroName} (${heroAge} years old)
- Central story element: "${secretWord}"
- Technology/Modern context: ${hasTechContext ? 'High-tech/Futuristic setting' : 'Contemporary setting'}
- Story excerpt for visual reference: ${storyExcerpt}

VISUAL COMPOSITION REQUIREMENTS:
- Show ${heroName} as the main subject (age-appropriate: ${heroAge} years old)
- Capture the most pivotal, dramatic moment from the story
- Visually represent "${secretWord}" as a key element in the scene
- Reflect the story's modern/technological atmosphere
- Show character's personality through expression and body language
- Include relevant background elements that support the narrative

ART STYLE SPECIFICATIONS:
- Cinematic digital art style (similar to concept art for sci-fi films)
- High-quality, professional illustration
- Dynamic composition with interesting camera angles
- Rich, atmospheric lighting that enhances the mood
- Detailed character design with realistic proportions
- Modern/futuristic aesthetic when appropriate
- Vibrant but sophisticated color palette

TECHNICAL REQUIREMENTS:
- Portrait orientation (3:4 aspect ratio)
- No text, letters, words, or written symbols anywhere in the image
- Focus on visual storytelling through imagery alone
- Suitable for all ages, family-friendly content
- Professional quality suitable for publication
- Clear focus on the main character and story elements

MOOD AND ATMOSPHERE:
- Capture the emotional intensity of the story's climax
- Create visual intrigue that matches the narrative
- Balance realism with creative/imaginative elements
- Inspiring and thought-provoking overall feeling
- Modern, sophisticated aesthetic

The illustration should make viewers immediately understand the story's genre and feel emotionally connected to the character's journey, while perfectly representing the role of "${secretWord}" in the narrative.`;

  try {
    console.log('Making enhanced request to Imagen API...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000);
    
    let lastError: Error | null = null;
    const maxRetries = 3;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Enhanced Imagen API attempt ${attempt + 1}/${maxRetries + 1}`);
        
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
              },
              {
                category: "HARM_CATEGORY_HARASSMENT", 
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
          signal: controller.signal
        });

        console.log('Enhanced Imagen API response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Enhanced Imagen API error: ${response.status} - ${errorText}`);
          
          if (response.status === 403 || response.status === 400) {
            console.warn('Imagen API access issue, using fallback');
            clearTimeout(timeoutId);
            return getFallbackImage();
          } else if (response.status === 429) {
            console.warn('Imagen API quota exceeded');
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 3000 * (attempt + 1)));
              continue;
            }
            clearTimeout(timeoutId);
            return getFallbackImage();
          }
          
          if (attempt < maxRetries) {
            console.log(`Retrying after error: ${response.status}`);
            await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
            continue;
          }
          
          clearTimeout(timeoutId);
          return getFallbackImage();
        }

        const data: ImagenResponse = await response.json();
        console.log('Enhanced Imagen API response received successfully');
        
        if (!data.candidates || data.candidates.length === 0) {
          console.warn('No image generated by enhanced Imagen API, using fallback');
          clearTimeout(timeoutId);
          return getFallbackImage();
        }

        const imageUri = data.candidates[0].image.imageUri;
        console.log('Enhanced generated image URI received');
        
        clearTimeout(timeoutId);
        return imageUri;
        
      } catch (fetchError) {
        lastError = fetchError as Error;
        console.error(`Enhanced attempt ${attempt + 1} failed:`, fetchError);
        
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.warn('Enhanced Imagen API request timed out');
          break;
        }
        
        if (attempt < maxRetries) {
          console.log(`Waiting before enhanced retry...`);
          await new Promise(resolve => setTimeout(resolve, 3000 * (attempt + 1)));
        }
      }
    }
    
    clearTimeout(timeoutId);
    console.error('All enhanced Imagen API attempts failed, using fallback image');
    return getFallbackImage();
    
  } catch (error) {
    console.error('Error generating image with enhanced Gemini Imagen:', error);
    return getFallbackImage();
  }
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