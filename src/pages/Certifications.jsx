import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import FadeIn from '../components/ui/FadeIn';
import { certifications, certificationCategories, groupedCertifications } from '../data/certifications';

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewCert, setPreviewCert] = useState(null);

  const filteredCerts = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  const openPreview = (cert) => {
    setPreviewCert(cert);
  };

  const closePreview = () => {
    setPreviewCert(null);
  };

  return (
    <>
      <Helmet>
        <title>Certifications | Jivitesh</title>
        <meta name="description" content="Professional certifications in Cybersecurity, AI/ML, and Cloud technologies." />
      </Helmet>

      <Section className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn delay={0.1}>
            <div className="text-center mb-16">
              <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">
                PROFESSIONAL CREDENTIALS
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Certifications & <span className="gradient-text">Credentials</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Industry-recognized certifications demonstrating expertise in cybersecurity, 
                machine learning, and cloud infrastructure.
              </p>
            </div>
          </FadeIn>

          {/* Category Filter */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {certificationCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Grouped Certifications */}
          {selectedCategory === 'All' ? (
            <div className="space-y-16">
              {Object.entries(groupedCertifications).map(([category, certs], idx) => (
                <FadeIn key={category} delay={0.3 + idx * 0.1}>
                  <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
                      {category}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certs.map((cert) => (
                        <CertificationCard 
                          key={cert.id} 
                          cert={cert} 
                          onPreview={openPreview}
                        />
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={0.3}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCerts.map((cert) => (
                  <CertificationCard 
                    key={cert.id} 
                    cert={cert} 
                    onPreview={openPreview}
                  />
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </Section>

      {/* Preview Modal */}
      {previewCert && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div 
            className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{previewCert.name}</h3>
                  <p className="text-cyan-400 font-medium">{previewCert.issuer}</p>
                </div>
                <button 
                  onClick={closePreview}
                  className="text-slate-400 hover:text-white text-3xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-slate-500 font-mono">ISSUED:</span>
                    <span className="text-white ml-2">{previewCert.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono">ID:</span>
                    <span className="text-white ml-2">{previewCert.credentialId}</span>
                  </div>
                </div>
                <p className="text-slate-300">{previewCert.description}</p>
              </div>

              {/* Certificate Image Preview */}
              {previewCert.certificateImage && (
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                  <img 
                    src={previewCert.badgeImage} 
                    alt={previewCert.name}
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center py-12 text-slate-500">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Certificate preview not available</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {previewCert.credentialUrl && previewCert.credentialUrl !== '#' && (
                  <a
                    href={previewCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    Verify Credential
                  </a>
                )}
                <button
                  onClick={closePreview}
                  className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Certification Card Component
const CertificationCard = ({ cert, onPreview }) => {
  return (
    <Card className="group hover:border-cyan-500/50 transition-all cursor-pointer" onClick={() => onPreview(cert)}>
      <div className="p-6">
        {/* Badge */}
        <div className="mb-4 flex items-center justify-center h-24">
          <img 
            src={cert.badgeImage} 
            alt={`${cert.name} badge`}
            className="h-full w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex-col items-center justify-center text-white text-2xl font-bold">
            🏆
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {cert.name}
          </h3>
          <p className="text-cyan-400 text-sm font-medium mb-2">{cert.issuer}</p>
          <p className="text-slate-500 text-sm font-mono mb-3">{cert.issueDate}</p>
          <p className="text-slate-400 text-sm line-clamp-2">{cert.description}</p>
        </div>

        {/* View Details */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-center text-sm text-cyan-400 font-medium group-hover:text-cyan-300">
            Click to view details →
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Certifications;
