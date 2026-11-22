// Moteur de génération procédurale d'arrière-plans célestes et sahéliens (100% Hors-Ligne)
// Génère un arrière-plan unique, frappant et distinct pour chaque jour de l'année (1 à 365) sans aucune connexion Internet !

/**
 * Générateur de nombres pseudo-aléatoires déterministes basé sur le jour de l'année
 */
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Palette de couleurs riches inspirées du Sahel, du ciel d'Afrique et de la gloire céleste
 */
export const DAILY_MOODS = [
  {
    name: "Aube Sahélienne & Rayons d'Or",
    skyTop: "#0f172a",
    skyMid: "#7c2d12",
    skyBottom: "#f59e0b",
    sunColor: "#fef08a",
    silhouetteType: "acacia",
    rays: true,
    stars: true
  },
  {
    name: "Gloire Royale & Ciel Saphir",
    skyTop: "#020617",
    skyMid: "#1e3a8a",
    skyBottom: "#38bdf8",
    sunColor: "#ffffff",
    silhouetteType: "mountains",
    rays: true,
    stars: true
  },
  {
    name: "Pourpre Impériale & Triomphe",
    skyTop: "#1e1b4b",
    skyMid: "#581c87",
    skyBottom: "#fb7185",
    sunColor: "#fef08a",
    silhouetteType: "cross",
    rays: true,
    stars: false
  },
  {
    name: "Crépuscule d'Ambre & Paix",
    skyTop: "#1c1917",
    skyMid: "#9a3412",
    skyBottom: "#ea580c",
    sunColor: "#ffedd5",
    silhouetteType: "savannah",
    rays: true,
    stars: true
  },
  {
    name: "Émeraude & Source de Vie",
    skyTop: "#022c22",
    skyMid: "#065f46",
    skyBottom: "#34d399",
    sunColor: "#fef9c3",
    silhouetteType: "trees",
    rays: true,
    stars: false
  },
  {
    name: "Nuit Céleste & Voûte Étoilée",
    skyTop: "#020617",
    skyMid: "#0f172a",
    skyBottom: "#1e293b",
    sunColor: "#93c5fd",
    silhouetteType: "hills",
    rays: false,
    stars: true,
    nebula: true
  },
  {
    name: "Aurore de Victoire",
    skyTop: "#311042",
    skyMid: "#991b1b",
    skyBottom: "#fbbf24",
    sunColor: "#ffffff",
    silhouetteType: "acacia",
    rays: true,
    stars: true
  }
];

/**
 * Dessine un arrière-plan d'art procédural unique sur le canvas
 */
export function drawProceduralBackground(ctx, width, height, dayOfYear = 1) {
  const seed = (dayOfYear * 9301 + 49297) % 233280;
  const moodIndex = Math.floor(dayOfYear) % DAILY_MOODS.length;
  const mood = DAILY_MOODS[moodIndex];

  // 1. Dégradé de ciel dynamique
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
  skyGrad.addColorStop(0, mood.skyTop);
  skyGrad.addColorStop(0.55, mood.skyMid);
  skyGrad.addColorStop(1, mood.skyBottom);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Étoiles dans le ciel supérieur (déterministes selon le jour)
  if (mood.stars) {
    ctx.save();
    const starCount = 70 + Math.floor(seededRandom(seed) * 50);
    for (let i = 0; i < starCount; i++) {
      const sx = seededRandom(seed + i * 2) * width;
      const sy = seededRandom(seed + i * 3) * (height * 0.45);
      const sRadius = 0.5 + seededRandom(seed + i * 4) * 2.0;
      const sAlpha = 0.3 + seededRandom(seed + i * 5) * 0.7;

      ctx.beginPath();
      ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sAlpha})`;
      ctx.fill();

      // Éclat croisé pour quelques étoiles brillantes
      if (i % 8 === 0) {
        ctx.strokeStyle = `rgba(254, 240, 138, ${sAlpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx - 4, sy);
        ctx.lineTo(sx + 4, sy);
        ctx.moveTo(sx, sy - 4);
        ctx.lineTo(sx, sy + 4);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // 3. Soleil levant / couchant rayonnant
  const sunX = width * (0.35 + seededRandom(seed + 10) * 0.3);
  const sunY = height * (0.50 + seededRandom(seed + 20) * 0.15);
  const sunRadius = 65 + seededRandom(seed + 30) * 35;

  ctx.save();
  // Halo solaire immense
  const sunGlow = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.3, sunX, sunY, width * 0.75);
  sunGlow.addColorStop(0, `${mood.sunColor}aa`);
  sunGlow.addColorStop(0.25, 'rgba(245, 158, 11, 0.45)');
  sunGlow.addColorStop(0.6, 'rgba(124, 45, 18, 0.2)');
  sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, width, height);

  // Cœur du soleil
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = mood.sunColor;
  ctx.shadowColor = mood.sunColor;
  ctx.shadowBlur = 45;
  ctx.fill();
  ctx.restore();

  // 4. Rayons de gloire célestes (Faisceaux divins)
  if (mood.rays) {
    ctx.save();
    const rayCount = 14;
    for (let i = 0; i < rayCount; i++) {
      const angle = (Math.PI / (rayCount + 1)) * (i + 1) + (seededRandom(seed + i) * 0.1 - 0.05);
      const rayLen = width * 1.2;
      const rayAlpha = 0.08 + seededRandom(seed + i * 7) * 0.10;

      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunX + Math.cos(angle - 0.05) * rayLen, sunY - Math.sin(angle - 0.05) * rayLen);
      ctx.lineTo(sunX + Math.cos(angle + 0.05) * rayLen, sunY - Math.sin(angle + 0.05) * rayLen);
      ctx.closePath();

      const rayGrad = ctx.createLinearGradient(sunX, sunY, sunX + Math.cos(angle) * rayLen, sunY - Math.sin(angle) * rayLen);
      rayGrad.addColorStop(0, `rgba(254, 240, 138, ${rayAlpha * 1.5})`);
      rayGrad.addColorStop(0.5, `rgba(245, 158, 11, ${rayAlpha})`);
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rayGrad;
      ctx.fill();
    }
    ctx.restore();
  }

  // 5. Silhouettes d'Afrique et symboles en bas du visuel
  ctx.save();
  ctx.fillStyle = '#050a14'; // Silhouette sombre

  // Collines / Terres ondulées au premier plan
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, height * 0.82);
  ctx.bezierCurveTo(width * 0.25, height * 0.78, width * 0.55, height * 0.84, width, height * 0.80);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  // Arbre Acacia africain majestueux en silhouette
  if (mood.silhouetteType === 'acacia' || mood.silhouetteType === 'savannah') {
    const treeX = width * 0.18;
    const treeBaseY = height * 0.81;
    drawAcaciaSilhouette(ctx, treeX, treeBaseY, 140);
  } else if (mood.silhouetteType === 'cross') {
    // Croix majestueuse en silhouette sur la colline
    const crossX = width * 0.22;
    const crossBaseY = height * 0.80;
    drawCrossSilhouette(ctx, crossX, crossBaseY, 150);
  }

  ctx.restore();
}

/**
 * Dessine un acacia africain stylisé en silhouette
 */
function drawAcaciaSilhouette(ctx, x, y, size) {
  ctx.save();
  ctx.fillStyle = '#02060d';

  // Tronc courbé
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.quadraticCurveTo(x - 4, y - size * 0.5, x + 15, y - size * 0.7);
  ctx.quadraticCurveTo(x + 5, y - size * 0.5, x + 8, y);
  ctx.closePath();
  ctx.fill();

  // Branches déployées en parasol
  const topY = y - size * 0.7;
  const branches = [
    { bx: x - size * 0.35, by: topY - size * 0.15, rx: size * 0.45, ry: size * 0.12 },
    { bx: x + size * 0.25, by: topY - size * 0.22, rx: size * 0.55, ry: size * 0.14 },
    { bx: x + size * 0.05, by: topY - size * 0.30, rx: size * 0.50, ry: size * 0.15 }
  ];

  branches.forEach(b => {
    ctx.beginPath();
    ctx.ellipse(b.bx, b.by, b.rx, b.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Dessine la silhouette d'une croix sur la colline
 */
function drawCrossSilhouette(ctx, x, y, height) {
  ctx.save();
  ctx.fillStyle = '#02060d';
  const width = height * 0.6;
  const thickness = height * 0.08;

  // Montant vertical
  ctx.fillRect(x - thickness / 2, y - height, thickness, height);
  // Traverse horizontale
  ctx.fillRect(x - width / 2, y - height * 0.75, width, thickness);
  ctx.restore();
}
