import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Image as ImageIcon, Copy, Check, Star, RefreshCw, Share2, 
  Quote, Heart, BookOpen, Sun, ChevronRight, ChevronLeft, Smartphone, 
  WifiOff, Palette, Download, ExternalLink, Send, Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHURCH_CONFIG } from '../data/churchInfo';
import { BACKGROUND_PRESETS } from '../data/backgrounds';
import { getDayOfYear, getDailyVerseContent } from '../data/calendar365';
import { generateVerseVisualBlob } from '../utils/canvasExporter';
import { GooglePlayIcon, AppleStoreIcon } from './Header';

// 5 Ambiances express prêtes pour générer instantanément l'affiche du jour
const QUICK_PRESETS = [
  {
    id: 'colombe-saint-esprit',
    name: 'Colombe Esprit',
    icon: '🕊️',
    bg: BACKGROUND_PRESETS.find(b => b.id === 'colombe-saint-esprit') || {
      id: 'colombe-saint-esprit',
      name: 'Colombe du Saint-Esprit',
      type: 'image',
      url: '/backgrounds/colombe-saint-esprit.jpg',
      overlay: 'rgba(10, 15, 40, 0.40)'
    },
    designStyle: 'celeste'
  },
  {
    id: 'sainte-croix-gloire',
    name: 'Sainte Croix',
    icon: '✝️',
    bg: BACKGROUND_PRESETS.find(b => b.id === 'sainte-croix-gloire') || {
      id: 'sainte-croix-gloire',
      name: 'La Sainte Croix au Crépuscule',
      type: 'image',
      url: '/backgrounds/sainte-croix-gloire.jpg',
      overlay: 'rgba(15, 10, 30, 0.45)'
    },
    designStyle: 'proclamation'
  },
  {
    id: 'afrique-priere-aube',
    name: 'Prière Sahel',
    icon: '🌅',
    bg: BACKGROUND_PRESETS.find(b => b.id === 'afrique-priere-aube') || {
      id: 'afrique-priere-aube',
      name: 'Prière à l\'Aube Sahélienne',
      type: 'image',
      url: '/backgrounds/afrique-priere-aube.jpg',
      overlay: 'rgba(5, 12, 30, 0.40)'
    },
    designStyle: 'sahel'
  },
  {
    id: 'lion-juda-afrique',
    name: 'Lion de Juda',
    icon: '👑',
    bg: BACKGROUND_PRESETS.find(b => b.id === 'lion-juda-afrique') || {
      id: 'lion-juda-afrique',
      name: 'Le Lion de Juda en Savane',
      type: 'image',
      url: '/backgrounds/lion-de-juda-afrique.jpg',
      overlay: 'rgba(15, 10, 5, 0.45)'
    },
    designStyle: 'celeste'
  },
  {
    id: 'procedural-day',
    name: 'Toile Céleste',
    icon: '🌌',
    bg: {
      id: 'procedural-day',
      name: 'Art Procédural Unique du Jour',
      type: 'procedural'
    },
    designStyle: 'glass'
  }
];

export default function VerseOfTheDay({ verse, onSelectForStudio, onToggleFavorite, isFavorite, onRandomVerse }) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState(null);
  const [generatedBlob, setGeneratedBlob] = useState(null);

  // Moteur Calendaire 365 Jours Hors-Ligne
  const todayDayOfYear = getDayOfYear();
  const [selectedDay, setSelectedDay] = useState(todayDayOfYear);
  const [overrideVerse, setOverrideVerse] = useState(null);

  // Synchroniser le verset actif
  const dailyData = getDailyVerseContent(selectedDay);
  const activeVerse = overrideVerse || (selectedDay === todayDayOfYear && verse ? verse : dailyData.verse);

  // Options du visuel autonome express
  const [quickFormat, setQuickFormat] = useState('story'); // 'story' (9:16) ou 'square' (1:1)
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const currentPreset = QUICK_PRESETS[activePresetIndex];

  // Génération autonome automatique de l'affiche dès le chargement ou au changement de verset / preset
  useEffect(() => {
    let active = true;
    setIsGenerating(true);

    const generateAutonomousVisual = async () => {
      try {
        const result = await generateVerseVisualBlob({
          verse: activeVerse,
          background: currentPreset.bg,
          format: quickFormat,
          designStyle: currentPreset.designStyle,
          showLogo: true,
          showChurchSignature: true,
          fontFamily: 'Georgia, serif',
          fontSizeModifier: 1.0,
          darkenOverlay: 0.45
        });

        if (active) {
          setPreviewBlobUrl(result.dataUrl);
          setGeneratedBlob(result.blob);
          setIsGenerating(false);
        }
      } catch (err) {
        console.error('Erreur génération autonome visuel:', err);
        if (active) setIsGenerating(false);
      }
    };

    const timer = setTimeout(generateAutonomousVisual, 100);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [activeVerse, quickFormat, activePresetIndex]);

  const handlePrevDay = () => {
    setOverrideVerse(null);
    setSelectedDay((prev) => (prev > 1 ? prev - 1 : 365));
  };

  const handleNextDay = () => {
    setOverrideVerse(null);
    setSelectedDay((prev) => (prev < 365 ? prev + 1 : 1));
  };

  const handleResetToday = () => {
    setOverrideVerse(null);
    setSelectedDay(todayDayOfYear);
  };

  // Copier le texte formaté
  const handleCopyText = () => {
    const textToCopy = `🕊️ *VERSET DU JOUR — TEMPLE DE SILMIOUGOU* 🕊️\n\n« ${activeVerse.text} »\n\n📖 *${activeVerse.reference}* (Version Louis Segond)\n\n⛪ *${CHURCH_CONFIG.fullName}*\n« _${CHURCH_CONFIG.motto}_ »\n📍 ${CHURCH_CONFIG.district} • ${CHURCH_CONFIG.city}, Burkina Faso\n\n📲 _Partagé via l'application officielle Rhema AD Silmiougou_\n✨ _Conçu & Développé par LANTRY Apewe Ezechias (+226 75 79 84 81)_`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Partager directement l'image officielle sur WhatsApp
  const handleShareWhatsAppImage = async () => {
    if (!generatedBlob) return;
    setIsGenerating(true);

    const cleanRef = activeVerse.reference.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `AD_Silmiougou_${cleanRef}_${quickFormat}.png`;
    const file = new File([generatedBlob], fileName, { type: 'image/png' });

    const shareCaption = `🕊️ *VERSET DU JOUR — TEMPLE DE SILMIOUGOU* 🕊️\n\n« ${activeVerse.text} »\n\n📖 *${activeVerse.reference}* (Version Louis Segond)\n\n⛪ *${CHURCH_CONFIG.fullName}*\n« _${CHURCH_CONFIG.motto}_ »\n\n📲 Partagé via l'application Rhema AD Silmiougou\n✨ Conçu par LANTRY Apewe Ezechias`;

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `Verset du Jour — ${activeVerse.reference}`,
          text: shareCaption
        });
      } catch (err) {
        console.warn('Partage annulé ou erreur:', err);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Fallback si le navigateur ne supporte pas l'envoi de fichier direct (PC / navigateurs sans web share)
      // On télécharge le fichier automatiquement et on ouvre WhatsApp
      handleDownloadImage();
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareCaption)}`;
      window.open(whatsappUrl, '_blank');
      setIsGenerating(false);
    }
  };

  // Télécharger l'image HD en 1 clic
  const handleDownloadImage = () => {
    if (!generatedBlob) return;
    const cleanRef = activeVerse.reference.replace(/[^a-zA-Z0-9]/g, '_');
    const url = URL.createObjectURL(generatedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AD_Silmiougou_${cleanRef}_${quickFormat}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(activeVerse);
    if (!isFavorite) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7">

      {/* 1. BANNIÈRE OFFICIELLE : TÉLÉCHARGEZ BIENTÔT SUR PLAY STORE ET APP STORE */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/20 via-blue-600/25 to-purple-600/20 border border-amber-400/50 p-4 sm:p-6 shadow-2xl shadow-blue-950/50 backdrop-blur-md">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 shrink-0">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1.5 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Annonce Spéciale AD Silmiougou</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-cinzel">
                Téléchargez bientôt notre application sur Play Store et App Store !
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
                L'application officielle du <strong>Temple de Silmiougou</strong> arrive bientôt sur vos téléphones Android et iPhone pour vous édifier chaque jour.
              </p>
            </div>
          </div>

          {/* Badges de Stores Officiels avec vrais logos Google Play et Apple */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            {/* Google Play Store Badge */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-white/15 text-slate-200 shadow-md">
              <GooglePlayIcon className="w-5 h-5 shrink-0" />
              <div className="text-left leading-tight">
                <div className="text-[9px] text-slate-400 uppercase font-semibold">Bientôt sur</div>
                <div className="font-bold text-white text-xs">Google Play</div>
              </div>
            </div>

            {/* Apple App Store Badge */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-white/15 text-slate-200 shadow-md">
              <AppleStoreIcon className="w-5 h-5 text-white shrink-0" />
              <div className="text-left leading-tight">
                <div className="text-[9px] text-slate-400 uppercase font-semibold">Bientôt sur</div>
                <div className="font-bold text-white text-xs">App Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BARRE SUPÉRIEURE : TITRE & MOTEUR CALENDAIRE 365 JOURS HORS-LIGNE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Méditation Quotidienne • Temple de Silmiougou</span>
            </div>

            {/* BADGE 365 JOURS 100% HORS-LIGNE */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
              <span>Jour {selectedDay} / 365 • 100% Hors-Ligne</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white flex items-center gap-2">
            <span>La Parole du Jour</span>
          </h2>
          <p className="text-sm text-slate-400">
            Nourrissez votre foi avec les Saintes Écritures (Version Louis Segond 1910)
          </p>
        </div>

        {/* Navigation Rapide entre les 365 Jours de l'Année */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 rounded-xl p-1">
            <button
              onClick={handlePrevDay}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Jour Précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetToday}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDay === todayDayOfYear
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Revenir au jour d'aujourd'hui"
            >
              Aujourd'hui
            </button>

            <button
              onClick={handleNextDay}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Jour Suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              setOverrideVerse(null);
              onRandomVerse();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all hover:scale-105 cursor-pointer"
            title="Découvrir un autre verset inspirant"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Autre Verset</span>
          </button>
        </div>
      </div>

      {/* 3. DOUBLE PANNEAU : TEXTE DE LA PAROLE (À GAUCHE) & AFFICHE OFFICIELLE AUTONOME PRÊTE EN 1 CLIC (À DROITE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* COLONNE GAUCHE (5 colonnes) : MÉDITATION PASTORALE & TEXTE DU VERSET */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-blue-500/30 bg-slate-900/80 p-6 sm:p-7 shadow-xl shadow-blue-950/50 space-y-5">
            
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {activeVerse.theme || 'Inspiration Divine'}
              </span>

              <button
                onClick={handleFavoriteClick}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isFavorite 
                    ? 'bg-amber-500/25 text-amber-400 border border-amber-500/50 shadow-md shadow-amber-950/50' 
                    : 'bg-slate-950/80 text-slate-300 hover:text-amber-400 hover:bg-slate-800 border border-white/10'
                }`}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            </div>

            {/* Corps du verset */}
            <div className="relative pt-2 pb-1">
              <Quote className="w-10 h-10 text-amber-400/25 absolute -top-4 -left-2 pointer-events-none" />
              <blockquote className="text-xl sm:text-2xl font-serif text-white leading-relaxed tracking-wide sm:px-2 font-medium drop-shadow">
                « {activeVerse.text} »
              </blockquote>
            </div>

            {/* Référence biblique & Temple */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold font-cinzel text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  {activeVerse.reference}
                </div>
                <div className="text-[11px] text-slate-400">
                  Version Louis Segond (LSG 1910)
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-semibold text-white">
                  Temple de Silmiougou
                </div>
                <div className="text-[10px] text-amber-400/80 italic">
                  Tanghin, Ouagadougou
                </div>
              </div>
            </div>

            {/* Méditation Pastorale */}
            {activeVerse.meditation && (
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 text-amber-400" />
                  <span>Méditation Pastorale</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{activeVerse.meditation}"
                </p>
              </div>
            )}

            {/* Bouton Copier le Texte Formaté */}
            <div className="pt-1">
              <button
                onClick={handleCopyText}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                <span>{copied ? 'Texte & Références Copiés !' : 'Copier le Texte du Verset & Références'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* COLONNE DROITE (7 colonnes) : L'AFFICHE OFFICIELLE AUTONOME PRÊTE DU JOUR */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 p-5 sm:p-7 shadow-2xl shadow-blue-950/80 space-y-5">
            
            {/* En-tête de la section Visuel Autonome */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Visuel Autonome Quotidien</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white flex items-center gap-2">
                  <span>L'Affiche Prête à Partager</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Générée automatiquement avec le logo, le temple et la devise. Prête pour vos Statuts !
                </p>
              </div>

              {/* Sélecteur Express de Format (Story ou Carré) */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setQuickFormat('story')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    quickFormat === 'story'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Format Statut WhatsApp & Story Instagram (9:16)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Statut 9:16</span>
                </button>

                <button
                  onClick={() => setQuickFormat('square')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    quickFormat === 'square'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Format Carré Facebook & Post Réseaux (1:1)"
                >
                  <span>Carré 1:1</span>
                </button>
              </div>
            </div>

            {/* CADRE DE PRÉVISUALISATION RÉEL DE L'AFFICHE GÉNÉRÉE */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-950/90 border border-white/10 relative min-h-[380px]">
              
              {isGenerating && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20 gap-2">
                  <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold text-amber-300">Rendu de l'affiche officielle...</span>
                </div>
              )}

              {previewBlobUrl ? (
                <div className={`relative shadow-2xl rounded-2xl overflow-hidden border-2 border-amber-400/40 transition-all ${
                  quickFormat === 'story' 
                    ? 'max-w-[280px] sm:max-w-[320px] aspect-[9/16]' 
                    : 'max-w-[340px] sm:max-w-[380px] aspect-square'
                }`}>
                  <img
                    src={previewBlobUrl}
                    alt={`Affiche du jour - ${activeVerse.reference}`}
                    className="w-full h-full object-contain bg-slate-950 block shadow-inner"
                  />

                  {/* Badge filigrane indicatif */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/20 text-[9px] font-medium text-amber-300">
                    AD Silmiougou HD
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-xs py-20 flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-slate-600" />
                  <span>Chargement de l'affiche...</span>
                </div>
              )}

              {/* Mention du concepteur sous l'affiche */}
              <div className="pt-3 text-center text-[11px] text-slate-400">
                ✨ Mention officielle : <span className="text-slate-300 font-medium">Temple de Silmiougou</span> • Conçu par <span className="text-amber-400 font-semibold">LANTRY Apewe Ezechias</span>
              </div>
            </div>

            {/* SÉLECTEUR EXPRESS D'AMBIANCE DU JOUR (1 CLIC) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Changer l'Ambiance en 1 clic :
                </span>
                <span className="text-[11px] text-amber-400 font-normal">
                  {currentPreset.name}
                </span>
              </label>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {QUICK_PRESETS.map((preset, pIdx) => {
                  const isSelected = activePresetIndex === pIdx;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setActivePresetIndex(pIdx)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-950/60 scale-[1.02]'
                          : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-lg mb-0.5">{preset.icon}</span>
                      <span className="text-[10px] font-bold truncate max-w-full leading-tight">
                        {preset.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GRANDS BOUTONS D'ACTION DIRECTE (PARTAGE WHATSAPP & TÉLÉCHARGEMENT) */}
            <div className="pt-2 space-y-2.5">
              
              {/* BOUTON MAJEUR : PARTAGER L'IMAGE DIRECTEMENT SUR WHATSAPP */}
              <button
                onClick={handleShareWhatsAppImage}
                disabled={isGenerating || !generatedBlob}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/60 border border-emerald-400/40 transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-50"
              >
                <Send className="w-5 h-5 text-white" />
                <span>Partager l'Affiche sur WhatsApp</span>
                <span className="text-xs bg-emerald-700/80 px-2 py-0.5 rounded-full font-normal hidden sm:inline">
                  Statut & Contacts
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* BOUTON TÉLÉCHARGER HD */}
                <button
                  onClick={handleDownloadImage}
                  disabled={isGenerating || !generatedBlob}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md border border-blue-400/30 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Visuel Téléchargé !</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>Télécharger l'Affiche HD (PNG)</span>
                    </>
                  )}
                </button>

                {/* BOUTON OUVRIR DANS LE STUDIO AVANCÉ */}
                <button
                  onClick={() => onSelectForStudio(activeVerse)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-white/10 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Personnaliser dans le Studio ›</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}