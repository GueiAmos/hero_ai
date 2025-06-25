export const translations = {
  fr: {
    appTitle: "Hero AI",
    slogan: "Ton nom, un mot, et deviens le héros de ta propre histoire !",
    welcome: "Crée ton aventure de Héros AI",
    selectLanguage: "Choisir la langue",
    heroNameLabel: "Quel est le nom de notre héros ?",
    heroNamePlaceholder: "Entre ton nom...",
    secretWordLabel: "Donne un mot secret pour l'aventure !",
    secretWordPlaceholder: "Un mot magique...",
    storySizeLabel: "Quelle longueur d'histoire veux-tu ?",
    createStory: "Crée mon histoire !",
    generating: "Ton histoire de héros est en préparation...",
    generatingSubtext: "L'IA tisse ton aventure magique...",
    storyReady: "Ton aventure de Héros est prête !",
    downloadPdf: "Télécharger l'histoire en PDF",
    createNew: "Créer une nouvelle histoire",
    error: "Une erreur est survenue",
    fieldRequired: "Ce champ est requis",
    storyTitle: "L'Aventure de",
    storySizes: {
      small: "Petite",
      medium: "Moyenne", 
      long: "Longue",
      veryLong: "Très longue"
    },
    storySizeDescriptions: {
      small: "Histoire courte et captivante",
      medium: "Aventure équilibrée",
      long: "Récit détaillé et immersif",
      veryLong: "Épopée complète et riche"
    }
  },
  en: {
    appTitle: "Hero AI",
    slogan: "Your name, one word, and become the hero of your own story!",
    welcome: "Create your Hero AI Adventure",
    selectLanguage: "Choose language",
    heroNameLabel: "What is our hero's name?",
    heroNamePlaceholder: "Enter your name...",
    secretWordLabel: "Give a secret word for the adventure!",
    secretWordPlaceholder: "A magic word...",
    storySizeLabel: "What story length do you want?",
    createStory: "Create my story!",
    generating: "Your hero story is being prepared...",
    generatingSubtext: "AI is weaving your magical adventure...",
    storyReady: "Your Hero Adventure is ready!",
    downloadPdf: "Download story as PDF",
    createNew: "Create a new story",
    error: "An error occurred",
    fieldRequired: "This field is required",
    storyTitle: "The Adventure of",
    storySizes: {
      small: "Small",
      medium: "Medium",
      long: "Long", 
      veryLong: "Very Long"
    },
    storySizeDescriptions: {
      small: "Short and captivating story",
      medium: "Balanced adventure",
      long: "Detailed and immersive tale",
      veryLong: "Complete and rich epic"
    }
  }
};

export type Language = keyof typeof translations;