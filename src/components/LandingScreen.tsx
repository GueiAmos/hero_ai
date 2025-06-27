import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption } from '../types';
import { Sparkles, BookOpen, Wand2, Heart, ArrowRight, Zap, Users, Palette } from 'lucide-react';

interface LandingScreenProps {
  onGetStarted: () => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onGetStarted,
  selectedLanguage,
  onLanguageChange
}) => {
  const t = translations[selectedLanguage as Language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-orange-100/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <img 
                src="/logo.png" 
                alt="Hero AI Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-slate-800">Hero AI</span>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-slate-800">Crée ton</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                    Histoire Magique
                  </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  {t.landingDescription || "Transforme ton nom et un mot secret en une aventure extraordinaire générée par l'IA. Des histoires uniques, des illustrations magnifiques, le tout en quelques secondes."}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">IA Créative</h3>
                  <p className="text-sm text-slate-600">Histoires uniques générées par intelligence artificielle</p>
                </div>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Palette size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Illustrations</h3>
                  <p className="text-sm text-slate-600">Images style anime générées automatiquement</p>
                </div>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Pour Tous</h3>
                  <p className="text-sm text-slate-600">Adapté à tous les âges, de 12 ans à 99 ans</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 hover:from-blue-700 hover:via-blue-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 text-lg mx-auto lg:mx-0 shadow-lg"
              >
                <Sparkles size={24} />
                {t.startCreating || "Commencer à créer"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                  alt="Enfant lisant un livre magique avec des étoiles qui s'échappent"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles size={28} className="text-white" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500">
          <p className="flex items-center justify-center gap-2">
            Créé avec <Heart size={16} className="text-red-500" /> par Hero AI
          </p>
        </footer>
      </div>
    </div>
  );
};