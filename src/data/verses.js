// Base de données des Versets Bibliques - Version Louis Segond (LSG 1910)
// Église des Assemblées de Dieu de Silmiougou, Tanghin

export const CATEGORIES = [
  { id: 'tous', label: 'Tous les versets', icon: 'Sparkles', color: '#0284c7' },
  { id: 'foi', label: 'Foi & Confiance', icon: 'Shield', color: '#2563eb' },
  { id: 'paix', label: 'Paix & Réconfort', icon: 'Heart', color: '#059669' },
  { id: 'benediction', label: 'Bénédiction & Faveur', icon: 'Gift', color: '#d97706' },
  { id: 'force', label: 'Force & Courage', icon: 'Flame', color: '#dc2626' },
  { id: 'priere', label: 'Prière & Communion', icon: 'Sun', color: '#7c3aed' },
  { id: 'louange', label: 'Louange & Grâce', icon: 'Music', color: '#db2777' },
  { id: 'sagesse', label: 'Sagesse & Direction', icon: 'Compass', color: '#0d9488' },
  { id: 'promesse', label: 'Promesses Divines', icon: 'Award', color: '#4f46e5' },
];

export const VERSES_DATABASE = [
  {
    id: 1,
    reference: "Jérémie 29:11",
    version: "Louis Segond",
    category: "promesse",
    text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    theme: "Avenir & Espérance",
    meditation: "Dieu n'est jamais pris au dépourvu par vos circonstances. Ses desseins pour votre vie sont empreints de paix et d'un glorieux avenir.",
    featured: true
  },
  {
    id: 2,
    reference: "Ésaïe 41:10",
    version: "Louis Segond",
    category: "force",
    text: "Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.",
    theme: "Présence & Soutien divin",
    meditation: "Face à l'inconnu ou aux défis, rappelez-vous que la main souveraine du Tout-Puissant vous soutient fermement aujourd'hui.",
    featured: true
  },
  {
    id: 3,
    reference: "Philippiens 4:6-7",
    version: "Louis Segond",
    category: "paix",
    text: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.",
    theme: "Délivrance de l'anxiété",
    meditation: "Déposez vos fardeaux dans la prière et laissez la paix de Dieu inonder votre âme au-delà de toute compréhension humaine.",
    featured: true
  },
  {
    id: 4,
    reference: "Psaumes 23:1",
    version: "Louis Segond",
    category: "benediction",
    text: "L'Éternel est mon berger: je ne manquerai de rien.",
    theme: "Providence Divine",
    meditation: "Le Bon Berger veille sur chaque détail de votre existence. Rien de ce qui est bon pour vous ne vous sera refusé.",
    featured: true
  },
  {
    id: 5,
    reference: "Proverbes 3:5-6",
    version: "Louis Segond",
    category: "sagesse",
    text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
    theme: "Guidance parfaite",
    meditation: "Soumettez vos projets à Dieu dès le réveil. Il aplanira chaque obstacle et dirigera vos pas avec sûreté.",
    featured: true
  },
  {
    id: 6,
    reference: "Psaumes 91:1-2",
    version: "Louis Segond",
    category: "force",
    text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant. Je dis à l'Éternel: Mon refuge et ma forteresse, mon Dieu en qui je me confie!",
    theme: "Protection absolue",
    meditation: "Dans la présence secrète du Très-Haut, aucune flèche ni aucune frayeur ne peut ébranler votre sécurité.",
    featured: true
  },
  {
    id: 7,
    reference: "Romains 8:28",
    version: "Louis Segond",
    category: "foi",
    text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
    theme: "Victoire assurée",
    meditation: "Même les épreuves et les retards sont transformés par Dieu en tremplin pour Sa gloire dans votre vie.",
    featured: true
  },
  {
    id: 8,
    reference: "Jean 14:27",
    version: "Louis Segond",
    category: "paix",
    text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.",
    theme: "La paix du Christ",
    meditation: "La paix de Jésus n'est pas l'absence de tempête, mais Sa présence sereine et triomphante au milieu de la tempête.",
    featured: true
  },
  {
    id: 9,
    reference: "Josué 1:9",
    version: "Louis Segond",
    category: "force",
    text: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
    theme: "Courage & Conquête",
    meditation: "Avancez avec audace dans votre journée. Le Dieu des armées célestes marche à vos côtés.",
    featured: true
  },
  {
    id: 10,
    reference: "Psaumes 103:2-3",
    version: "Louis Segond",
    category: "louange",
    text: "Mon âme, bénis l'Éternel, et n'oublie aucun de ses bienfaits! C'est lui qui pardonne toutes tes iniquités, qui guérit toutes tes maladies.",
    theme: "Reconnaissance & Guérison",
    meditation: "Prenez un instant pour célébrer la fidélité de Dieu. Il restaure votre corps, renouvelle vos forces et pardonne avec amour.",
    featured: true
  },
  {
    id: 11,
    reference: "Matthieu 6:33",
    version: "Louis Segond",
    category: "promesse",
    text: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.",
    theme: "Priorité spirituelle",
    meditation: "Faites de la présence et de la volonté de Dieu votre première quête, et tout ce dont vous avez besoin s'ordonnera naturellement.",
    featured: true
  },
  {
    id: 12,
    reference: "Psaumes 46:1-2",
    version: "Louis Segond",
    category: "force",
    text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse. C'est pourquoi nous sommes sans crainte quand la terre est ébranlée.",
    theme: "Secours infaillible",
    meditation: "Quand tout vacille autour de vous, Dieu demeure le roc inébranlable sur lequel votre vie est solidement ancrée.",
    featured: false
  },
  {
    id: 13,
    reference: "Romains 8:31",
    version: "Louis Segond",
    category: "foi",
    text: "Que dirons-nous donc à l'égard de ces choses? Si Dieu est pour nous, qui sera contre nous?",
    theme: "Triomphe en Christ",
    meditation: "L'approbation et l'alliance de Dieu avec vous rendent toute opposition impuissante. Vous êtes plus que vainqueur.",
    featured: false
  },
  {
    id: 14,
    reference: "Psaumes 121:1-2",
    version: "Louis Segond",
    category: "foi",
    text: "Je lève mes yeux vers les montagnes... D'où me viendra le secours? Le secours me vient de l'Éternel, qui a fait les cieux et la terre.",
    theme: "Regard vers le Créateur",
    meditation: "Détournez vos regards des limitations humaines pour contempler la grandeur du Créateur souverain.",
    featured: false
  },
  {
    id: 15,
    reference: "Ésaïe 40:31",
    version: "Louis Segond",
    category: "force",
    text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point; ils marchent, et ne se fatiguent point.",
    theme: "Renouvellement des forces",
    meditation: "Attendez patiemment dans Sa présence; Il vous donnera une vigueur fraîche pour planer au-dessus des difficultés.",
    featured: true
  },
  {
    id: 16,
    reference: "2 Timothée 1:7",
    version: "Louis Segond",
    category: "force",
    text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.",
    theme: "Esprit de puissance",
    meditation: "Rejetez la peur. Le Saint-Esprit qui vit en vous vous accorde puissance, clarté d'esprit et un amour victorieux.",
    featured: false
  },
  {
    id: 17,
    reference: "Psaumes 118:24",
    version: "Louis Segond",
    category: "louange",
    text: "C'est ici la journée que l'Éternel a faite: qu'elle soit pour nous un sujet d'allégresse et de joie!",
    theme: "Joie quotidienne",
    meditation: "Chaque matinée est un don divin rempli d'opportunités de louer le Seigneur et d'impacter positivement son entourage.",
    featured: false
  },
  {
    id: 18,
    reference: "Psaumes 34:8",
    version: "Louis Segond",
    category: "benediction",
    text: "Sentez et voyez combien l'Éternel est bon! Heureux l'homme qui cherche en lui son refuge!",
    theme: "Bonté éprouvée",
    meditation: "La bonté de Dieu n'est pas une théorie : expérimentez sa tendresse et sa fidélité dans votre quotidien.",
    featured: false
  },
  {
    id: 19,
    reference: "Jacques 1:5",
    version: "Louis Segond",
    category: "sagesse",
    text: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.",
    theme: "Sagesse céleste",
    meditation: "Face à une décision cruciale, demandez à Dieu. Il répond avec générosité pour éclairer votre discernement.",
    featured: false
  },
  {
    id: 20,
    reference: "Jean 8:12",
    version: "Louis Segond",
    category: "promesse",
    text: "Jésus leur parla de nouveau, et dit: Je suis la lumière du monde; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.",
    theme: "Lumière du monde",
    meditation: "Suivre Jésus, c'est s'assurer d'avoir toujours une lampe éclairant chacun de ses pas, même dans la nuit la plus sombre.",
    featured: true
  },
  {
    id: 21,
    reference: "Hébreux 11:1",
    version: "Louis Segond",
    category: "foi",
    text: "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.",
    theme: "La puissance de la foi",
    meditation: "La foi voit l'invisible, croit l'incroyable et reçoit l'impossible venant du trône de la grâce.",
    featured: false
  },
  {
    id: 22,
    reference: "Psaumes 119:105",
    version: "Louis Segond",
    category: "sagesse",
    text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.",
    theme: "La Parole vivante",
    meditation: "Laissez les Saintes Écritures guider vos choix, vos paroles et vos pensées à chaque instant de ce jour.",
    featured: true
  },
  {
    id: 23,
    reference: "1 Thessaloniciens 5:16-18",
    version: "Louis Segond",
    category: "priere",
    text: "Soyez toujours joyeux. Priez sans cesse. Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus-Christ.",
    theme: "Prière continuelle",
    meditation: "Gardez un cœur connecté au ciel tout au long de la journée dans la reconnaissance et la paix.",
    featured: false
  },
  {
    id: 24,
    reference: "Psaumes 37:5",
    version: "Louis Segond",
    category: "foi",
    text: "Recommande ton sort à l'Éternel, mets en lui ta confiance, et il agira.",
    theme: "Abandon confiant",
    meditation: "Remettez vos soucis entre Ses mains toutes-puissantes et contemplez Sa fidélité agir en Son temps parfait.",
    featured: true
  }
];

// Fonction pour récupérer le verset du jour selon le jour de l'année
export function getVerseOfTheDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % VERSES_DATABASE.length;
  return VERSES_DATABASE[index];
}
