import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { 
  // createIcons, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Layers, 
  Globe, 
  Briefcase, 
  GraduationCap,
  Award,
  Terminal
} from 'lucide-react'

const projects = [
  {
    title: "MAXPRO® Cloud",
    description: "Honeywell's flagship cloud video surveillance and access control platform. Architected the frontend for high-concurrency video streaming and device management.",
    tech: ["React", "Redux", "Node.js", "Azure"],
    link: "https://mymaxprocloud.com/MPC/Signin"
  },
  {
    title: "icliniq.com",
    description: "A global medical consultation platform. Optimized frontend performance and enhanced user accessibility for worldwide patients.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://www.icliniq.com"
  },
  {
    title: "Salesforce Lightning Design Systems",
    description: "Developed enterprise-grade UI components following SLDS standards, ensuring cross-product consistency and accessibility (WCAG 2.1).",
    tech: ["React", "JavaScript", "SLDS", "A11y"],
    link: "#"
  },
  {
    title: "3M India Ecosystem",
    description: "Led the frontend strategy for 3M's consumer brands (Post-it, Scotch-Brite, 3M Car Care), building scalable multi-tenant architectures.",
    tech: ["React", "AEM", "Cloudinary", "Modular Design"],
    link: "https://www.3mindia.in"
  },
  {
    title: "cartepostale.asia",
    description: "A creative digital community platform. Designed and built a responsive interface with high-engagement visual elements.",
    tech: ["React", "Framer Motion", "Vite"],
    link: "https://cartepostale.asia"
  }
]

const skills = [
  "React / Next.js", "TypeScript", "Node.js", "AI / LLM", "Prompt Engineering", 
  "Tailwind CSS", "Micro Frontends", "Cloud-Native UI", "GCP / Azure", "GraphQL"
]

const experience = [
  { company: "Altimetrik", role: "Senior Staff Engineer", period: "2025 - Present" },
  { company: "ACEGEN", role: "Frontend Developer L3", period: "2024 - 2025" },
  { company: "Neozoom", role: "React Lead", period: "2024" },
  { company: "BCforward", role: "Technical Architect", period: "2022 - 2023" },
  { company: "Honeywell", role: "Tech Lead", period: "2014 - 2019" }
]

const certificates = [
  { name: "GenAI ASCEND - AI Aware", org: "Coursera", date: "2024" },
  { name: "GenAI for Everyone", org: "Coursera", date: "2024" },
  { name: "Responsible AI", org: "Google Cloud", date: "2023" }
]

const menuItems = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certificates" }
]

function App() {
  return (
    <div className="min-h-screen selection:bg-primary-pink selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter"
          >
            MANJUNATH<span className="text-primary-pink">.</span>K
          </motion.h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-[0.16em] text-gray-300">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section id="hero" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4">Frontend Architect & AI Developer</h2>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Building the <span className="gradient-text">Next Generation</span> of Web Experiences.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              15+ years of expertise in crafting scalable, AI-powered frontend architectures for industry leaders like Oracle, Honeywell, and 3M.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-primary-pink hover:text-white transition-all">View Projects</button>
              <button className="border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">Contact Me</button>
            </div>
          </motion.div>
        </section>

        {/* Skills Bento Grid */}
        <section id="skills" className="mb-32">
          <div className="flex items-center gap-2 mb-12">
            <Terminal className="text-primary-pink" />
            <h3 className="text-2xl font-bold">Tech Stack</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-4 flex items-center justify-center text-center font-medium border-white/5"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="mb-32">
          <div className="flex items-center gap-2 mb-12">
            <Layers className="text-primary-blue" />
            <h3 className="text-2xl font-bold">Featured Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group border-white/5"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold group-hover:text-primary-pink transition-colors">{project.title}</h4>
                    <a href={project.link} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all"><ExternalLink size={18} /></a>
                  </div>
                  <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-300">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <section id="experience">
            <div className="flex items-center gap-2 mb-12">
              <Briefcase className="text-primary-pink" />
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 bg-primary-pink rounded-full" />
                  <h4 className="font-bold text-lg">{exp.company}</h4>
                  <p className="text-primary-blue text-sm mb-2">{exp.role}</p>
                  <p className="text-gray-500 text-xs">{exp.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="certificates">
            <div className="flex items-center gap-2 mb-12">
              <Award className="text-primary-blue" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            <div className="space-y-6">
              {certificates.map((cert, index) => (
                <div key={index} className="glass-card p-6 border-white/5">
                  <h4 className="font-bold mb-1">{cert.name}</h4>
                  <p className="text-sm text-gray-400">{cert.org} • {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm">© 2026 Manjunath Kalburgi. Built with Next.js & AI.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
