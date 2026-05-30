import React from 'react'

const certifications = [
  { name: "Six Sigma Green Belt" },
  { name: "Design for Six Sigma (DFSS) Core" },
  { name: "AI Agents Bootcamp: Build with LangChain, RAG & ANY LLM", org: "Agentic AI" },
  { name: "Enterprise Design Thinking - Team Essentials for AI", org: "IBM" },
  { name: "Honeywell User Experience" },
  { name: "Scrum Fundamentals Certified (SFC™)" },
  { name: "Achieving an Agile Mindset", org: "ICAgile" },
  { name: "Executive Certification in Business Management", org: "Madras Management Association" },
  { name: "Enterprise Architecture Foundations" },
  { name: "Clean Architecture: Patterns, Practices, and Principles" },
  { name: "Getting Started with Salesforce Lightning Web Components" },
  { name: "Introduction to Salesforce Certified Platform Developer I" },
  { name: "UX Accessibility & Figma Essential Training: The Basics" },
  { name: "React 18 Fundamentals" },
  { name: "Next.js 13 Fundamentals" },
  { name: "TailwindCSS 3 Fundamentals" },
  { name: "Building Web Applications with Node.js and Express" },
  { name: "Adobe Experience Manager (AEM)" },
  { name: "Adobe Experience Manager: Make Basics, Foundation, Intermediate, and Advanced" },
  { name: "Figma: Handing off to Developers" },
  { name: "Cloudinary Advanced Concepts for Developers" },
  { name: "Cloudinary Partner Implementation Advanced" },
  { name: "Cloudinary Foundations" },
  { name: "Cloudinary Integration Foundations" },
  { name: "Cloudinary Client Collaboration" },
  { name: "Cloudinary Media Developer Master" },
  { name: "Understanding the Fast API" }
]

const CertificationsPage = () => (
  <main className="max-w-5xl mx-auto px-6 py-20">
    <h1 className="text-3xl font-bold mb-10">Certifications</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert, index) => (
        <div key={index} className="glass-card p-6 border-white/10">
          {cert.url ? (
            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold mb-2 inline-block text-primary-blue hover:underline">
              {cert.name}
            </a>
          ) : (
            <h2 className="text-lg font-semibold mb-2">{cert.name}</h2>
          )}
          {cert.org && <p className="text-sm text-gray-400">{cert.org}</p>}
        </div>
      ))}
    </div>
  </main>
)

export default CertificationsPage;
