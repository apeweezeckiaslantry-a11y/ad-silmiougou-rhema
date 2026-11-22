// Informations officielles de l'Église, des Départements et du Développeur
// Assemblées de Dieu du Burkina Faso - Temple de Silmiougou, Tanghin

export const CHURCH_CONFIG = {
  fullName: "Église des Assemblées de Dieu de Silmiougou, Tanghin (Ouagadougou, Burkina Faso)",
  shortName: "AD Silmiougou - Tanghin (Ouagadougou, Burkina Faso)",
  displayName: "AD Silmiougou, Tanghin",
  templeName: "Temple de Silmiougou, Tanghin (Ouagadougou, Burkina Faso)",
  locationTag: "(Ouagadougou, Burkina Faso)",
  motto: "Tout L'Évangile pour tout le monde",
  logoUrl: "/logo-ad.jpg",
  city: "Ouagadougou",
  country: "Burkina Faso",
  district: "Silmiougou, Tanghin",
  facebookUrl: "https://www.facebook.com/share/1Ka5zq5Nyg/?mibextid=wwXIfr",
  primaryColor: "#006ebc", // Bleu officiel AD
  accentColor: "#f59e0b", // Or / Doré céleste
  
  // Programmes officiels des Cultes et Réunions
  programs: [
    { 
      day: "Dimanche", 
      time: "08h00 - 10h30", 
      title: "Grand Culte de Louange, Adoration & Prédication de la Parole", 
      badge: "Culte Principal",
      description: "Rassemblement solennel de toute l'assemblée pour célébrer le Seigneur et écouter Sa sainte parole."
    },
    { 
      day: "Mardi", 
      time: "Soirée", 
      title: "Soirée d'Intercession & Prière d'Ensemble", 
      badge: "Intercession & Prière",
      description: "Temps fort de supplication, de combat spirituel et d'intercession pour les familles et l'église."
    },
    { 
      day: "Vendredi", 
      time: "Soirée", 
      title: "Programme interne de l'église", 
      badge: "Programme de l'église",
      description: "Réunions d'enseignement biblique, veillées ou programmes selon le calendrier du temple."
    },
    { 
      day: "Samedi", 
      time: "Après-midi", 
      title: "Programme interne de l'église", 
      badge: "Programme de l'église",
      description: "Activités des groupes, répétitions de chorale, études et rassemblements départementaux."
    },
    { 
      day: "Autres jours", 
      time: "En semaine", 
      title: "Programmes internes de l'église", 
      badge: "Vie de l'Église",
      description: "Visites pastorales, réunions de comités et activités spirituelles internes de la communauté."
    }
  ],

  // Les 4 Départements Officiels des Assemblées de Dieu (AD Burkina Faso)
  departments: [
    {
      id: "aec",
      acronym: "AEC",
      name: "Action des Épouses de Chrétiens",
      subName: "Département des Femmes & Épouses Chrétiennes",
      icon: "Heart",
      color: "from-pink-600 to-rose-700",
      textColor: "text-rose-300",
      borderColor: "border-rose-500/30",
      keyVerse: "Proverbes 31:30",
      verseText: "La grâce est trompeuse, et la beauté est vaine; la femme qui craint l'Éternel est celle qui sera louée.",
      mission: "Encadrer et fortifier les mères, épouses et femmes chrétiennes dans la prière fervente, l'harmonie du foyer chrétien, les œuvres de charité et l'évangélisation des familles.",
      activities: [
        "Temps de prière et d'intercession pour les foyers et les enfants",
        "Enseignements sur le rôle de la femme selon les Écritures",
        "Visites d'entraide, soutien aux veuves et personnes vulnérables",
        "Retraites spirituelles et séminaires d'édification féminine"
      ]
    },
    {
      id: "meb",
      acronym: "MEB",
      name: "Mouvement Évangélique des Hommes",
      subName: "Département des Hommes & Pères Chrétiens (MHEB)",
      icon: "Shield",
      color: "from-blue-700 to-indigo-900",
      textColor: "text-blue-300",
      borderColor: "border-blue-500/30",
      keyVerse: "Josué 24:15",
      verseText: "Moi et ma maison, nous servirons l'Éternel.",
      mission: "Bâtir des hommes fermes dans la foi, modèles de sainteté et leaders spirituels dans leur foyer, l'église et la société, investis pour le développement de l'œuvre de Dieu.",
      activities: [
        "Communion fraternelle et prière matinale des hommes",
        "Conférences sur la responsabilité chrétienne et l'éthique professionnelle",
        "Soutien aux projets de construction et d'équipement du temple",
        "Mentorat des jeunes hommes et pères de famille"
      ]
    },
    {
      id: "jad",
      acronym: "JAD",
      name: "Jeunesse des Assemblées de Dieu",
      subName: "Département de la Jeunesse Chrétienne (JAD-BF)",
      icon: "Flame",
      color: "from-amber-600 to-orange-700",
      textColor: "text-amber-300",
      borderColor: "border-amber-500/30",
      keyVerse: "1 Timothée 4:12",
      verseText: "Que personne ne méprise ta jeunesse; mais sois un modèle pour les fidèles, en parole, en conduite, en amour, en foi, en pureté.",
      mission: "Former une génération de jeunes chrétiens passionnés pour Christ, vivants dans la sanctification, excellant dans leurs études et carrières, et zélés pour l'évangélisation.",
      activities: [
        "Réunions dynamiques de louange, témoignages et partage biblique",
        "Camps bibliques nationaux et régionaux de jeunesse (JAD-BF)",
        "Évangélisation de rue, concerts chrétiens et sketches bibliques",
        "Ateliers de formation civique, professionnelle et leadership"
      ]
    },
    {
      id: "ecodim",
      acronym: "ECODIM",
      name: "École du Dimanche & Enfance",
      subName: "Département National des Enfants (DENAD)",
      icon: "Sparkles",
      color: "from-emerald-600 to-teal-800",
      textColor: "text-emerald-300",
      borderColor: "border-emerald-500/30",
      keyVerse: "Proverbes 22:6",
      verseText: "Instruis l'enfant selon la voie qu'il doit suivre; et quand il sera vieux, il ne s'en détournera pas.",
      mission: "Transmettre aux enfants dès le plus jeune âge l'amour de Dieu et des Saintes Écritures à travers des cours bibliques adaptés, des chants, la mémorisation de versets et un encadrement pastoral dévoué.",
      activities: [
        "Classes bibliques adaptées par tranches d'âge chaque dimanche matin",
        "Mémorisation des versets clés de la Bible Louis Segond",
        "Chants, récitations et représentations théâtrales lors des fêtes chrétiennes",
        "Formation continue des moniteurs et monitrices d'enfants"
      ]
    }
  ],

  // Références Développeur
  developer: {
    name: "LANTRY Apewe Ezechias",
    organization: "Ascension Groupe",
    role: "Architecte & Concepteur Logiciel",
    quote: "La technologie au service de l'évangélisation et de l'édification spirituelle.",
    photoUrl: "/developer-photo.jpg",
    phone: "+226 75 79 84 81",
    whatsappUrl: "https://wa.me/22675798481",
    email: "ezechias@secubien.com",
    facebookUrl: "https://www.facebook.com/share/1Ka5zq5Nyg/?mibextid=wwXIfr",
    linkedinUrl: "https://www.linkedin.com/in/ezechias-lantry"
  }
};
