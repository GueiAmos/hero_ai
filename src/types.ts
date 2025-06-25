export interface StoryData {
  heroName: string;
  secretWord: string;
  language: string;
  size: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export interface StorySizeOption {
  code: string;
  name: string;
  description: string;
}

export type AppScreen = 'welcome' | 'generating' | 'story';