// Helper function to generate pictorial SVG document cover data URLs
export const getFilePictorialCover = (title, format = 'docx', category = 'LECTURE NOTE') => {
  const fmt = (format || 'docx').toLowerCase();
  const safeTitle = (title || 'Study Material').length > 22 ? (title || 'Study Material').substring(0, 20) + '...' : (title || 'Study Material');

  let headerBg = '#1D4ED8'; // Blue for DOCX
  let fmtText = 'WORD DOC';
  let badgeBg = '#2563EB';

  if (fmt.includes('pdf')) {
    headerBg = '#DC2626'; // Red for PDF
    fmtText = 'PDF DOC';
    badgeBg = '#B91C1C';
  } else if (fmt.includes('ppt') || fmt.includes('powerpoint')) {
    headerBg = '#D97706'; // Orange for PPTX
    fmtText = 'SLIDE PPT';
    badgeBg = '#B45309';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
    <rect width="300" height="400" fill="#F8FAFC" rx="16"/>
    <rect width="300" height="120" fill="${headerBg}" />
    <circle cx="260" cy="40" r="30" fill="${badgeBg}" opacity="0.4"/>
    <text x="24" y="45" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="900" letter-spacing="2">${fmtText}</text>
    <text x="24" y="85" fill="#FFFFFF" font-family="sans-serif" font-size="18" font-weight="800">${safeTitle}</text>

    <!-- Page Graphic Sheet -->
    <rect x="30" y="140" width="240" height="230" fill="#FFFFFF" rx="12" stroke="#E2E8F0" stroke-width="2"/>
    <path d="M230 140 L270 180 L230 180 Z" fill="#E2E8F0"/>

    <!-- Mock Text Lines -->
    <rect x="54" y="170" width="120" height="12" fill="${headerBg}" rx="4"/>
    <rect x="54" y="196" width="190" height="8" fill="#CBD5E1" rx="4"/>
    <rect x="54" y="214" width="170" height="8" fill="#CBD5E1" rx="4"/>
    <rect x="54" y="232" width="180" height="8" fill="#CBD5E1" rx="4"/>

    <!-- Diagram Box Graphic -->
    <rect x="54" y="254" width="190" height="60" fill="#F1F5F9" rx="8" stroke="#E2E8F0"/>
    <circle cx="84" cy="284" r="14" fill="${headerBg}" opacity="0.2"/>
    <rect x="110" y="274" width="80" height="8" fill="#94A3B8" rx="3"/>
    <rect x="110" y="288" width="50" height="6" fill="#CBD5E1" rx="3"/>

    <!-- Footer Stamp -->
    <rect x="54" y="332" width="90" height="18" fill="#F1F5F9" rx="6"/>
    <text x="64" y="345" fill="#64748B" font-family="sans-serif" font-size="9" font-weight="800">${category}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
