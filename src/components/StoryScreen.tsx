import React, { useState } from 'react';
import { RotateCcw, Download, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';
import { StoryData } from '../types';
import { translations, Language } from '../i18n/translations';
import { generatePDF } from '../utils/pdfGenerator';
import { generateImageWithGemini } from '../utils/geminiApi';

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
      const newImageUrl = await generateImageWithGemini(
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Nouvelle histoire
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            {storyData.title}
          </h1>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all"
          >
            <Download size={18} />
            PDF
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative group">
                  <img
                    src={currentImageUrl}
                    alt="Illustration"
                    className="w-full h-80 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={handleRegenerateImage}
                      disabled={isRegeneratingImage}
                      className="opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-slate-700 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw size={16} className={isRegeneratingImage ? 'animate-spin' : ''} />
                      {isRegeneratingImage ? 'Génération...' : 'Régénérer'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-slate-800 leading-relaxed space-y-6">
                  {storyData.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index} 
                      className={`text-justify text-lg leading-8 ${
                        index === 0 
                          ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:leading-none' 
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
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="flex items-center justify-center gap-2 text-slate-600">
              <Sparkles size={18} className="text-orange-500" />
              Généré par Hero AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};