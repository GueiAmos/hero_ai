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
        className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md"
      >
        <Globe size={18} className="text-gray-600" />
        <span className="text-gray-700 font-medium text-sm">
          {languages.find(lang => lang.code === selectedLanguage)?.flag} {languages.find(lang => lang.code === selectedLanguage)?.name}
        </span>
        <ChevronDown size={16} className={`text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-20">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                selectedLanguage === language.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium text-sm">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};