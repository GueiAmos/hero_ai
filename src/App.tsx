import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GeneratingScreen } from './components/GeneratingScreen';
import { StoryScreen } from './components/StoryScreen';
import { generateStory } from './utils/storyGenerator';
import { AppScreen, StoryData } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [storyData, setStoryData] = useState<StoryData | null>(null);

  const handleStartGeneration = async (heroName: string, secretWord: string, language: string, size: string) => {
    setCurrentScreen('generating');
    
    try {
      const story = await generateStory(heroName, secretWord, language, size);
      setStoryData(story);
      setCurrentScreen('story');
    } catch (error) {
      console.error('Error generating story:', error);
      // In a real app, show error message and return to welcome screen
      setCurrentScreen('welcome');
    }
  };

  const handleCreateNew = () => {
    setCurrentScreen('welcome');
    setStoryData(null);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="App">
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onStartGeneration={handleStartGeneration}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}
      
      {currentScreen === 'generating' && (
        <GeneratingScreen selectedLanguage={selectedLanguage} />
      )}
      
      {currentScreen === 'story' && storyData && (
        <StoryScreen
          storyData={storyData}
          onCreateNew={handleCreateNew}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
}

export default App;