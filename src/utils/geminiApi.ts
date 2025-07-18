const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_TEXT_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text?: string;
      }>;
    };
  }>;
}

const checkApiKey = () => {
  if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY is not configured. Please add your Gemini API key to the .env file.');
  }
};

const getWordCount = (size: string): string => {
  switch (size) {
    case 'small': return '300-500';
    case 'medium': return '600-900';
    case 'long': return '1000-1400';
    case 'veryLong': return '1500-2000';
    default: return '600-900';
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
    return ['élève', 'enfant curieux', 'petit explorateur', 'jeune inventeur', 'apprenti magicien', 'collectionneur'][Math.floor(Math.random() * 6)];
  } else if (age <= 17) {
    return ['lycéen', 'étudiante', 'apprenti', 'jeune artiste', 'sportif', 'musicienne', 'passionné de sciences', 'créateur'][Math.floor(Math.random() * 8)];
  } else if (age <= 25) {
    return ['étudiant', 'stagiaire', 'jeune entrepreneur', 'artiste', 'développeur', 'journaliste', 'designer', 'photographe', 'coach', 'influenceur'][Math.floor(Math.random() * 10)];
  } else if (age <= 35) {
    return ['ingénieur', 'professeur', 'médecin', 'architecte', 'chef cuisinier', 'consultant', 'avocat', 'psychologue', 'vétérinaire', 'pilote', 'chercheur', 'entrepreneur'][Math.floor(Math.random() * 12)];
  } else if (age <= 50) {
    return ['directeur', 'chirurgien', 'professeur expert', 'architecte senior', 'chef étoilé', 'consultant expert', 'avocat associé', 'psychologue expert', 'vétérinaire spécialisé', 'commandant', 'directeur de recherche'][Math.floor(Math.random() * 11)];
  } else {
    return ['expert-conseil', 'professeur émérite', 'médecin-chef', 'maître architecte', 'critique', 'mentor', 'juge', 'thérapeute expert', 'directeur de clinique', 'instructeur', 'scientifique renommé'][Math.floor(Math.random() * 11)];
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
    'une ville moderne aux buildings lumineux',
    'une petite ville côtière aux maisons colorées',
    'un campus universitaire verdoyant',
    'une forêt mystérieuse aux arbres anciens',
    'un laboratoire de recherche moderne',
    'un quartier artistique plein de couleurs',
    'une station spatiale en orbite',
    'un village de montagne paisible',
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

export const generateStoryWithGemini = async (heroName: string, secretWord: string, language: string, size: string): Promise<string> => {
  checkApiKey();
  
  const wordCount = getWordCount(size);
  const heroAge = getRandomAge();
  const profession = getRandomProfession(heroAge);
  const personality = getRandomPersonality();
  const setting = getRandomSetting();
  
  const prompt = language === 'fr' 
    ? `Écris une histoire simple, captivante et moderne qui sort des sentiers battus.

PERSONNAGE PRINCIPAL:
- Nom: ${heroName}
- Âge: ${heroAge} ans
- Profession/Statut: ${profession}
- Personnalité: ${personality}
- Lieu principal: ${setting}

ÉLÉMENT CENTRAL: "${secretWord}" doit être au cœur de l'intrigue de manière créative et surprenante. Ce n'est pas juste un objet mentionné, mais l'élément qui déclenche toute l'aventure.

EXIGENCES CRÉATIVES STRICTES:
- Histoire de ${wordCount} mots environ
- Utilise un vocabulaire SIMPLE et FACILE à comprendre
- Évite les mots compliqués ou techniques
- Phrases courtes et claires
- INTERDICTION absolue des clichés fantasy (pas de dragons, sorciers, royaumes magiques)
- Univers contemporain ou futuriste avec des situations du quotidien
- Intégrer la technologie moderne de façon simple (téléphones, ordinateurs, internet, etc.)
- Créer des situations uniques mais compréhensibles
- Développer des personnages attachants et simples
- Inclure des rebondissements surprenants mais logiques
- Aborder des thèmes simples (amitié, famille, découverte, courage)

THÈMES MODERNES SIMPLES À EXPLORER:
- Technologie et vie quotidienne
- Réseaux sociaux et connexions
- Écologie et nature
- Diversité et inclusion
- Innovation simple
- Relations humaines
- Découverte de soi
- Entraide et solidarité

STYLE NARRATIF:
- Ton moderne, simple et engageant
- Dialogues naturels et faciles
- Descriptions simples mais vivantes
- Rythme dynamique qui donne envie de connaître la suite
- Fin satisfaisante qui fait sourire

INTERDICTIONS:
- Pas de magie traditionnelle
- Pas de créatures fantastiques
- Pas de quête classique
- Pas de "il était une fois"
- Pas de monde médiéval
- Pas de mots compliqués ou techniques

Crée une histoire simple mais passionnante qui donne envie de connaître la suite !`
    : `Write a simple, captivating and modern story that breaks new ground.

MAIN CHARACTER:
- Name: ${heroName}
- Age: ${heroAge} years old
- Profession/Status: ${profession}
- Personality: ${personality}
- Main setting: ${setting}

CENTRAL ELEMENT: "${secretWord}" must be at the heart of the plot in a creative and surprising way. It's not just a mentioned object, but the element that triggers the entire adventure.

STRICT CREATIVE REQUIREMENTS:
- Story of approximately ${wordCount} words
- Use SIMPLE and EASY to understand vocabulary
- Avoid complicated or technical words
- Short and clear sentences
- ABSOLUTE PROHIBITION of fantasy clichés (no dragons, wizards, magical kingdoms)
- Contemporary or futuristic universe with everyday situations
- Integrate modern technology in a simple way (phones, computers, internet, etc.)
- Create unique but understandable situations
- Develop endearing and simple characters
- Include surprising but logical plot twists
- Address simple themes (friendship, family, discovery, courage)

SIMPLE MODERN THEMES TO EXPLORE:
- Technology and daily life
- Social networks and connections
- Ecology and nature
- Diversity and inclusion
- Simple innovation
- Human relationships
- Self-discovery
- Mutual aid and solidarity

NARRATIVE STYLE:
- Modern, simple and engaging tone
- Natural and easy dialogue
- Simple but vivid descriptions
- Dynamic pace that makes you want to know what happens next
- Satisfying ending that makes you smile

PROHIBITIONS:
- No traditional magic
- No fantastic creatures
- No classic quest
- No "once upon a time"
- No medieval world
- No complicated or technical words

Create a simple but exciting story that makes you want to know what happens next!`;

  try {
    const response = await fetch(`${GEMINI_TEXT_API_URL}?key=${GEMINI_API_KEY}`, {
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
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No story generated');
    }

    return data.candidates[0].content.parts[0].text || '';
  } catch (error) {
    console.error('Error generating story with Gemini:', error);
    throw error;
  }
};

export const generateTitleWithGemini = async (heroName: string, secretWord: string, storyContent: string, language: string): Promise<string> => {
  checkApiKey();
  
  const prompt = language === 'fr'
    ? `Analyse cette histoire moderne et crée un titre simple et accrocheur qui capture son essence.

HISTOIRE: ${storyContent.substring(0, 1200)}...

CRITÈRES POUR LE TITRE:
- Style moderne et simple
- Évoque l'innovation et le futur
- Fait référence subtilement au concept de "${secretWord}"
- Suscite la curiosité sans tout révéler
- Maximum 5 mots
- Éviter les formules compliquées
- Utilise des mots simples et faciles

Réponds uniquement avec le titre, sans guillemets.`
    : `Analyze this modern story and create a simple and catchy title that captures its essence.

STORY: ${storyContent.substring(0, 1200)}...

TITLE CRITERIA:
- Modern and simple style
- Evokes innovation and the future
- Subtly references the concept of "${secretWord}"
- Sparks curiosity without revealing everything
- Maximum 5 words
- Avoid complicated formulas
- Use simple and easy words

Respond only with the title, without quotes.`;

  try {
    const response = await fetch(`${GEMINI_TEXT_API_URL}?key=${GEMINI_API_KEY}`, {
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
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No title generated');
    }

    return data.candidates[0].content.parts[0].text?.trim() || (language === 'fr' ? `L'Aventure de ${heroName}` : `The Adventure of ${heroName}`);
  } catch (error) {
    console.error('Error generating title with Gemini:', error);
    return language === 'fr' ? `L'Aventure de ${heroName}` : `The Adventure of ${heroName}`;
  }
};