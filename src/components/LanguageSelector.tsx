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
        className="flex items-center gap-3 px-5 py-3 bg-white/90 hover:bg-white rounded-2xl transition-all duration-300 backdrop-blur-sm border border-slate-200 shadow-lg"
      >
        <Globe size={20} className="text-slate-600" />
        <span className="text-slate-700 font-bold">
          {languages.find(lang => lang.code === selectedLanguage)?.flag} {languages.find(lang => lang.code === selectedLanguage)?.name}
        </span>
        <ChevronDown size={18} className={`text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-20">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors duration-200 ${
                selectedLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
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