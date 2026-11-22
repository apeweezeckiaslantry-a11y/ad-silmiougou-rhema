import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VerseOfTheDay from './components/VerseOfTheDay';
import VisualStudio from './components/VisualStudio';
import BibleLibrary from './components/BibleLibrary';
import Favorites from './components/Favorites';
import ChurchInfo from './components/ChurchInfo';
import { VERSES_DATABASE, getVerseOfTheDay } from './data/verses';
import { CHURCH_CONFIG } from './data/churchInfo';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [verses, setVerses] = useState(() => {
    const saved = localStorage.getItem('rhema_custom_verses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...VERSES_DATABASE];
      } catch (e) {
        return VERSES_DATABASE;
      }
    }
    return VERSES_DATABASE;
  });

  const [currentVerse, setCurrentVerse] = useState(() => getVerseOfTheDay());
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rhema_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Gestion de l'installation PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  // Sauvegarder les favoris
  useEffect(() => {
    localStorage.setItem('rhema_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (verseItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === verseItem.id);
      if (exists) {
        return prev.filter((f) => f.id !== verseItem.id);
      } else {
        return [verseItem, ...prev];
      }
    });
  };

  const handleRemoveFavorite = (verseItem) => {
    setFavorites((prev) => prev.filter((f) => f.id !== verseItem.id));
  };

  const handleSelectForStudio = (verseItem) => {
    setCurrentVerse(verseItem);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentVerse(verses[randomIndex]);
  };

  const handleAddCustomVerse = (newVerse) => {
    setVerses((prev) => [newVerse, ...prev]);
    // Sauvegarder les versets personnalisés
    const currentCustoms = JSON.parse(localStorage.getItem('rhema_custom_verses') || '[]');
    localStorage.setItem('rhema_custom_verses', JSON.stringify([newVerse, ...currentCustoms]));
    setCurrentVerse(newVerse);
    setActiveTab('studio');
  };

  const isCurrentFavorite = favorites.some((f) => f.id === currentVerse.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Entête & Navigation Principale */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        onInstallPwa={handleInstallPwa}
        canInstall={canInstall}
      />

      {/* Contenu Principal selon l'onglet actif */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'today' && (
          <VerseOfTheDay
            verse={currentVerse}
            onSelectForStudio={handleSelectForStudio}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isCurrentFavorite}
            onRandomVerse={handleRandomVerse}
          />
        )}

        {activeTab === 'studio' && (
          <VisualStudio
            verse={currentVerse}
            onOpenLibrary={() => setActiveTab('library')}
          />
        )}

        {activeTab === 'library' && (
          <BibleLibrary
            verses={verses}
            onSelectForStudio={handleSelectForStudio}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            onAddCustomVerse={handleAddCustomVerse}
          />
        )}

        {activeTab === 'favorites' && (
          <Favorites
            favorites={favorites}
            onSelectForStudio={handleSelectForStudio}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}

        {activeTab === 'church' && (
          <ChurchInfo
            onInstallPwa={handleInstallPwa}
            canInstall={canInstall}
            onSelectForStudio={handleSelectForStudio}
          />
        )}
      </main>

      {/* Pied de Page Élégant avec Signature */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
          <div>
            <a 
              href={CHURCH_CONFIG.facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-slate-300 hover:text-blue-400 transition-colors"
            >
              {CHURCH_CONFIG.fullName}
            </a>
            <span className="hidden sm:inline"> • </span>
            <span className="italic text-amber-400/80">« {CHURCH_CONFIG.motto} »</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Conçu & Développé par</span>
            <button 
              onClick={() => setActiveTab('church')}
              className="font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {CHURCH_CONFIG.developer.name}
            </button>
            <span className="text-slate-600">|</span>
            <span>Édition Céleste v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
