import React from 'react';
import { Download, RotateCcw, BookOpen, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <BookOpen size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t.storyReady}
            </h1>
          </div>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Story Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Sparkles size={24} />
              {storyData.title}
            </h2>
          </div>

          {/* Story Image */}
          <div className="p-6 bg-gray-50">
            <img
              src={storyData.imageUrl}
              alt="Story illustration"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop';
              }}
            />
          </div>

          {/* Story Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {storyData.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-justify">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Download size={20} />
                {t.downloadPdf}
              </button>
              
              <button
                onClick={onCreateNew}
                className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                {t.createNew}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <Sparkles size={16} />
            Généré avec ❤️ par Hero AI
          </p>
        </div>
      </div>
    </div>
  );
};