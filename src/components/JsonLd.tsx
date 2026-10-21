export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rohailrahmat.dev/#person",
        name: "Rohail Rahmat",
        jobTitle: "AI Engineer",
        description:
          "AI engineer building chatbots, RAG assistants, workflow automations, and micro SaaS tools for startups and small businesses.",
        url: "https://rohailrahmat.dev",
        email: "rohailrahmat7525@gmail.com",
        sameAs: [
          "https://www.linkedin.com/in/rohail-rahmat",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gilgit-Baltistan",
          addressCountry: "PK",
        },
        knowsLanguage: [
          { "@type": "Language", name: "English" },
          { "@type": "Language", name: "Urdu" },
          { "@type": "Language", name: "Burushaski" },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://rohailrahmat.dev/#service",
        name: "Rohail Rahmat — AI Engineering",
        provider: { "@id": "https://rohailrahmat.dev/#person" },
        serviceType: [
          "AI chatbot development",
          "AI integration",
          "Workflow automation",
          "AI tools and micro SaaS MVPs",
          "Websites and web apps",
          "Custom AI assistants (RAG)",
        ],
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
