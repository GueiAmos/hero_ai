import React from 'react';
import { Download, RotateCcw, BookOpen, Sparkles, FileDown, Plus, Share2, Heart } from 'lucide-react';
import { StoryData } from '../types';
import { translations, Language } from '../i18n/translations';
import { generatePDF } from '../utils/pdfGenerator';

interface StoryScreenProps {
  storyData: StoryData;
  onCreateNew: () => void;
  selectedLanguage: string;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({
  storyData,
  onCreateNew,
  selectedLanguage
}) => {
  const t = translations[selectedLanguage as Language];

  const handleDownloadPDF = () => {
    generatePDF(storyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-pink-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl shadow-2xl">
                <BookOpen size={32} className="text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                {t.storyReady}
              </h1>
            </div>
          </div>

          {/* Main Story Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            {/* Story Title Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-center flex items-center justify-center gap-4">
                  <Sparkles size={32} className="animate-pulse" />
                  {storyData.title}
                  <Heart size={32} className="animate-pulse" />
                </h2>
              </div>
            </div>

            {/* Story Content Layout */}
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Image Section */}
              <div className="lg:col-span-2 p-8 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                <div className="sticky top-8">
                  <div className="relative group">
                    <img
                      src={storyData.imageUrl}
                      alt="Illustration de l'histoire"
                      className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/80 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Story Info Card */}
                  <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-purple-500" />
                      Détails de l'histoire
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Héros :</span>
                        <span className="font-medium text-slate-800">{storyData.heroName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Mot magique :</span>
                        <span className="font-medium text-purple-600">{storyData.secretWord}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Taille :</span>
                        <span className="font-medium text-slate-800">{storyData.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Langue :</span>
                        <span className="font-medium text-slate-800">{storyData.language === 'fr' ? 'Français' : 'English'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Section */}
              <div className="lg:col-span-3 p-8 bg-white/50">
                <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="prose prose-lg max-w-none text-slate-800 leading-relaxed">
                    {storyData.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className={`mb-8 text-justify text-lg leading-8 ${
                        index === 0 
                          ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-purple-600 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:leading-none' 
                          : ''
                      }`}>
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-8 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50 border-t border-white/50">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 text-lg shadow-xl"
                >
                  <FileDown size={24} />
                  Télécharger PDF
                </button>
                
                <button
                  onClick={onCreateNew}
                  className="flex-1 bg-white/90 hover:bg-white text-slate-700 font-bold py-5 px-8 rounded-2xl border-2 border-purple-300 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 text-lg backdrop-blur-sm"
                >
                  <Plus size={24} />
                  Nouvelle histoire
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 inline-block">
              <p className="flex items-center justify-center gap-3 text-lg font-medium text-slate-600">
                <Sparkles size={20} className="text-purple-500" />
                Généré avec ❤️ par Hero AI
                <Heart size={20} className="text-pink-500" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};