import React, { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GeneratingScreen } from './components/GeneratingScreen';
import { StoryScreen } from './components/StoryScreen';
import { generateStory } from './utils/storyGenerator';
import { AppScreen, StoryData } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
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

  const handleGetStarted = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="App">
      {currentScreen === 'landing' && (
        <LandingScreen
          onGetStarted={handleGetStarted}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onStartGeneration={handleStartGeneration}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          onBack={() => setCurrentScreen('landing')}
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