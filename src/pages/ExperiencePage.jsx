import React from 'react'

const experienceDetails = [
  {
    title: "Senior Staff Engineer",
    company: "Altimetrik",
    client: "Wex",
    period: "Aug 2025 - Present",
    location: "Bangalore, India",
    points: [
      "Owned delivery of core platform components end-to-end while collaborating with multiple consumer teams and subsystems.",
      "Architected frontend and integration layers using React, TypeScript, GraphQL, and micro frontends to build reusable UI frameworks.",
      "Integrated platform services with backend and external systems, defining contracts, observability, and error-handling patterns for LLM-driven workflows.",
      "Produced technical runbooks, architecture diagrams, and implementation documentation to support handover and production readiness.",
      "Drove GenAI-assisted development workflows using NotebookLM, Gemini, ChatGPT, Augment, Accio, and CrewAI."
    ]
  },
  {
    title: "Frontend Developer - Level 3",
    company: "Express.com",
    client: "Aries Technology Solutions / AECGEN Infotech Pvt Ltd",
    period: "Aug 2024 - Jan 2025",
    location: "Bangalore, India",
    points: [
      "Architected a ReactJS-based UI and NodeJS/NextJS/Redux component library with SCSS and Styled Components.",
      "Built automated GraphQL APIs to migrate assets from AEM to Cloudinary, reducing operations effort by 40%.",
      "Delivered WCAG-compliant interfaces with SEO, performance, and security optimizations.",
      "Led code reviews and achieved near-100% test coverage using React Testing Library.",
      "Managed CI/CD pipelines and cloud deployments with Jenkins, GCP, AWS, Cloudinary, and S3."
    ]
  },
  {
    title: "React Lead | Frontend Architect",
    company: "SWANFORLIFE",
    client: "NeoZoom Technology Pvt Ltd",
    period: "Mar 2024 - Jun 2024",
    location: "Bangalore, India",
    points: [
      "Designed a modular front-end framework using React.js and Redux to support scalable development.",
      "Translated Figma designs into responsive, WCAG-compliant interfaces with TypeScript.",
      "Developed AI-powered agents to auto-convert Figma designs into ReactJS components, reducing manual UI development effort by 50%.",
      "Improved agile velocity by 20% through effective sprint management.",
      "Integrated RESTful APIs and maintained state using Redux and microservices."
    ]
  },
  {
    title: "Technical Architect",
    company: "Salesforce Core - LWC Platform",
    client: "BCForward",
    period: "Oct 2022 - Oct 2023",
    location: "Bangalore, India",
    points: [
      "Created a React and Redux component library as Lightning Design Systems (LWC).",
      "Developed AI-powered agents to auto-convert Figma designs into React components, accelerating UI development by 50%.",
      "Reduced UI development time by 30% using Storybook-driven development.",
      "Improved WCAG 2.1 AA accessibility compliance across enterprise apps.",
      "Monitored CI/CD pipelines and cloud deployments with GitHub Actions."
    ]
  },
  {
    title: "Software Consultant",
    company: "Sensvio",
    client: "Sensvio",
    period: "Aug 2021 - Aug 2022",
    location: "Hubli, India",
    points: [
      "Designed and optimized responsive web applications using React.js, React Native, Redux, Node.js, and MongoDB.",
      "Implemented serverless solutions with Google APIs and Airtable, reducing infrastructure costs.",
      "Monitored CI/CD pipelines and cloud deployments using Jenkins.",
      "Designed and deployed OpenAI GPT-4 agents to convert voice inputs into interactive learning lessons.",
      "Built agentic AI workflows for personalized content generation with prompt templates and fallback strategies.",
      "Defined test scenarios and evaluation checklists to validate AI outputs before production release."
    ]
  },
  {
    title: "Technical Architect",
    company: "Honeywell Technology Solutions Lab",
    client: "Quess Corp",
    period: "Nov 2020 - Aug 2021",
    location: "Bangalore, India",
    points: [
      "Architected cloud-based security management platforms using React.js, Redux, Jenkins, Node.js, and micro frontend architecture.",
      "Led Agile sprints and retrospectives, boosting team efficiency by 25%.",
      "Conducted UI testing using Jest and Karma with 98% coverage.",
      "Set up and monitored CI/CD pipelines and cloud deployments using Azure DevOps and Jenkins.",
      "Worked on the Niagara Honeywell product stack."
    ]
  },
  {
    title: "Technical Lead",
    company: "Oracle Clinical Trials Platform",
    client: "Pure Software / Oracle",
    period: "Nov 2019 - Aug 2020",
    location: "Bangalore, India",
    points: [
      "Built UI components for a clinical trials platform used in COVID-19 research, migrating KnockoutJS to React.js and Redux.",
      "Implemented automated testing with Selenium and Jest, increasing release stability by 30%.",
      "Set up and monitored CI/CD pipelines and cloud deployments using Oracle Cloud and Jenkins.",
      "Translated clinical requirements into robust, testable workflows and UI flows."
    ]
  },
  {
    title: "Tech Lead",
    company: "Honeywell Technology Solutions Lab",
    period: "Oct 2013 - Sept 2019",
    location: "Bangalore, India",
    points: [
      "Led frontend development using HTML5, CSS3, Bootstrap, LESS, TypeScript, ES6, React 16, KnockoutJS, Redux, D3.js, WebSocket, and HighCharts.",
      "Migrated tech stacks from KnockoutJS to Angular 4/6 and modernized the UI layer with ReactJS.",
      "Transformed PSD designs into responsive, W3C-compliant, accessible interfaces.",
      "Owned end-to-end delivery across platforms including Maxpro Cloud, MPC, RAMS, Eagle, BMS, and ISOM Web Portal.",
      "Enabled CI/CD pipelines with Git and Jenkins while mentoring UI/UX teams."
    ]
  },
  {
    title: "Junior Programmer",
    company: "3M India",
    client: "EDC Creative Technology",
    period: "Sep 2011 - Sept 2013",
    location: "Bangalore, India",
    points: [
      "Led product management for global B2B and B2C website development, performance optimization, and feature enhancements.",
      "Directed website design strategy to maintain a consistent, modern visual experience aligned with brand guidelines.",
      "Coordinated stakeholders, vendors, and cross-functional teams to deliver website and content improvements.",
      "Managed digital metrics and supported SEO, social media, and marketing alignment for 3mindia.com, post-it.com, and scotchbrite.com."
    ]
  },
  {
    title: "Software Engineer",
    company: "Savithru Technology",
    client: "Globals Inc",
    period: "Mar 2011 - Aug 2011",
    location: "Bangalore, India",
    points: [
      "Developed high-traffic e-commerce web applications using PHP, Symfony, MySQL, JavaScript, WordPress, Magento, jQuery, and AJAX."
    ]
  },
  {
    title: "Trainee Software Engineer",
    company: "Globals Inc",
    period: "Aug 2010 - Mar 2011",
    location: "Bangalore, India",
    points: [
      "Built and maintained healthcare web applications using PHP, MySQL, Joomla, and MediaWiki."
    ]
  }
]

const ExperiencePage = () => (
  <main className="max-w-5xl mx-auto px-6 py-20">
    <h1 className="text-3xl font-bold mb-10">Professional Experience</h1>
    <div className="space-y-10">
      {experienceDetails.map((item, index) => (
        <div key={index} className="glass-card p-8 border-white/10">
          <div className="flex flex-col gap-2 mb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-primary-blue text-sm mb-1">
                {item.client ? `${item.client} • ${item.location}` : item.location}
              </p>
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-gray-400">{item.company}</p>
            </div>
            <p className="text-gray-400 text-sm">{item.period}</p>
          </div>
          <ul className="list-disc list-inside space-y-3 text-gray-400">
            {item.points.map((point, pointIndex) => (
              <li key={pointIndex}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </main>
)

export default ExperiencePage;
