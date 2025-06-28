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
    case 'small': return '400-600';
    case 'medium': return '700-1000';
    case 'long': return '1200-1600';
    case 'veryLong': return '1800-2500';
    default: return '700-1000';
  }
};

const getRandomAge = (): number => {
  const ageRanges = [
    [8, 12],   // Enfant
    [13, 17],  // Adolescent
    [18, 25],  // Jeune adulte
    [26, 35],  // Adulte
    [36, 50],  // Adulte mûr
    [16, 19],  // Lycéen
    [20, 24],  // Étudiant
    [12, 15],  // Collégien
    [25, 30],  // Jeune professionnel
    [40, 60]   // Adulte expérimenté
  ];
  
  const selectedRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
  return Math.floor(Math.random() * (selectedRange[1] - selectedRange[0] + 1)) + selectedRange[0];
};

const getRandomProfession = (age: number): string => {
  if (age <= 12) {
    return ['élève', 'enfant curieux', 'petit explorateur', 'jeune aventurier'][Math.floor(Math.random() * 4)];
  } else if (age <= 17) {
    return ['lycéen', 'étudiante', 'apprenti', 'jeune artiste', 'sportif', 'musicienne'][Math.floor(Math.random() * 6)];
  } else if (age <= 25) {
    return ['étudiant', 'stagiaire', 'jeune entrepreneur', 'artiste', 'développeur', 'journaliste', 'designer', 'photographe'][Math.floor(Math.random() * 8)];
  } else {
    return ['ingénieur', 'professeur', 'médecin', 'architecte', 'chef cuisinier', 'scientifique', 'écrivain', 'avocat', 'psychologue', 'vétérinaire', 'pilote', 'chercheur'][Math.floor(Math.random() * 12)];
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
    'analytique et passionné'
  ];
  return traits[Math.floor(Math.random() * traits.length)];
};

const getRandomSetting = (): string => {
  const settings = [
    'une métropole futuriste',
    'une petite ville côtière',
    'un campus universitaire',
    'une forêt mystérieuse',
    'un laboratoire de recherche',
    'un quartier artistique',
    'une station spatiale',
    'un village de montagne',
    'une île tropicale',
    'un centre-ville animé',
    'une base sous-marine',
    'un parc national'
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
    ? `Écris une histoire captivante et originale. 

PERSONNAGE PRINCIPAL:
- Nom: ${heroName}
- Âge: ${heroAge} ans
- Profession/Statut: ${profession}
- Personnalité: ${personality}
- Lieu: ${setting}

ÉLÉMENT CLÉ: L'histoire doit intégrer de manière créative et surprenante le concept de "${secretWord}". Ce mot doit être central à l'intrigue, pas juste mentionné.

EXIGENCES CRÉATIVES:
- Histoire de ${wordCount} mots environ
- Intrigue originale avec des rebondissements inattendus
- Éviter les clichés (pas de "il était une fois", pas de quête classique)
- Intégrer des éléments contemporains (technologie, réseaux sociaux, enjeux actuels)
- Créer des situations uniques et mémorables
- Développer des personnages secondaires intéressants
- Inclure des détails sensoriels et des descriptions vivantes

THÈMES À EXPLORER:
- Innovation et créativité
- Relations humaines authentiques
- Défis personnels et croissance
- Impact positif sur la communauté
- Découverte de talents cachés
- Résolution de problèmes complexes

STYLE NARRATIF:
- Ton moderne et engageant
- Dialogues naturels et percutants
- Rythme dynamique avec des moments de réflexion
- Fin satisfaisante mais ouverte à l'interprétation

Crée une histoire qui surprendra le lecteur et restera mémorable !`
    : `Write a captivating and original story.

MAIN CHARACTER:
- Name: ${heroName}
- Age: ${heroAge} years old
- Profession/Status: ${profession}
- Personality: ${personality}
- Setting: ${setting}

KEY ELEMENT: The story must creatively and surprisingly integrate the concept of "${secretWord}". This word should be central to the plot, not just mentioned.

CREATIVE REQUIREMENTS:
- Story of approximately ${wordCount} words
- Original plot with unexpected twists
- Avoid clichés (no "once upon a time", no classic quest)
- Integrate contemporary elements (technology, social media, current issues)
- Create unique and memorable situations
- Develop interesting secondary characters
- Include sensory details and vivid descriptions

THEMES TO EXPLORE:
- Innovation and creativity
- Authentic human relationships
- Personal challenges and growth
- Positive community impact
- Discovery of hidden talents
- Solving complex problems

NARRATIVE STYLE:
- Modern and engaging tone
- Natural and impactful dialogue
- Dynamic pace with moments of reflection
- Satisfying but open-ended conclusion

Create a story that will surprise the reader and remain memorable!`;

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
          temperature: 0.95,
          topK: 50,
          topP: 0.9,
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
    ? `Analyse cette histoire et crée un titre accrocheur et mystérieux qui capture son essence unique.

HISTOIRE: ${storyContent.substring(0, 1000)}...

CRITÈRES POUR LE TITRE:
- Évoque l'atmosphère et le mystère de l'histoire
- Fait référence subtilement au mot "${secretWord}" ou à son concept
- Suscite la curiosité sans tout révéler
- Style moderne et percutant
- Maximum 8 mots
- Éviter "L'Aventure de ${heroName}" ou des formules banales

EXEMPLES DE STYLES:
- "Le Secret de [élément mystérieux]"
- "[Concept] de ${heroName}"
- "Quand [élément] rencontre [élément]"
- "[Adjectif] [Nom] de [lieu/concept]"

Réponds uniquement avec le titre, sans guillemets.`
    : `Analyze this story and create a catchy and mysterious title that captures its unique essence.

STORY: ${storyContent.substring(0, 1000)}...

TITLE CRITERIA:
- Evokes the atmosphere and mystery of the story
- Subtly references the word "${secretWord}" or its concept
- Sparks curiosity without revealing everything
- Modern and impactful style
- Maximum 8 words
- Avoid "The Adventure of ${heroName}" or banal formulas

STYLE EXAMPLES:
- "The Secret of [mysterious element]"
- "[Concept] of ${heroName}"
- "When [element] meets [element]"
- "[Adjective] [Noun] of [place/concept]"

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
  console.log('Attempting to generate image with Gemini Imagen...');
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
    console.warn('Gemini API key not configured, using fallback image');
    return getFallbackAnimeImage();
  }
  
  // Analyser l'histoire pour extraire les éléments visuels clés
  const storyExcerpt = storyText.substring(0, 1500);
  
  // Extraire l'âge approximatif du héros depuis l'histoire
  const ageMatch = storyText.match(/(\d+)\s*ans?/);
  const heroAge = ageMatch ? parseInt(ageMatch[1]) : 20;
  
  const prompt = `Create a stunning artistic illustration that visually represents this story's key scene and atmosphere.

STORY ANALYSIS:
- Main character: ${heroName} (approximately ${heroAge} years old)
- Central element: "${secretWord}"
- Story excerpt: ${storyExcerpt}

VISUAL COMPOSITION:
- Show ${heroName} as the main focus, age-appropriate appearance (${heroAge} years old)
- Capture the most dramatic or emotional moment from the story
- Include visual elements that represent "${secretWord}" in the scene
- Create an atmosphere that matches the story's mood and setting
- Show the character's personality through body language and expression

ART STYLE REQUIREMENTS:
- High-quality anime/manga illustration style (Studio Ghibli inspired)
- Cinematic composition with dynamic angles
- Rich, vibrant colors that enhance the mood
- Detailed background that supports the narrative
- Professional character design with expressive features
- Magical or dramatic lighting effects

TECHNICAL SPECIFICATIONS:
- Portrait orientation (3:4 aspect ratio)
- No text, letters, words, or written symbols anywhere
- Focus on visual storytelling through imagery alone
- Suitable for all ages, family-friendly content
- High artistic quality with attention to detail

MOOD AND ATMOSPHERE:
- Capture the emotional core of the story
- Create visual intrigue and wonder
- Balance realism with fantastical elements
- Inspiring and uplifting overall feeling

The illustration should make viewers curious about the story and emotionally connect with the character's journey.`;

  try {
    console.log('Making request to Imagen API...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);
    
    let lastError: Error | null = null;
    const maxRetries = 2;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Imagen API attempt ${attempt + 1}/${maxRetries + 1}`);
        
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

        console.log('Imagen API response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Imagen API error: ${response.status} - ${errorText}`);
          
          if (response.status === 403) {
            console.warn('Imagen API access denied - API key may not have Imagen permissions');
            clearTimeout(timeoutId);
            return getFallbackAnimeImage();
          } else if (response.status === 400) {
            console.warn('Imagen API bad request - prompt may be invalid');
            clearTimeout(timeoutId);
            return getFallbackAnimeImage();
          } else if (response.status === 429) {
            console.warn('Imagen API quota exceeded');
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
              continue;
            }
            clearTimeout(timeoutId);
            return getFallbackAnimeImage();
          }
          
          if (attempt < maxRetries) {
            console.log(`Retrying after error: ${response.status}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            continue;
          }
          
          clearTimeout(timeoutId);
          return getFallbackAnimeImage();
        }

        const data: ImagenResponse = await response.json();
        console.log('Imagen API response received successfully');
        
        if (!data.candidates || data.candidates.length === 0) {
          console.warn('No image generated by Imagen API, using fallback');
          clearTimeout(timeoutId);
          return getFallbackAnimeImage();
        }

        const imageUri = data.candidates[0].image.imageUri;
        console.log('Generated image URI received');
        
        clearTimeout(timeoutId);
        return imageUri;
        
      } catch (fetchError) {
        lastError = fetchError as Error;
        console.error(`Attempt ${attempt + 1} failed:`, fetchError);
        
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.warn('Imagen API request timed out');
          break;
        }
        
        if (attempt < maxRetries) {
          console.log(`Waiting before retry...`);
          await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
        }
      }
    }
    
    clearTimeout(timeoutId);
    console.error('All Imagen API attempts failed, using fallback image');
    return getFallbackAnimeImage();
    
  } catch (error) {
    console.error('Error generating image with Gemini Imagen:', error);
    return getFallbackAnimeImage();
  }
};

const getFallbackAnimeImage = (): string => {
  const animeImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1000&fit=crop'
  ];
  
  return animeImages[Math.floor(Math.random() * animeImages.length)];
};