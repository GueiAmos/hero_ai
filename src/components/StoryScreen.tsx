import React, { useState } from 'react';
import { RotateCcw, Download, RefreshCw, Sparkles, ArrowLeft, Share2 } from 'lucide-react';
import { StoryData } from '../types';
import { translations, Language } from '../i18n/translations';
import { generatePDF } from '../utils/pdfGenerator';
import { generateImageWithImagine } from '../utils/imagineApi';

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
  const [currentImageUrl, setCurrentImageUrl] = useState(storyData.imageUrl);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const t = translations[selectedLanguage as Language];

  const handleDownloadPDF = () => {
    const updatedStoryData = { ...storyData, imageUrl: currentImageUrl };
    generatePDF(updatedStoryData);
  };

  const handleRegenerateImage = async () => {
    setIsRegeneratingImage(true);
    try {
      const newImageUrl = await generateImageWithImagine(
        storyData.heroName, 
        storyData.secretWord, 
        storyData.content
      );
      setCurrentImageUrl(newImageUrl);
    } catch (error) {
      console.error('Error regenerating image:', error);
    } finally {
      setIsRegeneratingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-xl hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Nouvelle histoire</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                <img 
                  src="/logo.png" 
                  alt="Hero AI Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                {storyData.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRegenerateImage}
                disabled={isRegeneratingImage}
                className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 hover:border-gray-400 transition-all disabled:opacity-50"
              >
                <RefreshCw size={16} className={isRegeneratingImage ? 'animate-spin' : ''} />
                <span className="text-sm font-medium">
                  {isRegeneratingImage ? 'Génération...' : 'Nouvelle image'}
                </span>
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all"
              >
                <Download size={18} />
                <span className="font-medium">Télécharger PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="relative group">
                  <img
                    src={currentImageUrl}
                    alt="Illustration de l'histoire"
                    className="w-full h-80 lg:h-96 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={handleRegenerateImage}
                      disabled={isRegeneratingImage}
                      className="opacity-0 group-hover:opacity-100 bg-white/95 hover:bg-white text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-lg"
                    >
                      <RefreshCw size={16} className={isRegeneratingImage ? 'animate-spin' : ''} />
                      {isRegeneratingImage ? 'Génération...' : 'Régénérer'}
                    </button>
                  </div>
                </div>
                
                {/* Story Info */}
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-500" />
                    Détails de l'histoire
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Héros :</span>
                      <span className="font-medium text-gray-800">{storyData.heroName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mot magique :</span>
                      <span className="font-medium text-purple-600">{storyData.secretWord}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taille :</span>
                      <span className="font-medium text-gray-800">{storyData.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Langue :</span>
                      <span className="font-medium text-gray-800">{storyData.language === 'fr' ? 'Français' : 'English'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-6">
                  {storyData.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index} 
                      className={`text-justify text-lg leading-8 ${
                        index === 0 
                          ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-purple-600 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:leading-none' 
                          : ''
                      }`}
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 inline-block border border-gray-100 shadow-lg">
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <Sparkles size={18} className="text-purple-500" />
              Généré avec ❤️ par Hero AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};