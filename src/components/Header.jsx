import React from 'react';
import { Sparkles, Image as ImageIcon, BookOpen, Church, Star, Download, Heart, Smartphone } from 'lucide-react';
import { CHURCH_CONFIG } from '../data/churchInfo';

// Icône officielle Google Play Store en couleurs vives
export function GooglePlayIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      <path d="M48.1 36.8C45.3 40.5 43.6 45.8 43.6 52.4V459.6C43.6 466.2 45.3 471.5 48.1 475.2L49.9 477L288.7 238.2V232.8L49.9 35L48.1 36.8Z" fill="#00C1FF"/>
      <path d="M368.3 317.8L288.7 238.2V232.8L368.3 153.2L369.9 154.1L464.3 207.7C471.2 211.6 476.1 218.9 476.1 227.5C476.1 236.1 471.2 243.4 464.3 247.3L369.9 320.9L368.3 317.8Z" fill="#FFCF00"/>
      <path d="M369.9 320.9L288.7 239.7L48.1 480.3C52.9 485.4 60.5 486.2 68.7 481.5L369.9 320.9Z" fill="#FF3A44"/>
      <path d="M369.9 154.1L68.7 3.5C60.5-1.2 52.9-0.4 48.1 4.7L288.7 245.3L369.9 154.1Z" fill="#00E676"/>
    </svg>
  );
}

// Icône officielle Apple App Store
export function AppleStoreIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.86-12-14.46-6.19-9.45-11.11-20.2-14.76-32.24-3.65-12.04-5.48-23.47-5.48-34.29 0-14.77 3.73-27.18 11.2-37.23 7.47-10.05 16.94-15.19 28.42-15.42 4.13 0 9.07 1.14 14.83 3.42 5.76 2.28 9.29 3.48 10.59 3.6 1.85-.22 5.54-1.47 11.07-3.75 5.53-2.28 10.37-3.32 14.53-3.12 12.18.65 21.94 4.88 29.27 12.69-10.88 6.63-16.19 15.75-15.93 27.37.22 9.13 3.69 16.83 10.43 23.09 6.74 6.26 14.67 9.87 23.8 10.84-2.17 6.3-4.78 12.73-7.83 19.29zm-38.6-118.52c0 5.43-1.85 10.86-5.54 16.29-3.69 5.43-8.48 9.5-14.35 12.21-.22-.87-.33-1.63-.33-2.28 0-5.43 1.96-10.97 5.87-16.62 3.91-5.65 8.7-9.78 14.35-12.39z"/>
    </svg>
  );
}

export default function Header({ activeTab, setActiveTab, favoritesCount, onInstallPwa, canInstall }) {
  const todayDateStr = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const navItems = [
    { id: 'today', label: 'Verset du Jour', icon: Sparkles },
    { id: 'studio', label: 'Studio Visuel', icon: ImageIcon },
    { id: 'library', label: 'Bibliothèque LSG', icon: BookOpen },
    { id: 'favorites', label: 'Favoris', icon: Star, badge: favoritesCount > 0 ? favoritesCount : null },
    { id: 'church', label: 'Temple & Média', icon: Church }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10">
      {/* Top Bar avec Logo et Titre */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-lg shadow-blue-900/50 bg-white flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
              <img 
                src={CHURCH_CONFIG.logoUrl} 
                alt="Logo Assemblées de Dieu" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" title="Actif / Prêt" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold font-cinzel text-white tracking-wide">
                Rhema <span className="text-amber-400">AD Silmiougou</span>
              </h1>
              <span className="hidden md:inline-flex text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                Louis Segond
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Église des Assemblées de Dieu • Tanghin <span className="text-slate-400/80">(Ouagadougou, Burkina Faso)</span>
            </p>
          </div>
        </div>

        {/* Date & Boutons d'Action (Stores & PWA) */}
        <div className="flex items-center gap-2.5">
          <div className="hidden xl:block text-right pr-2">
            <div className="text-xs font-semibold text-slate-300 capitalize">{todayDateStr}</div>
            <div className="text-[11px] text-amber-400/90 font-medium italic">« Tout L'Évangile pour tout homme »</div>
          </div>

          {/* Bouton Annonce Play Store & App Store avec les deux logos officiels */}
          <button
            onClick={() => setActiveTab('church')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-900/90 hover:from-slate-800 hover:to-slate-800 text-slate-200 border border-amber-400/50 text-xs font-semibold shadow-md transition-all hover:scale-105 cursor-pointer"
            title="Téléchargez bientôt notre application sur Google Play Store et Apple App Store"
          >
            <div className="flex items-center gap-1.5">
              <GooglePlayIcon className="w-3.5 h-3.5 shrink-0" />
              <AppleStoreIcon className="w-3.5 h-3.5 text-white shrink-0" />
            </div>
            <span className="hidden sm:inline font-bold text-amber-300">Bientôt sur Play Store & App Store</span>
            <span className="sm:hidden font-bold text-amber-300">Stores</span>
          </button>

          {canInstall && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-900/40 border border-blue-400/30 transition-all hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Installer l'App</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-900/50 border border-blue-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
