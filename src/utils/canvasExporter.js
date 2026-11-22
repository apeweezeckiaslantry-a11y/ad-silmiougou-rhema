// Moteur de rendu Canvas Pro - Studio Graphique Céleste
// Conçu pour l'Église des Assemblées de Dieu • Temple de Silmiougou, Tanghin (Ouagadougou, Burkina Faso)

import { CHURCH_CONFIG } from '../data/churchInfo';
import { drawProceduralBackground } from './proceduralBackgrounds';
import { getDayOfYear } from '../data/calendar365';

/**
 * Découpe un texte en plusieurs lignes adaptées à une largeur max
 */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Charge une image en mémoire avec gestion CORS et fallback
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = (err) => reject(err);
      fallbackImg.src = src;
    };
    img.src = src;
  });
}

/**
 * Dessine une image avec le comportement 'object-fit: cover' sur le canvas
 */
function drawImageCover(ctx, img, canvasWidth, canvasHeight) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;
  let renderWidth, renderHeight, offsetX, offsetY;

  if (imgRatio > canvasRatio) {
    renderHeight = canvasHeight;
    renderWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - renderWidth) / 2;
    offsetY = 0;
  } else {
    renderWidth = canvasWidth;
    renderHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - renderHeight) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Génère le visuel complet en haute résolution (PNG) - Niveau Graphiste Professionnel
 */
export async function generateVerseVisualBlob({
  verse,
  background,
  format = 'story', // 'story' (9:16), 'square' (1:1), 'banner' (16:9)
  designStyle = 'celeste', // 'celeste', 'glass', 'proclamation', 'sahel'
  customImageUrl = null,
  showLogo = true,
  showChurchSignature = true,
  fontFamily = 'Georgia, serif',
  fontSizeModifier = 1.0,
  darkenOverlay = 0.45
}) {
  const width = format === 'story' ? 1080 : format === 'square' ? 1080 : 1920;
  const height = format === 'story' ? 1920 : format === 'square' ? 1080 : 1080;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Impossible d\'initialiser le contexte Canvas 2D');

  // 1. FOND D'ÉCRAN (Images Locales & Moteur Procédural 365 Jours Hors-Ligne)
  const isProcedural = background.id === 'procedural-day' || background.url === 'procedural';
  const bgSource = !isProcedural ? (customImageUrl || (background.type === 'image' ? background.url : null)) : null;
  let imageLoaded = false;

  if (isProcedural) {
    drawProceduralBackground(ctx, width, height, getDayOfYear());
    imageLoaded = true;
  } else if (bgSource) {
    try {
      const bgImg = await loadImage(bgSource);
      drawImageCover(ctx, bgImg, width, height);
      imageLoaded = true;
    } catch (e) {
      console.warn('Image de fond inaccessible, basculement vers le moteur d\'art procédural hors-ligne:', e);
      drawProceduralBackground(ctx, width, height, getDayOfYear());
      imageLoaded = true;
    }
  }

  if (!imageLoaded) {
    drawProceduralBackground(ctx, width, height, getDayOfYear());
  }

  // 2. FILTRE D'ASSOMBRISSEMENT & VIGNETTE DE CONTRASTE CINÉMATOGRAPHIQUE
  ctx.fillStyle = `rgba(0, 0, 0, ${darkenOverlay})`;
  ctx.fillRect(0, 0, width, height);

  // Vignette supérieure
  const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.40);
  topGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, height * 0.40);

  // Vignette inférieure
  const bottomGrad = ctx.createLinearGradient(0, height * 0.60, 0, height);
  bottomGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  bottomGrad.addColorStop(1, 'rgba(0, 0, 0, 0.90)');
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, height * 0.60, 0, height);

  const padding = format === 'story' ? 55 : 45;

  // 3. ENCADREMENT ROYAL DU VISUEL (Liseré or fin et angles ouvragés)
  ctx.save();
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(padding, padding, width - padding * 2, height - padding * 2);

  // Coins ouvragés d'orfèvrerie céleste
  const cornerLength = format === 'story' ? 45 : 35;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
  ctx.shadowBlur = 10;

  // Haut-Gauche
  ctx.beginPath();
  ctx.moveTo(padding, padding + cornerLength);
  ctx.lineTo(padding, padding);
  ctx.lineTo(padding + cornerLength, padding);
  ctx.stroke();

  // Haut-Droit
  ctx.beginPath();
  ctx.moveTo(width - padding - cornerLength, padding);
  ctx.lineTo(width - padding, padding);
  ctx.lineTo(width - padding, padding + cornerLength);
  ctx.stroke();

  // Bas-Gauche
  ctx.beginPath();
  ctx.moveTo(padding, height - padding - cornerLength);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(padding + cornerLength, height - padding);
  ctx.stroke();

  // Bas-Droit
  ctx.beginPath();
  ctx.moveTo(width - padding - cornerLength, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(width - padding, height - padding - cornerLength);
  ctx.stroke();
  ctx.restore();

  // 4. ENTÊTE GRAPHIQUE PROFESSIONNEL : LOGO ET NOM DU TEMPLE MIS EN EXERGUE
  const headerTop = padding + (format === 'story' ? 45 : 30);
  let logoBottomY = headerTop;

  if (showLogo) {
    try {
      const logoImg = await loadImage(CHURCH_CONFIG.logoUrl);
      // Taille plus imposante pour mettre en exergue
      const logoDiameter = format === 'story' ? 145 : format === 'square' ? 120 : 105;
      const logoRadius = logoDiameter / 2;
      const logoX = (width - logoDiameter) / 2;
      const logoY = headerTop;
      const logoCenterX = logoX + logoRadius;
      const logoCenterY = logoY + logoRadius;

      // Halo lumineux royal sous le logo
      ctx.save();
      const haloGrad = ctx.createRadialGradient(logoCenterX, logoCenterY, logoRadius * 0.4, logoCenterX, logoCenterY, logoRadius * 1.5);
      haloGrad.addColorStop(0, 'rgba(0, 110, 188, 0.55)');
      haloGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.35)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.fillRect(logoX - 50, logoY - 50, logoDiameter + 100, logoDiameter + 100);
      ctx.restore();

      // Médaillon blanc avec double anneau d'or
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.arc(logoCenterX, logoCenterY, logoRadius + 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Anneau extérieur or céleste
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Dessin du logo en cercle parfait
      ctx.beginPath();
      ctx.arc(logoCenterX, logoCenterY, logoRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(logoImg, logoX, logoY, logoDiameter, logoDiameter);
      ctx.restore();

      logoBottomY = logoY + logoDiameter;
    } catch (err) {
      console.warn('Impossible de charger le logo de l\'église:', err);
    }
  }

  // 5. BANDEAU OFFICIEL DE L'ÉGLISE (MIS EN EXERGUE)
  const churchTitleY = showLogo ? logoBottomY + (format === 'story' ? 24 : 18) : headerTop + 20;

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Ligne 1 : Dénomination nationale
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#f59e0b'; // Or
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 12;
  ctx.fillText('ASSEMBLÉES DE DIEU DU BURKINA FASO', width / 2, churchTitleY);

  // Ligne 2 : Nom du Temple mis en valeur en grand
  const templeTitleY = churchTitleY + 28;
  ctx.font = 'bold 25px "Cinzel", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 50, 120, 0.9)';
  ctx.shadowBlur = 16;
  ctx.fillText('TEMPLE DE SILMIOUGOU, TANGHIN', width / 2, templeTitleY);

  // Ligne 3 : Localisation officielle en parenthèses
  const locTitleY = templeTitleY + 32;
  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#93c5fd'; // Bleu ciel lumineux
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 8;
  ctx.fillText('(OUAGADOUGOU, BURKINA FASO)', width / 2, locTitleY);

  // Ligne 4 : Devise sacrée
  const mottoY = locTitleY + 24;
  ctx.font = 'italic 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('« Tout L\'Évangile pour tout le monde »', width / 2, mottoY);
  ctx.restore();

  // 6. ZONE DU MESSAGE : LE VERSET DANS UN CARTOUCHE DE VERRE DÉPOLI (AGILE & PRO)
  const headerSectionBottom = mottoY + 30;
  const footerSectionTop = height - padding - (format === 'story' ? 100 : 75);

  const availableHeight = footerSectionTop - headerSectionBottom;
  const cardWidth = width - (padding * 2 + (format === 'story' ? 60 : 80));
  const cardHeight = Math.min(availableHeight - 20, format === 'story' ? 760 : 540);
  const cardX = (width - cardWidth) / 2;
  const cardY = headerSectionBottom + (availableHeight - cardHeight) / 2;

  // Dessin de la plaque de verre dépoli (Glassmorphism sur Canvas)
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 30;

  // Fond du cartouche
  if (designStyle === 'glass') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  } else if (designStyle === 'sahel') {
    ctx.fillStyle = 'rgba(28, 18, 12, 0.72)';
  } else if (designStyle === 'proclamation') {
    ctx.fillStyle = 'rgba(8, 15, 32, 0.80)';
  } else {
    // Céleste par défaut
    ctx.fillStyle = 'rgba(6, 16, 38, 0.72)';
  }

  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 28);
  ctx.fill();

  // Bordure dorée raffinée
  ctx.strokeStyle = designStyle === 'glass' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.45)';
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  // Guillemets d'honneur filigranés dorés
  ctx.save();
  ctx.font = 'bold 120px "Cinzel", Georgia, serif';
  ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('“', cardX + 25, cardY + 15);
  ctx.restore();

  // Typographie du message biblique
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#ffffff';

  // Calcul intelligent de la taille de texte
  const textLength = verse.text.length;
  let baseFontSize = 44;
  if (textLength > 240) baseFontSize = 32;
  else if (textLength > 160) baseFontSize = 36;
  else if (textLength > 100) baseFontSize = 40;
  else if (textLength < 60) baseFontSize = 48;

  if (format === 'banner') baseFontSize = Math.round(baseFontSize * 0.9);

  const actualFontSize = Math.round(baseFontSize * fontSizeModifier);
  ctx.font = `bold ${actualFontSize}px ${fontFamily}`;

  const maxTextWidth = cardWidth - 80;
  const textLines = wrapText(ctx, verse.text, maxTextWidth);
  const lineHeight = actualFontSize * 1.45;
  const totalTextHeight = textLines.length * lineHeight;

  // Position centrale du texte dans le cartouche
  const textCenterY = cardY + (cardHeight * 0.46);
  const textStartY = textCenterY - (totalTextHeight / 2);

  textLines.forEach((line, index) => {
    ctx.fillText(line, width / 2, textStartY + (index * lineHeight));
  });
  ctx.restore();

  // 7. SCEAU DE RÉFÉRENCE BIBLIQUE (LOUIS SEGOND)
  const refCenterY = textStartY + totalTextHeight + 50;
  const refText = `${verse.reference.toUpperCase()} • LOUIS SEGOND (LSG 1910)`;

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 21px "Plus Jakarta Sans", sans-serif';

  const refMetrics = ctx.measureText(refText);
  const badgeWidth = refMetrics.width + 50;
  const badgeHeight = 44;
  const badgeX = (width - badgeWidth) / 2;
  const badgeY = refCenterY - (badgeHeight / 2);

  // Badge luxueux
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
  roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 22);
  ctx.fill();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Texte du badge
  ctx.fillStyle = '#fef08a'; // Or éclatant
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 10;
  ctx.fillText(refText, width / 2, refCenterY);
  ctx.restore();

  // 8. PIED DE PAGE SOLENNEL : SIGNATURE COMPLÈTE DU TEMPLE
  if (showChurchSignature) {
    const footerY = height - padding - (format === 'story' ? 55 : 35);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 12;

    // Filet d'or avec motif central
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 160, footerY - 26);
    ctx.lineTo(width / 2 + 160, footerY - 26);
    ctx.stroke();

    // Pastille centrale dorée
    ctx.beginPath();
    ctx.arc(width / 2, footerY - 26, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    // Titre du Temple & localisation officielle
    ctx.font = 'bold 17px "Cinzel", "Georgia", serif';
    ctx.fillStyle = '#fef08a';
    ctx.fillText('TEMPLE DE SILMIOUGOU, TANGHIN • OUAGADOUGOU (BURKINA FASO)', width / 2, footerY - 8);

    // Devise & mention de partage de l'application
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.fillText('« Tout L\'Évangile pour tout le monde » • Partagé via l\'Application Rhema AD Silmiougou', width / 2, footerY + 13);

    // Mention du développeur
    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.fillText('Conçu & Développé par LANTRY Apewe Ezechias (+226 75 79 84 81)', width / 2, footerY + 31);
    ctx.restore();
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve({
        blob,
        dataUrl: canvas.toDataURL('image/png')
      });
    }, 'image/png', 0.98);
  });
}
