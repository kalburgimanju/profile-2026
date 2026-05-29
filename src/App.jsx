import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  ExternalLink,
  Layers,
  Globe,
  Briefcase,
  Award,
  Terminal
} from 'lucide-react'

const demoUser = {
  username: 'demo',
  password: 'demo',
  email: 'demo@example.com',
  phone: '0000000000'
}

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

const youtubeCourses = [
  {
    title: "Market Essentials",
    description: "Launch your stock market learning journey with core concepts, support/resistance, and risk management."
  },
  {
    title: "Trading Psychology",
    description: "Learn how to control emotional bias, follow disciplined setups, and make higher confidence decisions."
  },
  {
    title: "Technical Pulse",
    description: "Real-world chart analysis, trade planning, and momentum strategies drawn from YouTube tutorials."
  }
]

const menuItems = [
  { label: "Home", href: "#hero", page: "home" },
  { label: "Skills", href: "#skills", page: "home" },
  { label: "Projects", href: "#projects", page: "home" },
  { label: "Videos", href: "#videos", page: "home" },
  { label: "Courses", href: "#courses", page: "courses" },
  { label: "Experience", href: "#experience", page: "home" },
  { label: "Certifications", href: "#certificates", page: "home" }
]

function App() {
  const [activePage, setActivePage] = useState('home')
  const [authView, setAuthView] = useState('login')
  const [authError, setAuthError] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [signupData, setSignupData] = useState({ username: '', email: '', phone: '', password: '' })

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('portfolioUsers') || '[]')
    const persistedUser = JSON.parse(localStorage.getItem('portfolioAuthUser') || 'null')
    setUsers(storedUsers)
    if (persistedUser) {
      setUser(persistedUser)
      setActivePage('courses')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolioUsers', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (user) {
      localStorage.setItem('portfolioAuthUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('portfolioAuthUser')
    }
  }, [user])

  const handleNavClick = (item, event) => {
    if (item.page === 'courses') {
      event.preventDefault()
      setActivePage('courses')
    } else {
      setActivePage('home')
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()
    setAuthError('')
    setAuthMessage('')
    const matchedUser = users.find((item) => item.username === loginData.username && item.password === loginData.password)

    if (loginData.username === demoUser.username && loginData.password === demoUser.password) {
      setUser(demoUser)
      setActivePage('courses')
      setAuthMessage('Welcome, demo user! You can access the courses now.')
      return
    }

    if (matchedUser) {
      setUser(matchedUser)
      setActivePage('courses')
      setAuthMessage(`Welcome back, ${matchedUser.username}!`)
      return
    }

    setAuthError('Invalid username or password. Use demo/demo or sign up first.')
  }

  const handleSignup = (event) => {
    event.preventDefault()
    setAuthError('')
    setAuthMessage('')
    const { username, email, phone, password } = signupData

    if (!username || !email || !phone || !password) {
      setAuthError('Please complete all signup fields.')
      return
    }

    if (username === demoUser.username) {
      setAuthError('The username demo is reserved. Choose another username.')
      return
    }

    if (users.some((item) => item.username === username)) {
      setAuthError('This username is already taken.')
      return
    }

    setUsers((prev) => [...prev, { username, email, phone, password }])
    setAuthMessage('Account created successfully. You can now log in.')
    setAuthView('login')
    setSignupData({ username: '', email: '', phone: '', password: '' })
  }

  const handleLogout = () => {
    setUser(null)
    setLoginData({ username: '', password: '' })
    setActivePage('home')
    setAuthView('login')
    setAuthMessage('You have been logged out.')
  }

  const coursesPage = (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <section id="courses" className="mb-24">
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Globe className="text-primary-pink" />
            <h2 className="text-3xl sm:text-4xl font-bold">Courses</h2>
          </div>
          <p className="max-w-3xl text-gray-400">
            Sign in to access curated courses from the Stock Market Guru YouTube channel. The demo account is username: demo and password: demo.
          </p>
          {user && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
              Logged in as <span className="font-semibold text-white">{user.username}</span>. <button onClick={handleLogout} className="ml-4 text-primary-pink underline">Logout</button>
            </div>
          )}
        </div>

        {!user ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="glass-card p-8 border-white/10">
              <h3 className="text-xl font-bold mb-4">Login</h3>
              {authError && <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{authError}</p>}
              {authMessage && <p className="mb-4 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-200">{authMessage}</p>}
              <form onSubmit={handleLogin} className="space-y-4">
                <label className="block text-sm text-gray-200">
                  Username
                  <input
                    value={loginData.username}
                    onChange={(event) => setLoginData({ ...loginData, username: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                    placeholder="demo"
                  />
                </label>
                <label className="block text-sm text-gray-200">
                  Password
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                    placeholder="demo"
                  />
                </label>
                <button type="submit" className="w-full rounded-full bg-primary-pink px-6 py-3 text-sm font-semibold text-black transition hover:bg-pink-400">
                  Login
                </button>
                <p className="text-sm text-gray-400">
                  Don’t have an account? <button type="button" onClick={() => { setAuthView('signup'); setAuthError(''); setAuthMessage('') }} className="text-white underline">Create one</button>.
                </p>
              </form>
            </div>

            <div className="glass-card p-8 border-white/10">
              <h3 className="text-xl font-bold mb-4">Sign Up</h3>
              <p className="text-gray-400 mb-6">Create a portfolio account to access the course library and the latest video learning content.</p>
              <form onSubmit={handleSignup} className="space-y-4">
                <label className="block text-sm text-gray-200">
                  Username
                  <input
                    value={signupData.username}
                    onChange={(event) => setSignupData({ ...signupData, username: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                    placeholder="Choose a username"
                  />
                </label>
                <label className="block text-sm text-gray-200">
                  Email address
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(event) => setSignupData({ ...signupData, email: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block text-sm text-gray-200">
                  Phone number
                  <input
                    type="tel"
                    value={signupData.phone}
                    onChange={(event) => setSignupData({ ...signupData, phone: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                    placeholder="1234567890"
                  />
                </label>
                <label className="block text-sm text-gray-200">
                  Password
                  <input
                    type="password"
                    value={signupData.password}
                    onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                    placeholder="Create a password"
                  />
                </label>
                <button type="submit" className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Create account
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="glass-card p-8 border-white/10">
                <h3 className="text-xl font-bold mb-4">Your Courses</h3>
                <p className="text-gray-400 mb-6">Access the latest learning videos from the Stock Market Guru YouTube channel in one place.</p>
                <div className="space-y-4">
                  {youtubeCourses.map((course, index) => (
                    <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <h4 className="font-semibold text-lg text-white">{course.title}</h4>
                      <p className="text-gray-400 mt-2">{course.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 border-white/10 bg-black/30">
                <h3 className="text-xl font-bold mb-4">Access granted</h3>
                <p className="text-gray-400 mb-6">This course library is locked behind authentication so only logged-in learners can view the embedded YouTube content.</p>
                <a
                  href="https://www.youtube.com/@stockmarketguru2468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-5 py-3 text-sm font-semibold text-black transition hover:bg-pink-400"
                >
                  Visit Channel
                </a>
              </div>
            </div>

            <div className="glass-card overflow-hidden border-white/10">
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed?listType=user_uploads&list=UCzwJoQ5HA7odetlvYY83-2w"
                  title="Stock Market Guru course playlist"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )

  return (
    <div className="min-h-screen selection:bg-primary-pink selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg sm:text-xl font-bold tracking-tighter"
          >
            MANJUNATH<span className="text-primary-pink">.</span>K
          </motion.h1>
          <div className="flex w-full max-w-[760px] flex-wrap justify-center gap-4 text-xs sm:text-sm uppercase tracking-[0.16em] text-gray-300 sm:justify-end">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(item, event)}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {activePage === 'courses' ? (
        coursesPage
      ) : (
        <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          {/* Hero Section */}
          <section id="hero" className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-semibold tracking-widest text-primary-blue uppercase mb-4">Frontend Architect & AI Developer</h2>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight">
                Building the <span className="gradient-text">Next Generation</span> of Web Experiences.
              </h1>
              <p className="text-base sm:text-xl text-gray-400 max-w-2xl mb-8">
                15+ years of expertise in crafting scalable, AI-powered frontend architectures for industry leaders like Oracle, Honeywell, and 3M.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-primary-pink hover:text-white transition-all">View Projects</button>
                <button className="w-full sm:w-auto border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">Contact Me</button>
              </div>
            </motion.div>
          </section>

          {/* Skills Bento Grid */}
          <section id="skills" className="mb-32">
            <div className="flex items-center gap-2 mb-12">
              <Terminal className="text-primary-pink" />
              <h3 className="text-2xl font-bold">Tech Stack</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all"><ExternalLink size={18} /></a>
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

          {/* Videos Section */}
          <section id="videos" className="mb-32">
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-center gap-2">
                <Globe className="text-primary-pink" />
                <h3 className="text-2xl font-bold">YouTube Channel</h3>
              </div>
              <p className="max-w-3xl text-gray-400">
                Explore the latest video insights from my YouTube channel, focused on stock market strategy, trader education, and market analysis.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="glass-card overflow-hidden border-white/5">
                <div className="relative aspect-video w-full">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed?listType=user_uploads&list=UCzwJoQ5HA7odetlvYY83-2w"
                    title="Stock Market Guru YouTube Channel Videos"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-6 border-white/5">
                  <h4 className="font-bold text-lg mb-3">Channel</h4>
                  <p className="text-gray-400 mb-4">Stock Market Guru — daily market updates, technical analysis, and stock trading insights.</p>
                  <a
                    href="https://www.youtube.com/@stockmarketguru2468"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-pink hover:text-black"
                  >
                    Visit Channel
                  </a>
                </div>
                <div className="glass-card p-6 border-white/5">
                  <h4 className="font-bold text-lg mb-3">What you’ll find</h4>
                  <ul className="space-y-3 text-gray-400 list-disc list-inside">
                    <li>Stock market strategy and trading psychology</li>
                    <li>Live chart analysis and breakout reviews</li>
                    <li>Actionable insights on momentum, volume, and risk</li>
                  </ul>
                </div>
              </div>
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
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm">© 2026 Manjunath Kalburgi. Built with Next.js & AI.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
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
