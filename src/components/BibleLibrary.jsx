import React, { useState } from 'react';
import { Search, Plus, Sparkles, BookOpen, Star, Image as ImageIcon, Copy, Check, Filter, X } from 'lucide-react';
import { CATEGORIES } from '../data/verses';

export default function BibleLibrary({ 
  verses, 
  onSelectForStudio, 
  onToggleFavorite, 
  favorites, 
  onAddCustomVerse 
}) {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Formulaire pour nouveau verset personnalisé
  const [newRef, setNewRef] = useState('');
  const [newText, setNewText] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newCategory, setNewCategory] = useState('foi');

  const filteredVerses = verses.filter((v) => {
    const matchesCategory = selectedCategory === 'tous' || v.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      v.text.toLowerCase().includes(query) || 
      v.reference.toLowerCase().includes(query) ||
      (v.theme && v.theme.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (verse) => {
    navigator.clipboard.writeText(`« ${verse.text} » — ${verse.reference} (LSG 1910)`);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCustomVerse = (e) => {
    e.preventDefault();
    if (!newRef.trim() || !newText.trim()) return;

    const customVerse = {
      id: Date.now(),
      reference: newRef.trim(),
      text: newText.trim(),
      theme: newTheme.trim() || 'Méditation Spéciale',
      category: newCategory,
      version: 'Louis Segond',
      isCustom: true
    };

    onAddCustomVerse(customVerse);
    setShowAddModal(false);
    setNewRef('');
    setNewText('');
    setNewTheme('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Entête Bibliothèque */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Sainte Bible • Version Louis Segond (1910)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
            Trésors des Écritures
          </h2>
          <p className="text-sm text-slate-400">
            Explorez les versets par thème ou ajoutez le passage biblique du culte
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/40 border border-blue-400/30 transition-all hover:scale-105 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Ajouter un Verset pour le Culte</span>
        </button>
      </div>

      {/* Barre de Recherche & Filtres */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé (ex: paix, berger, amour, foi) ou référence (ex: Psaumes 23, Jean 3)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:outline-none shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Catégories de Versets */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50 border border-blue-400/40'
                    : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="text-xs text-slate-400 flex items-center justify-between">
        <span>{filteredVerses.length} verset{filteredVerses.length > 1 ? 's' : ''} trouvé{filteredVerses.length > 1 ? 's' : ''}</span>
        <span className="text-amber-400 font-medium">Louis Segond 1910</span>
      </div>

      {/* Grille des Versets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVerses.map((verseItem) => {
          const isFav = favorites.some((f) => f.id === verseItem.id);
          const isCopied = copiedId === verseItem.id;

          return (
            <div
              key={verseItem.id}
              className="flex flex-col justify-between p-5 rounded-2xl glass-card hover:border-blue-500/40 transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-500/20 text-blue-300">
                    {verseItem.theme || 'Verset'}
                  </span>
                  <button
                    onClick={() => onToggleFavorite(verseItem)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFav ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-amber-400'
                    }`}
                    title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                <p className="text-sm font-serif text-slate-200 leading-relaxed mb-4">
                  « {verseItem.text} »
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-cinzel text-amber-400">
                    {verseItem.reference}
                  </span>
                  <span className="text-[10px] text-slate-400">LSG</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectForStudio(verseItem)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Créer le Visuel</span>
                  </button>

                  <button
                    onClick={() => handleCopy(verseItem)}
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

      {filteredVerses.length === 0 && (
        <div className="text-center py-12 p-6 rounded-3xl glass-card">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300 mb-1">Aucun verset trouvé</h3>
          <p className="text-xs text-slate-400 mb-4">Essayez un autre mot-clé ou ajoutez ce passage personnalisé.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
          >
            Ajouter ce verset
          </button>
        </div>
      )}

      {/* Modal Ajout de Verset Personnalisé */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-blue-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-lg font-bold font-cinzel text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Ajouter un Passage Biblique
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomVerse} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Référence du Verset (ex: Jean 3:16 ou Psaumes 91:1) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ésaïe 43:2"
                  value={newRef}
                  onChange={(e) => setNewRef(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Texte des Écritures (Version Louis Segond) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Saisissez ou collez le passage biblique prêché au culte..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Thème / Sujet
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Culte de Victoire"
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="foi">Foi & Confiance</option>
                    <option value="paix">Paix & Réconfort</option>
                    <option value="benediction">Bénédiction</option>
                    <option value="force">Force & Courage</option>
                    <option value="priere">Prière & Communion</option>
                    <option value="louange">Louange & Grâce</option>
                    <option value="promesse">Promesses Divines</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-900/40"
                >
                  Enregistrer & Utiliser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
