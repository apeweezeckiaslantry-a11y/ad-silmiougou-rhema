# Rhema AD Silmiougou 🕊️

> **Application officielle de Versets Bibliques Quotidiens & Studio de Médias Célestes**  
> Dédiée à l'**Église des Assemblées de Dieu de Silmiougou, Tanghin** (Ouagadougou, Burkina Faso).  
> Devise : *« Tout L'Évangile pour tout le monde »*

---

## 🌟 Présentation

**Rhema AD Silmiougou** est une application moderne (PWA Hybride) conçue pour édifier la foi des fidèles et équiper l'équipe média de l'église avec un outil d'évangélisation numérique de premier ordre.

Chaque jour, elle propose un verset biblique inspirant en version **Louis Segond (LSG 1910)** accompagné d'une pensée pastorale et d'un **studio de création d'affiches haute résolution (PNG)** signé avec le logo et les références officielles de l'église.

---

## ✨ Fonctionnalités Principales

### 1. 🌅 Le Verset du Jour
- Sélection automatique de la parole du jour selon la date.
- Texte intégral en version **Louis Segond (1910)**.
- Pensée & méditation pastorale quotidienne.
- Bouton de passage direct vers le Studio de Création.
- Copie instantanée avec signature pour WhatsApp & réseaux sociaux.
- Bouton « Autre Verset » pour s'inspirer à tout moment.

### 2. 🎨 Le Studio Visuel (Générateur d'Affiches)
- **3 Formats adaptés aux réseaux sociaux** :
  - **9:16 (1080 x 1920)** : Format idéal pour les **Statuts WhatsApp** et Stories Instagram.
  - **1:1 (1080 x 1080)** : Format carré pour les publications Facebook et groupes.
  - **16:9 (1920 x 1080)** : Format paysage pour la projection sur écran au culte.
- **Galerie d'arrière-plans célestes** : Rayons de gloire, aube sur les montagnes, ciel étoilé, Sainte Bible ouverte, et dégradés purs bleu royal AD (fonctionnant 100% hors-ligne).
- **Importation d'image personnalisée** : Permet à l'équipe média de charger une photo du pasteur, de la chorale ou du culte du jour.
- **Typographie soignée** : Polices sérif majestueuses, sans-sérif modernes et tailles ajustables.
- **Signature officielle garantie** :
  - Emblème officiel des Assemblées de Dieu (« Tout L'Évangile »).
  - Mention : *Église des Assemblées de Dieu de Silmiougou, Tanghin*.
  - Devise officielle : *« Tout L'Évangile pour tout homme »*.
  - Référence biblique encadrée avec dorure céleste.
- **Export & Partage** :
  - Téléchargement haute résolution PNG.
  - Partage direct sur WhatsApp via la Web Share API mobile.

### 3. 📖 Bibliothèque Biblique (Louis Segond)
- Navigation par thèmes spirituels : *Foi & Confiance*, *Paix & Réconfort*, *Bénédiction & Faveur*, *Force & Courage*, *Prière*, *Louange*, *Sagesse*, *Promesses Divines*.
- Recherche instantanée par mot-clé (ex: « paix », « berger », « amour ») ou référence (ex: « Jean 3 », « Psaumes 23 »).
- **Ajout de versets de prédication** : L'équipe média peut ajouter en 10 secondes le verset prêché le dimanche pour générer immédiatement l'affiche du culte.

### 4. ⭐ Trésor de Favoris
- Sauvegarde locale sur le smartphone des versets qui ont particulièrement touché le fidèle.
- Possibilité de les relire hors-ligne ou de les exporter en affiche à tout instant.

### 5. ⛪ Église, Programmes & Crédits
- Horaires des cultes dominicaux et réunions d'intercession / jeunesse / femmes.
- Guide d'installation simple pour Android et iPhone.
- **Crédits du Développeur : API Ézéchias (Ascension Groupe)**.

---

## 🚀 Lancement & Développement Local

Le projet utilise **Vite**, **React**, **Tailwind CSS v4** et un moteur de rendu **HTML5 Canvas Haute Définition**.

```bash
# Se placer dans le dossier
cd "C:\Users\ASCENSION GROUPE\.gemini\antigravity\scratch\ad-silmiougou-rhema"

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

---

## 📱 Installation PWA & Génération APK pour l'Équipe Média

1. **Sur Smartphone Android / iOS (PWA)** :
   - Ouvrez l'application dans Chrome (Android) ou Safari (iPhone).
   - Cliquez sur le bouton **« Installer l'application »** ou dans le menu de votre navigateur : *Ajouter à l'écran d'accueil*.
   - L'application s'installe comme une véritable application native avec icône personnalisée et fonctionne hors-ligne grâce au Service Worker (`sw.js`).

2. **Création d'un APK Android (via Capacitor)** :
   Si vous souhaitez générer un fichier `.apk` autonome à distribuer directement :
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "Rhema AD Silmiougou" "org.adsilmiougou.rhema"
   npx cap add android
   npm run build
   npx cap copy
   npx cap open android
   ```
   *Puis dans Android Studio : Build > Build Bundle(s) / APK(s) > Build APK(s).*

---

## 👨‍💻 Concepteur & Développeur
- **Développeur Principal** : **LANTRY Apewe Ezechias**
- **Organisation** : Ascension Groupe
- **WhatsApp / Contact** : [+226 75 79 84 81](https://wa.me/22675798481)
- **Email** : [ezechias@secubien.com](mailto:ezechias@secubien.com)
- **Réseaux Professionnels** : [Page Facebook](https://www.facebook.com/ezechias.lantry) | [Profil LinkedIn](https://www.linkedin.com/in/ezechias-lantry)
- *« Conçu avec excellence pour l'avancement du Royaume de Dieu. »*
