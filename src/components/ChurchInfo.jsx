import React, { useState } from 'react';
import { 
  Church, Clock, MapPin, Calendar, Smartphone, ShieldCheck, Code, Award, 
  ExternalLink, Download, Heart, Mail, Phone, MessageCircle, Users, Sparkles, Flame, Shield, ArrowRight, Image as ImageIcon
} from 'lucide-react';
import { CHURCH_CONFIG } from '../data/churchInfo';
import { GooglePlayIcon, AppleStoreIcon } from './Header';

export default function ChurchInfo({ onInstallPwa, canInstall, onSelectForStudio }) {
  const [selectedDeptId, setSelectedDeptId] = useState('aec');

  const handleCreateDeptVisual = (dept) => {
    if (onSelectForStudio) {
      onSelectForStudio({
        id: `dept-${dept.id}`,
        reference: dept.keyVerse,
        text: dept.verseText,
        theme: `Département ${dept.acronym} — ${dept.name}`,
        version: "Louis Segond",
        category: "promesse"
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* 1. Profil du Temple de Silmiougou */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 glass-panel p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-amber-400 bg-white shadow-xl shadow-blue-950/60 p-1 flex-shrink-0">
            <img 
              src={CHURCH_CONFIG.logoUrl} 
              alt="Logo Assemblées de Dieu" 
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <Church className="w-3.5 h-3.5 text-amber-400" />
              <span>Temple Officiel • Burkina Faso</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
              {CHURCH_CONFIG.fullName}
            </h2>
            <p className="text-amber-400 font-serif italic text-base">
              « {CHURCH_CONFIG.motto} »
            </p>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              {CHURCH_CONFIG.district} • {CHURCH_CONFIG.city}, Burkina Faso
            </p>

            {/* Bouton Page Facebook Officielle de l'Église */}
            <div className="pt-2 flex justify-center sm:justify-start">
              <a
                href={CHURCH_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all hover:scale-105 shadow-md shadow-blue-900/50"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Rejoindre la Page Facebook de l'Église</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Programmes des Cultes & Installation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Programmes Officiels (Dimanche 08h00 - 10h30, Mardi, Vendredi, Samedi, Autres) */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold font-cinzel text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Programmes des Cultes & Réunions
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Rendez-vous spirituels au Temple de Silmiougou
            </p>
          </div>

          <div className="space-y-3">
            {CHURCH_CONFIG.programs.map((prog, index) => (
              <div 
                key={index} 
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  prog.day === "Dimanche" 
                    ? "bg-blue-950/50 border-blue-500/40 shadow-md shadow-blue-950/40" 
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{prog.day}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      prog.day === "Dimanche"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-blue-600/20 text-blue-300 border-blue-500/20"
                    }`}>
                      {prog.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium">{prog.title}</div>
                  {prog.description && (
                    <div className="text-[11px] text-slate-400 mt-0.5 italic">{prog.description}</div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {prog.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation PWA sur Smartphone & Équipe Média */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold font-cinzel text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-400" />
              Installation sur Smartphone & PC
            </h3>

            {/* Badges Bientôt sur Play Store & App Store */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-500/15 to-purple-500/15 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <GooglePlayIcon className="w-5 h-5 shrink-0" />
                <AppleStoreIcon className="w-5 h-5 text-white shrink-0" />
                <div>
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Téléchargement Officiel</div>
                  <div className="text-xs font-bold text-white">Bientôt sur Google Play & App Store</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30 shrink-0">
                En cours
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              En attendant l'arrivée sur les stores, l'application est disponible immédiatement sous forme de <strong>PWA moderne et autonome</strong>. Vous pouvez l'installer directement sur l'écran d'accueil :
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <span className="font-bold text-blue-400 shrink-0">1.</span>
                <span><strong>Sur Android (Chrome) :</strong> Cliquez sur les 3 points du menu en haut à droite, puis sélectionnez <em>« Installer l'application »</em> ou <em>« Ajouter à l'écran d'accueil »</em>.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <span className="font-bold text-amber-400 shrink-0">2.</span>
                <span><strong>Sur iPhone (Safari) :</strong> Cliquez sur le bouton de Partage (flèche vers le haut), puis sélectionnez <em>« Sur l'écran d'accueil »</em>.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <span className="font-bold text-emerald-400 shrink-0">3.</span>
                <span><strong>Format APK Média :</strong> L'application est prête à être empaquetée en fichier APK via Capacitor pour installation manuelle sur les appareils de l'équipe média.</span>
              </div>
            </div>
          </div>

          {canInstall && (
            <button
              onClick={onInstallPwa}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-900/50 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Installer Maintenant sur cet appareil</span>
            </button>
          )}
        </div>

      </div>

      {/* 3. SECTION NOUVELLE : LES 4 DÉPARTEMENTS OFFICIELS DES ASSEMBLÉES DE DIEU */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            Ministères & Mouvements des Assemblées de Dieu du Burkina Faso
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
            Les Départements du Temple de Silmiougou
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Découvrez la mission des 4 piliers de l'église : l'AEC, le MEB, la JAD et l'École du Dimanche.
          </p>
        </div>

        {/* Grille des 4 Départements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CHURCH_CONFIG.departments.map((dept) => {
            const Icon = dept.id === 'aec' ? Heart : dept.id === 'meb' ? Shield : dept.id === 'jad' ? Flame : Sparkles;
            return (
              <div
                key={dept.id}
                className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-white">{dept.acronym}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                            Département
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-300">{dept.name}</h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {dept.mission}
                  </p>

                  {/* Verset Emblématique du Département */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
                      <span>Verset Emblématique</span>
                      <span>{dept.keyVerse}</span>
                    </div>
                    <p className="text-xs text-slate-300 italic font-serif">
                      « {dept.verseText} »
                    </p>
                  </div>

                  {/* Activités Clés */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Activités & Vie du groupe :
                    </div>
                    <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                      {dept.activities.slice(0, 2).map((act, i) => (
                        <li key={i} className="truncate">{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bouton de création d'affiche pour ce département */}
                <div className="pt-4 mt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleCreateDeptVisual(dept)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-600/25 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Créer une Affiche pour {dept.acronym}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SECTION OFFICIELLE DU CONCEPTEUR & DÉVELOPPEUR */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-900 shadow-xl shadow-blue-950/80 p-0.5">
              <img 
                src={CHURCH_CONFIG.developer.photoUrl} 
                alt={CHURCH_CONFIG.developer.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-slate-950 flex items-center justify-center text-amber-300" title="Concepteur Certifié">
              <Code className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Conception & Développement
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
              {CHURCH_CONFIG.developer.name}
            </h3>

            <div className="text-xs sm:text-sm font-semibold text-blue-300">
              {CHURCH_CONFIG.developer.organization} • {CHURCH_CONFIG.developer.role}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 italic max-w-2xl leading-relaxed">
              « {CHURCH_CONFIG.developer.quote} »
            </p>

            {/* Contacts & Réseaux Sociaux Professionnels */}
            <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              {/* WhatsApp Officiel */}
              <a
                href={CHURCH_CONFIG.developer.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all hover:scale-105 shadow-md shadow-emerald-950/40"
              >
                <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp : {CHURCH_CONFIG.developer.phone}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${CHURCH_CONFIG.developer.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-semibold transition-all hover:scale-105 shadow-md shadow-blue-950/40"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{CHURCH_CONFIG.developer.email}</span>
              </a>

              {/* Facebook */}
              <a
                href={CHURCH_CONFIG.developer.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all hover:scale-105 shadow-md shadow-blue-950/40"
              >
                <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Page Facebook</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              {/* LinkedIn */}
              <a
                href={CHURCH_CONFIG.developer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-semibold transition-all hover:scale-105 shadow-md shadow-blue-950/40"
              >
                <svg className="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>Profil LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                Version 1.0.0 (Édition Céleste)
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                PWA Hybride & Studio Canvas HD
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400">
                Bible Louis Segond (LSG 1910)
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
