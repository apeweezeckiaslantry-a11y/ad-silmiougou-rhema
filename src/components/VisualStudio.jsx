import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, Share2, Sparkles, Image as ImageIcon, Sliders, Type, Check, 
  Upload, Layers, RotateCcw, Smartphone, Square, Monitor, Eye, BookOpen, AlertCircle, Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BACKGROUND_PRESETS, VISUAL_FORMATS, FONT_STYLES, DESIGN_STYLES } from '../data/backgrounds';
import { CHURCH_CONFIG } from '../data/churchInfo';
import { generateVerseVisualBlob } from '../utils/canvasExporter';

export default function VisualStudio({ verse, onOpenLibrary }) {
  // État du verset en cours d'édition
  const [currentVerse, setCurrentVerse] = useState(verse);
  const [selectedFormat, setSelectedFormat] = useState('story'); // 'story', 'square', 'banner'
  const [designStyle, setDesignStyle] = useState('celeste'); // 'celeste', 'glass', 'proclamation', 'sahel'
  const [selectedBg, setSelectedBg] = useState(BACKGROUND_PRESETS[0]);
  const [selectedBgCategory, setSelectedBgCategory] = useState('Tous');
  const [customImage, setCustomImage] = useState(null);
  const [selectedFont, setSelectedFont] = useState(FONT_STYLES[0]);
  const [fontSizeModifier, setFontSizeModifier] = useState(1.0);
  const [darkenOverlay, setDarkenOverlay] = useState(0.45);
  const [showLogo, setShowLogo] = useState(true);
  const [showSignature, setShowSignature] = useState(true);

  // État de génération
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTabControls, setActiveTabControls] = useState('backgrounds'); // 'backgrounds', 'text', 'branding'

  const fileInputRef = useRef(null);

  // Synchroniser quand le verset change depuis l'extérieur
  useEffect(() => {
    setCurrentVerse(verse);
  }, [verse]);

  // Régénérer le preview Blob chaque fois qu'un paramètre clé change
  useEffect(() => {
    let active = true;
    const generatePreview = async () => {
      try {
        const result = await generateVerseVisualBlob({
          verse: currentVerse,
          background: selectedBg,
          format: selectedFormat,
          designStyle,
          customImageUrl: customImage,
          showLogo,
          showChurchSignature: showSignature,
          fontFamily: selectedFont.style.fontFamily,
          fontSizeModifier,
          darkenOverlay
        });
        if (active) {
          setPreviewBlobUrl(result.dataUrl);
        }
      } catch (e) {
        console.error('Erreur génération preview canvas:', e);
      }
    };

    const timer = setTimeout(generatePreview, 120);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [currentVerse, selectedFormat, designStyle, selectedBg, customImage, selectedFont, fontSizeModifier, darkenOverlay, showLogo, showSignature]);

  // Gestion de l'upload d'image personnalisée
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Téléchargement du visuel en HD
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const { blob } = await generateVerseVisualBlob({
        verse: currentVerse,
        background: selectedBg,
        format: selectedFormat,
        designStyle,
        customImageUrl: customImage,
        showLogo,
        showChurchSignature: showSignature,
        fontFamily: selectedFont.style.fontFamily,
        fontSizeModifier,
        darkenOverlay
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const cleanRef = currentVerse.reference.replace(/[^a-zA-Z0-9]/g, '_');
      a.href = url;
      a.download = `AD_Silmiougou_${cleanRef}_${selectedFormat}_${designStyle}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      alert("Erreur lors de la création de l'image. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Partage direct WhatsApp / Réseaux Sociaux (Web Share API)
  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const { blob } = await generateVerseVisualBlob({
        verse: currentVerse,
        background: selectedBg,
        format: selectedFormat,
        designStyle,
        customImageUrl: customImage,
        showLogo,
        showChurchSignature: showSignature,
        fontFamily: selectedFont.style.fontFamily,
        fontSizeModifier,
        darkenOverlay
      });

      const file = new File([blob], `AD_Silmiougou_${currentVerse.reference}.png`, { type: 'image/png' });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Verset du Jour - AD Silmiougou`,
          text: `« ${currentVerse.text} » — ${currentVerse.reference} (LSG)\n${CHURCH_CONFIG.fullName}`
        });
      } else {
        handleDownload();
      }
    } catch (e) {
      console.warn('Partage annulé ou non supporté:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const bgCategories = ['Tous', 'Afrique & Sahel', 'Symboles Sacrés', 'Nature & Majesté', 'Élégance AD'];
  const filteredBgs = selectedBgCategory === 'Tous' 
    ? BACKGROUND_PRESETS 
    : BACKGROUND_PRESETS.filter(b => b.category === selectedBgCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Entête du Studio */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Studio Graphique Pro • Temple de Silmiougou, Tanghin
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
            Générateur de Visuels Célestes
          </h2>
          <p className="text-sm text-slate-400">
            Créez des affiches bibliques signées avec le logo et les références du Temple mis en exergue
          </p>
        </div>

        <button
          onClick={onOpenLibrary}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all hover:scale-105 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Changer de Verset</span>
        </button>
      </div>

      {/* Disposition Principale : Contrôles à Gauche, Prévisualisation à Droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLONNE CONTRÔLES (5 cols) */}
        <div className="lg:col-span-5 space-y-5">

          {/* 1. Sélection du Format */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-400" />
              Format de l'Affiche
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VISUAL_FORMATS.map((fmt) => {
                const isSelected = selectedFormat === fmt.id;
                const Icon = fmt.id === 'story' ? Smartphone : fmt.id === 'square' ? Square : Monitor;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-900/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold block">{fmt.ratio}</span>
                    <span className="text-[10px] text-slate-400 leading-tight mt-0.5">{fmt.name.split('/')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Direction Artistique & Style Graphique (Graphiste Pro) */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                Direction Artistique & Style
              </label>
              <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                Agile & Pro
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DESIGN_STYLES.map((st) => {
                const isSelected = designStyle === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setDesignStyle(st.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/30 border-amber-400 text-white shadow-lg shadow-blue-900/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{st.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">{st.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Onglets de Personnalisation : Fond / Texte / Logo & Temple */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card space-y-5">
            <div className="flex border-b border-slate-800 pb-2 gap-2">
              <button
                onClick={() => setActiveTabControls('backgrounds')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  activeTabControls === 'backgrounds'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Fonds & Images
              </button>
              <button
                onClick={() => setActiveTabControls('text')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  activeTabControls === 'text'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Texte & Style
              </button>
              <button
                onClick={() => setActiveTabControls('branding')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  activeTabControls === 'branding'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Logo & Temple
              </button>
            </div>

            {/* TAB FONDS */}
            {activeTabControls === 'backgrounds' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Galeries Célestes</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Importer ma photo</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Filtres par catégorie de fond */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {bgCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedBgCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all ${
                        selectedBgCategory === cat
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {customImage && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <span className="text-xs text-amber-300 font-medium">Photo personnelle active</span>
                    <button
                      onClick={() => setCustomImage(null)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Effacer
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                  {filteredBgs.map((bg) => {
                    const isSelected = !customImage && selectedBg.id === bg.id;
                    return (
                      <button
                        key={bg.id}
                        onClick={() => {
                          setSelectedBg(bg);
                          setCustomImage(null);
                        }}
                        className={`group relative h-16 rounded-xl overflow-hidden border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                            : 'border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {bg.type === 'image' ? (
                          <img src={bg.url} alt={bg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        ) : (
                          <div className="w-full h-full" style={{ background: bg.css }} />
                        )}
                        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 flex items-end p-1.5">
                          <span className="text-[10px] font-semibold text-white drop-shadow truncate">
                            {bg.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Contrôle de l'assombrissement pour le contraste */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Assombrissement du fond</span>
                    <span className="text-amber-400 font-semibold">{Math.round(darkenOverlay * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.15"
                    max="0.80"
                    step="0.05"
                    value={darkenOverlay}
                    onChange={(e) => setDarkenOverlay(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB TEXTE */}
            {activeTabControls === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Typographie du Message
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {FONT_STYLES.map((f) => {
                      const isSelected = selectedFont.id === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFont(f)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600/30 border-blue-400 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-sm font-medium" style={f.style}>
                            {f.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Taille de la police</span>
                    <span className="text-amber-400 font-semibold">{Math.round(fontSizeModifier * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="1.35"
                    step="0.05"
                    value={fontSizeModifier}
                    onChange={(e) => setFontSizeModifier(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Éditeur rapide de texte du verset */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Texte du Verset (personnalisable)
                  </label>
                  <textarea
                    rows={3}
                    value={currentVerse.text}
                    onChange={(e) => setCurrentVerse({ ...currentVerse, text: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Référence Biblique
                  </label>
                  <input
                    type="text"
                    value={currentVerse.reference}
                    onChange={(e) => setCurrentVerse({ ...currentVerse, reference: e.target.value })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB BRANDING / LOGO & TEMPLE */}
            {activeTabControls === 'branding' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-slate-300 leading-relaxed">
                  Le logo officiel et le nom du Temple de Silmiougou (Ouagadougou, Burkina Faso) sont mis en exergue avec double anneau d'or pour un impact visuel d'exception.
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">Logo des Assemblées de Dieu</div>
                    <div className="text-[11px] text-slate-400">Emblème agrandi avec médaillon d'or</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showLogo}
                    onChange={(e) => setShowLogo(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">Signature du Temple</div>
                    <div className="text-[11px] text-slate-400">{CHURCH_CONFIG.templeName}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showSignature}
                    onChange={(e) => setShowSignature(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Boutons d'Action Principaux */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-900/60 border border-blue-400/40 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              <Download className="w-5 h-5 text-amber-300" />
              <span>{isGenerating ? 'Génération en cours...' : 'Télécharger l\'Image HD (PNG)'}</span>
            </button>

            <button
              onClick={handleShare}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 border border-emerald-400/30 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Partager sur WhatsApp / Statut</span>
            </button>

            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 animate-bounce">
                <Check className="w-4 h-4" />
                Image enregistrée avec succès ! Que Dieu vous bénisse.
              </div>
            )}
          </div>
        </div>

        {/* COLONNE PRÉVISUALISATION DIRECTE (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              Rendu Haute Définition ({selectedFormat === 'story' ? '9:16 Statut' : selectedFormat === 'square' ? '1:1 Carré' : '16:9 Paysage'})
            </span>
            <span className="text-[11px] text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/30">
              Style : {DESIGN_STYLES.find(s => s.id === designStyle)?.name}
            </span>
          </div>

          {/* Cadre de Prévisualisation Responsive */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center p-3 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
            {previewBlobUrl ? (
              <img
                src={previewBlobUrl}
                alt="Aperçu du visuel biblique"
                className={`w-full rounded-2xl shadow-2xl object-contain max-h-[640px] border border-white/10 ${
                  selectedFormat === 'story' ? 'aspect-[9/16]' : selectedFormat === 'square' ? 'aspect-square' : 'aspect-[16/9]'
                }`}
              />
            ) : (
              <div className="w-full aspect-[9/16] flex flex-col items-center justify-center text-slate-400 gap-3">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Rendu artistique en cours...</span>
              </div>
            )}
          </div>

          <div className="mt-3 text-center text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Signé au nom du <span>Temple de Silmiougou, Tanghin (Ouagadougou, Burkina Faso)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
