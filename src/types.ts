export interface StoryData {
  heroName: string;
  secretWord: string;
  language: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export type AppScreen = 'welcome' | 'generating' | 'story';