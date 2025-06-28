import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { translations, Language } from '../i18n/translations';
import { LanguageOption } from '../types';
import { Sparkles, BookOpen, Wand2, Heart, ArrowRight, Zap, Users, Palette, Star, Rocket } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-100/10 to-pink-100/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center p-3">
                <img 
                  src="/logo.png" 
                  alt="Hero AI Logo" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star size={12} className="text-white" />
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">Hero AI</span>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            languages={languages}
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-purple-600 font-semibold text-lg">Nouvelle génération d'IA créative</span>
                  </div>
                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="text-slate-800">Crée ton</span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                      Univers Magique
                    </span>
                  </h1>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  {t.landingDescription || "Transforme ton nom et un mot secret en une aventure extraordinaire générée par l'IA. Des histoires uniques, des illustrations magnifiques, le tout en quelques secondes."}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="group flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Rocket size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">IA Avancée</h3>
                    <p className="text-sm text-slate-600 mt-2">Histoires uniques avec personnages d'âges variés</p>
                  </div>
                </div>
                
                <div className="group flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Palette size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Art Personnalisé</h3>
                    <p className="text-sm text-slate-600 mt-2">Illustrations anime générées pour chaque histoire</p>
                  </div>
                </div>
                
                <div className="group flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Universel</h3>
                    <p className="text-sm text-slate-600 mt-2">Adapté à tous les âges et toutes les cultures</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-4 text-xl shadow-xl"
                >
                  <Wand2 size={28} />
                  {t.startCreating || "Commencer à créer"}
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-slate-600">Histoires possibles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">AI</div>
                  <div className="text-sm text-slate-600">Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">⚡</div>
                  <div className="text-sm text-slate-600">Instantané</div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Visual */}
            <div className="relative">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                  alt="Enfant lisant un livre magique avec des étoiles qui s'échappent"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Sparkles size={32} className="text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Star size={24} className="text-white" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 inline-block border border-white/50">
            <p className="flex items-center justify-center gap-2 text-slate-500">
              Créé avec <Heart size={16} className="text-red-500 animate-pulse" /> par Hero AI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};