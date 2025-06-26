import React from 'react';
import { Download, RotateCcw, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-amber-500 rounded-2xl shadow-lg">
              <BookOpen size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-amber-500 bg-clip-text text-transparent">
              {t.storyReady}
            </h1>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Story Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-amber-500 p-6 text-white">
            <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-3">
              <Sparkles size={28} />
              {storyData.title}
            </h2>
          </div>

          {/* Main Content Area */}
          <div className="lg:flex lg:min-h-[600px]">
            {/* Story Image - Left on desktop, top on mobile */}
            <div className="lg:w-1/2 p-8 bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
              <div className="w-full max-w-lg mx-auto">
                <img
                  src={storyData.imageUrl}
                  alt="Story illustration"
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white/80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop';
                  }}
                />
              </div>
            </div>

            {/* Story Text - Right on desktop, bottom on mobile */}
            <div className="lg:w-1/2 p-8 bg-white flex flex-col">
              <div className="flex-1 overflow-y-auto max-h-[600px] lg:max-h-none">
                <div className="prose prose-lg max-w-none text-slate-800 leading-relaxed">
                  {storyData.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-justify text-lg leading-8 first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-amber-50 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-amber-500 hover:from-indigo-700 hover:via-blue-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <Download size={22} />
                {t.downloadPdf}
              </button>
              
              <button
                onClick={onCreateNew}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 px-6 rounded-2xl border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 text-lg"
              >
                <RotateCcw size={22} />
                {t.createNew}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600">
          <p className="flex items-center justify-center gap-2 text-lg font-medium">
            <Sparkles size={18} className="text-amber-500" />
            Généré avec ❤️ par Hero AI
          </p>
        </div>
      </div>
    </div>
  );
};