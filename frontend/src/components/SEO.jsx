import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical 
}) => {
  const siteName = 'ConvoSec AI';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "ConvoSec AI is a premium AI and cybersecurity education platform with live cohorts, recorded labs, real-world projects, and technical articles.";
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={finalDescription} />
      <meta name='keywords' content={`convosecai, ${keywords || 'AI, Cybersecurity, Education'}`} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Brand Identity / Search Authority */}
      <meta name="application-name" content="convosecai" />
      <meta name="apple-mobile-web-app-title" content="convosecai" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || finalDescription} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || finalDescription} />

      {/* Structured Data (Schema.org) for Brand Authority */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ConvoSec AI",
          "alternateName": "convosecai",
          "url": "https://convosecai.com",
          "logo": "https://convosecai.com/logo.png",
          "sameAs": [
            "https://twitter.com/convosecai",
            "https://linkedin.com/company/convosecai"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
