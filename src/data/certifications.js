// REAL CERTIFICATIONS - Updated with actual certificate data
export const certifications = [
  {
    id: 'nptel-soft-skills',
    name: 'Enhancing Soft Skills and Personality',
    category: 'Development',
    issuer: 'NPTEL (IIT Kanpur)',
    issueDate: 'February 2025',
    credentialId: 'Elite - 79% (8 week course)',
    credentialUrl: '#',
    badgeImage: '/certificates/cert-2.pdf',
    certificateImage: '/certificates/cert-2.pdf',
    description: 'Elite certification in soft skills development and personality enhancement from IIT Kanpur through NPTEL, achieving 79% score with 11,344 certified candidates.'
  },
  
  {
    id: 'nptel-privacy-security',
    name: 'Privacy and Security in Online Social Media',
    category: 'Cybersecurity',
    issuer: 'NPTEL (IIIT Hyderabad)',
    issueDate: 'July 2025',
    credentialId: 'Elite - 60% (12 week course)',
    credentialUrl: '#',
    badgeImage: '/certificates/cert-1.pdf',
    certificateImage: '/certificates/cert-1.pdf',
    description: 'Elite certification in privacy and security aspects of online social media from International Institute of Information Technology, Hyderabad, achieving 60% score with 16,439 certified candidates.'
  },

  {
    id: 'google-cybersecurity',
    name: 'Foundations of Cybersecurity',
    category: 'Cybersecurity',
    issuer: 'Google (via Coursera)',
    issueDate: 'January 2026',
    credentialId: 'Coursera Verified',
    credentialUrl: 'https://coursera.org/verify/8C7ZNAV5K43',
    badgeImage: '/certificates/cert-1.pdf',
    certificateImage: '/certificates/cert-1.pdf',
    description: 'Comprehensive cybersecurity foundations course covering security principles, frameworks, and best practices from Google\'s professional certificate program.'
  },
];

// Categories for filtering
export const certificationCategories = [
  'All',
  'Cybersecurity',
  'AI/ML',
  'Cloud',
  'Data Science',
  'Development'
];

// Group certifications by category (automatically generated)
export const groupedCertifications = certifications.reduce((acc, cert) => {
  if (!acc[cert.category]) {
    acc[cert.category] = [];
  }
  acc[cert.category].push(cert);
  return acc;
}, {});
