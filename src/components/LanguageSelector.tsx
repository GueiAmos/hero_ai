import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { LanguageOption } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: LanguageOption[];
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  languages
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-white/80 hover:bg-white/90 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl"
      >
        <Globe size={20} className="text-slate-600" />
        <span className="text-slate-700 font-bold">
          {languages.find(lang => lang.code === selectedLanguage)?.flag} {languages.find(lang => lang.code === selectedLanguage)?.name}
        </span>
        <ChevronDown size={18} className={`text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden z-20">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-purple-50/80 transition-colors duration-200 ${
                selectedLanguage === language.code ? 'bg-purple-50/80 text-purple-600' : 'text-slate-700'
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="font-bold">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};