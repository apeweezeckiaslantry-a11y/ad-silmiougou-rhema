import React, { useState } from 'react';
import { Star, Image as ImageIcon, Copy, Check, Trash2, BookOpen } from 'lucide-react';

export default function Favorites({ favorites, onSelectForStudio, onRemoveFavorite }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (verse) => {
    navigator.clipboard.writeText(`« ${verse.text} » — ${verse.reference} (LSG)`);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Entête */}
      <div className="pb-2 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          Votre Trésor Personnel
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
          Versets Favoris & Méditations
        </h2>
        <p className="text-sm text-slate-400">
          Retrouvez les paroles bibliques qui ont touché votre cœur et transformez-les en visuels
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Star className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">Aucun verset favori pour l'instant</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Cliquez sur l'étoile d'un verset dans le « Verset du Jour » ou la « Bibliothèque » pour l'ajouter à vos trésors spirituels.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => {
            const isCopied = copiedId === fav.id;
            return (
              <div
                key={fav.id}
                className="flex flex-col justify-between p-5 rounded-2xl glass-card border border-slate-800 hover:border-amber-400/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {fav.theme || 'Favori'}
                    </span>
                    <button
                      onClick={() => onRemoveFavorite(fav)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                      title="Retirer des favoris"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm font-serif text-slate-200 leading-relaxed mb-4">
                    « {fav.text} »
                  </p>
                </div>

                <div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-cinzel text-amber-400">
                      {fav.reference}
                    </span>
                    <span className="text-[10px] text-slate-400">Louis Segond</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectForStudio(fav)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Créer le Visuel</span>
                    </button>

                    <button
                      onClick={() => handleCopy(fav)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all cursor-pointer"
                      title="Copier le verset"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
