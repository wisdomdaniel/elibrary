// Helper function to generate pictorial SVG document cover data URLs matching file format graphics (images.png & images.jpg)
export const getFilePictorialCover = (title, format = 'docx', category = 'LECTURE NOTE') => {
  const fmt = (format || 'docx').toLowerCase();

  let mainColor = '#1A73E8'; // Google/Word Blue for DOCX
  let darkBannerColor = '#0D52BF';
  let fmtLabel = 'DOCX';
  let isPdf = false;

  if (fmt.includes('pdf')) {
    mainColor = '#E5252A'; // Adobe/PDF Red
    darkBannerColor = '#C6191E';
    fmtLabel = 'PDF';
    isPdf = true;
  } else if (fmt.includes('ppt') || fmt.includes('powerpoint')) {
    mainColor = '#D97706'; // PPTX Orange
    darkBannerColor = '#B45309';
    fmtLabel = 'PPTX';
  }

  let svg = '';

  if (isPdf) {
    // PDF Design (images.png style: red outer card, white folded paper inside, red bottom banner with bold "PDF")
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect width="300" height="300" fill="${mainColor}" rx="24"/>
      <!-- Inner White Folded Sheet -->
      <path d="M70 45 C70 35 78 27 88 27 L185 27 L230 72 L230 200 L70 200 Z" fill="#FFFFFF"/>
      <!-- Fold Corner Shadow & Flap -->
      <path d="M185 27 L185 72 L230 72 Z" fill="#E2E8F0"/>
      <!-- Document Text Lines -->
      <rect x="95" y="85" width="75" height="12" fill="#E2E8F0" rx="6"/>
      <rect x="95" y="110" width="110" height="12" fill="#E2E8F0" rx="6"/>
      <rect x="95" y="135" width="110" height="12" fill="#E2E8F0" rx="6"/>
      <rect x="95" y="160" width="95" height="12" fill="#E2E8F0" rx="6"/>
      <!-- Bottom Red Banner with Bold PDF text -->
      <text x="150" y="275" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" text-anchor="middle" letter-spacing="2">PDF</text>
    </svg>`;
  } else {
    // DOCX/PPTX Design (images.jpg style: blue outer card with folded corner top right, white line bars, dark bottom banner with bold "DOCX")
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <!-- Main Colored Base with rounded corners -->
      <rect width="300" height="300" fill="${mainColor}" rx="28"/>
      <!-- Top Right Folded Corner -->
      <path d="M220 0 L300 80 L220 80 Z" fill="#93C5FD" opacity="0.8"/>
      <path d="M220 0 L220 80 L300 80 Z" fill="#60A5FA"/>
      <!-- White Horizontal Document Text Lines -->
      <rect x="48" y="100" width="160" height="16" fill="#FFFFFF" rx="8"/>
      <rect x="48" y="132" width="160" height="16" fill="#FFFFFF" rx="8"/>
      <rect x="48" y="164" width="100" height="16" fill="#FFFFFF" rx="8"/>
      <!-- Bottom Darker Banner -->
      <path d="M0 200 L300 200 L300 272 C300 287.467 287.467 300 272 300 L28 300 C12.533 300 0 287.467 0 272 Z" fill="${darkBannerColor}"/>
      <!-- Bold Label Text -->
      <text x="150" y="265" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" text-anchor="middle" letter-spacing="2">${fmtLabel}</text>
    </svg>`;
  }

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
