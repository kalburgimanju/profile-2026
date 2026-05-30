import React, { useEffect, useState, useRef } from 'react'
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

const adminUser = {
  username: 'admin',
  password: 'admin',
  email: 'admin@example.com',
  phone: '0000000000',
  role: 'admin'
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
  const [mediaItems, setMediaItems] = useState([])
  const [mediaForm, setMediaForm] = useState({ type: 'video', title: '', description: '' })
  const [mediaError, setMediaError] = useState('')
  const [mediaMessage, setMediaMessage] = useState('')
  const [recording, setRecording] = useState(false)
  const [mediaStream, setMediaStream] = useState(null)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [videoUploads, setVideoUploads] = useState([])
  const [audioUploads, setAudioUploads] = useState([])
  const [combineStatus, setCombineStatus] = useState('')
  const [combineError, setCombineError] = useState('')
  const [combinedUrl, setCombinedUrl] = useState('')
  const [combinedName, setCombinedName] = useState('combined_video')
  const [ffmpegInstance, setFfmpegInstance] = useState(null)
  const [ffmpegLoading, setFfmpegLoading] = useState(false)
  const videoRef = useRef(null)

  const getMediaDuration = (file, type) => {
    return new Promise((resolve) => {
      const element = document.createElement(type)
      element.preload = 'metadata'
      element.src = URL.createObjectURL(file)
      element.onloadedmetadata = () => {
        const duration = element.duration || 0
        URL.revokeObjectURL(element.src)
        resolve(duration)
      }
      element.onerror = () => {
        URL.revokeObjectURL(element.src)
        resolve(0)
      }
    })
  }

  const handleVideoFiles = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const uploads = await Promise.all(files.map(async (file, index) => {
      const duration = await getMediaDuration(file, 'video')
      return {
        id: `${Date.now()}-${index}`,
        file,
        name: file.name,
        duration,
        start: 0,
        end: duration,
        url: URL.createObjectURL(file)
      }
    }))

    setVideoUploads((prev) => [...prev, ...uploads])
    setCombineStatus(`Added ${uploads.length} video segment(s).`)
    event.target.value = null
  }

  const handleAudioFiles = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const uploads = await Promise.all(files.map(async (file, index) => {
      const duration = await getMediaDuration(file, 'audio')
      return {
        id: `${Date.now()}-${index}`,
        file,
        name: file.name,
        duration,
        insertAt: 0,
        url: URL.createObjectURL(file)
      }
    }))

    setAudioUploads((prev) => [...prev, ...uploads])
    setCombineStatus(`Added ${uploads.length} audio track(s).`)
    event.target.value = null
  }

  const updateVideoSegment = (id, field, value) => {
    setVideoUploads((prev) => prev.map((segment) => (
      segment.id === id ? { ...segment, [field]: Number(value) } : segment
    )))
  }

  const updateAudioTrack = (id, field, value) => {
    setAudioUploads((prev) => prev.map((track) => (
      track.id === id ? { ...track, [field]: Number(value) } : track
    )))
  }

  const removeVideoSegment = (id) => {
    setVideoUploads((prev) => {
      const segment = prev.find((item) => item.id === id)
      if (segment?.url) URL.revokeObjectURL(segment.url)
      return prev.filter((item) => item.id !== id)
    })
  }

  const removeAudioTrack = (id) => {
    setAudioUploads((prev) => {
      const track = prev.find((item) => item.id === id)
      if (track?.url) URL.revokeObjectURL(track.url)
      return prev.filter((item) => item.id !== id)
    })
  }

  const loadFfmpeg = async () => {
    if (ffmpegInstance) return ffmpegInstance
    setFfmpegLoading(true)
    const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg')
    const ff = createFFmpeg({
      log: true,
      corePath: 'https://unpkg.com/@ffmpeg/core@0.11.4/dist/ffmpeg-core.js'
    })
    await ff.load()
    ff.fetchFile = fetchFile
    setFfmpegInstance(ff)
    setFfmpegLoading(false)
    return ff
  }

  const getSafeName = (file, prefix, index) => {
    const safeBase = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')
    return `${prefix}_${index}_${safeBase}`
  }

  const handleDownloadCombined = () => {
    if (!combinedUrl) return
    const link = document.createElement('a')
    link.href = combinedUrl
    link.download = `${combinedName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.webm`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const combineMedia = async () => {
    setCombineError('')
    setCombineStatus('Preparing media files...')
    if (!videoUploads.length) {
      setCombineError('Upload at least one video to combine.')
      return
    }

    try {
      const ff = await loadFfmpeg()
      const trimmedFiles = []

      for (let index = 0; index < videoUploads.length; index += 1) {
        const segment = videoUploads[index]
        const sourceName = getSafeName(segment.file, 'video', index)
        ff.FS('writeFile', sourceName, await ff.fetchFile(segment.file))

        const trimmedName = `trimmed_${index}.webm`
        const start = Math.max(0, Math.min(segment.start, segment.duration))
        const end = Math.max(start + 0.1, Math.min(segment.end, segment.duration))
        const duration = end - start

        await ff.run(
          '-i', sourceName,
          '-ss', `${start}`,
          '-t', `${duration}`,
          '-c:v', 'libvpx',
          '-c:a', 'libopus',
          trimmedName
        )

        trimmedFiles.push(trimmedName)
      }

      let mergedName = trimmedFiles[0]
      if (trimmedFiles.length > 1) {
        setCombineStatus('Concatenating trimmed clips...')
        const inputArgs = trimmedFiles.flatMap((name) => ['-i', name])
        const concatInputs = trimmedFiles.map((_, index) => `[${index}:v][${index}:a]`).join('')
        const filterComplex = `${concatInputs}concat=n=${trimmedFiles.length}:v=1:a=1[outv][outa]`
        mergedName = 'merged.webm'

        await ff.run(
          ...inputArgs,
          '-filter_complex', filterComplex,
          '-map', '[outv]',
          '-map', '[outa]',
          '-c:v', 'libvpx',
          '-c:a', 'libopus',
          mergedName
        )
      }

      let finalName = mergedName
      if (audioUploads.length) {
        setCombineStatus('Mixing audio tracks into video...')
        for (let index = 0; index < audioUploads.length; index += 1) {
          const track = audioUploads[index]
          const audioName = getSafeName(track.file, 'audio', index)
          ff.FS('writeFile', audioName, await ff.fetchFile(track.file))
        }

        const audioInputs = audioUploads.flatMap((track, index) => ['-i', getSafeName(track.file, 'audio', index)])
        const delayFilters = audioUploads.map((track, index) => {
          return `[${index + 1}:a]adelay=${Math.round(track.insertAt * 1000)}:all=1[a${index}]`
        })
        const amixInputs = audioUploads.map((_, index) => `[a${index}]`).join('')
        const filterComplex = `${delayFilters.join(';')};${amixInputs}amix=inputs=${audioUploads.length}:dropout_transition=0[mixout]`
        const finalOutput = 'final_combined.webm'

        await ff.run(
          '-i', mergedName,
          ...audioInputs,
          '-filter_complex', filterComplex,
          '-map', '0:v',
          '-map', '[mixout]',
          '-c:v', 'libvpx',
          '-c:a', 'libopus',
          '-shortest',
          finalOutput
        )
        finalName = finalOutput
      }

      setCombineStatus('Reading merged output...')
      const data = ff.FS('readFile', finalName)
      const outputBlob = new Blob([data.buffer], { type: 'video/webm' })
      const outputUrl = URL.createObjectURL(outputBlob)
      setCombinedUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return outputUrl
      })
      setCombineStatus('Combined video ready for download.')
    } catch (error) {
      console.error('FFmpeg combine error:', error)
      setCombineError(`Unable to combine media: ${error?.message || 'Unknown error'}. Try simplifying uploads or refreshing the page.`)
      setCombineStatus('')
    }
  }

  useEffect(() => {
    return () => {
      videoUploads.forEach((segment) => segment.url && URL.revokeObjectURL(segment.url))
      audioUploads.forEach((track) => track.url && URL.revokeObjectURL(track.url))
      if (combinedUrl) URL.revokeObjectURL(combinedUrl)
    }
  }, [])

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('portfolioUsers') || '[]')
    const persistedUser = JSON.parse(localStorage.getItem('portfolioAuthUser') || 'null')
    const storedMedia = JSON.parse(localStorage.getItem('portfolioMediaItems') || '[]')
    setUsers(storedUsers)
    setMediaItems(storedMedia)
    if (persistedUser) {
      setUser(persistedUser)
      setActivePage('courses')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolioUsers', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('portfolioMediaItems', JSON.stringify(mediaItems))
  }, [mediaItems])

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

    if (loginData.username === adminUser.username && loginData.password === adminUser.password) {
      setUser(adminUser)
      setActivePage('courses')
      setAuthMessage('Welcome, admin! Create media from the courses page.')
      return
    }

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

    if (username === demoUser.username || username === adminUser.username) {
      setAuthError('The username demo or admin is reserved. Choose another username.')
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
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop())
      setMediaStream(null)
    }
    setUser(null)
    setLoginData({ username: '', password: '' })
    setActivePage('home')
    setAuthView('login')
    setAuthMessage('You have been logged out.')
  }

  const getMediaStream = async () => {
    try {
      const constraints = mediaForm.type === 'audio' ? { audio: true, video: false } : { audio: true, video: true }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setMediaStream(stream)
      if (videoRef.current && mediaForm.type === 'video') {
        videoRef.current.srcObject = stream
      }
      return stream
    } catch (err) {
      setMediaError('Unable to access camera or microphone. Please allow access and try again.')
      return null
    }
  }

  const handleStartRecording = async () => {
    setMediaError('')
    setMediaMessage('')
    const stream = mediaStream || await getMediaStream()
    if (!stream) return

    const mimeType = mediaForm.type === 'audio' ? 'audio/webm' : 'video/webm'
    const options = MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : {}
    const recorder = new MediaRecorder(stream, options)
    const chunks = []

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data)
      }
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType })
      const blobUrl = URL.createObjectURL(blob)
      const newMedia = {
        id: Date.now(),
        type: mediaForm.type,
        title: mediaForm.title || `${mediaForm.type.charAt(0).toUpperCase() + mediaForm.type.slice(1)} recording`,
        description: mediaForm.description,
        createdAt: new Date().toISOString(),
        blob,
        blobUrl,
        fileType: mediaForm.type === 'audio' ? 'webm' : 'webm'
      }
      setMediaItems((prev) => [newMedia, ...prev])
      setMediaForm({ type: mediaForm.type, title: '', description: '' })
      setMediaMessage(`${mediaForm.type === 'video' ? 'Video' : 'Audio'} recorded successfully.`)
      setRecording(false)
      setMediaRecorder(null)
    }

    recorder.start()
    setRecordedChunks(chunks)
    setMediaRecorder(recorder)
    setRecording(true)
    setMediaMessage('Recording started...')
  }

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop())
      setMediaStream(null)
    }
    setRecording(false)
  }

  const handleDownloadMedia = (item) => {
    const link = document.createElement('a')
    link.href = item.blobUrl
    link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${item.type}.${item.fileType}`
    document.body.appendChild(link)
    link.click()
    link.remove()
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
            {user?.username === 'admin' && (
              <div className="glass-card p-8 border-white/10">
                <h3 className="text-xl font-bold mb-4">Admin Media Recorder</h3>
                {mediaError && <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{mediaError}</p>}
                {mediaMessage && <p className="mb-4 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-200">{mediaMessage}</p>}

                <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                  <div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm text-gray-200">
                        Type
                        <select
                          value={mediaForm.type}
                          onChange={(event) => setMediaForm({ ...mediaForm, type: event.target.value })}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                        >
                          <option value="video">Video</option>
                          <option value="audio">Audio</option>
                        </select>
                      </label>
                      <label className="block text-sm text-gray-200">
                        Title
                        <input
                          value={mediaForm.title}
                          onChange={(event) => setMediaForm({ ...mediaForm, title: event.target.value })}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                          placeholder="Enter title"
                        />
                      </label>
                      <label className="block text-sm text-gray-200 sm:col-span-2">
                        Description
                        <textarea
                          value={mediaForm.description}
                          onChange={(event) => setMediaForm({ ...mediaForm, description: event.target.value })}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary-pink"
                          placeholder="Describe your media recording"
                          rows="4"
                        />
                      </label>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        disabled={recording}
                        className="rounded-full bg-primary-pink px-6 py-3 text-sm font-semibold text-black transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {recording ? 'Recording...' : `Start ${mediaForm.type === 'video' ? 'Video' : 'Audio'}`}
                      </button>
                      <button
                        type="button"
                        onClick={handleStopRecording}
                        disabled={!recording}
                        className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Stop Recording
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-gray-400 mb-3">Camera preview</p>
                    {mediaForm.type === 'video' ? (
                      <video
                        ref={videoRef}
                        className="h-full w-full rounded-3xl bg-black"
                        autoPlay
                        muted
                        playsInline
                      />
                    ) : (
                      <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-gray-400">
                        Audio mode has no camera preview.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
                  <h4 className="text-lg font-semibold mb-4">Video editor</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-gray-200">
                      Upload video segments
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoFiles}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                      />
                    </label>
                    <label className="block text-sm text-gray-200">
                      Upload audio tracks
                      <input
                        type="file"
                        accept="audio/*"
                        multiple
                        onChange={handleAudioFiles}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                      />
                    </label>
                  </div>

                  {videoUploads.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <h5 className="font-semibold text-white">Video segments</h5>
                      {videoUploads.map((segment) => (
                        <div key={segment.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-wrap justify-between gap-3">
                            <div>
                              <p className="text-sm uppercase text-primary-pink tracking-[0.2em]">Segment</p>
                              <p className="font-semibold text-white">{segment.name}</p>
                              <p className="text-gray-400 text-sm">Duration: {segment.duration.toFixed(1)}s</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeVideoSegment(segment.id)}
                              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2 mt-4">
                            <label className="text-sm text-gray-200">
                              Start (sec)
                              <input
                                type="number"
                                min="0"
                                max={segment.duration}
                                step="0.1"
                                value={segment.start}
                                onChange={(event) => updateVideoSegment(segment.id, 'start', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                              />
                            </label>
                            <label className="text-sm text-gray-200">
                              End (sec)
                              <input
                                type="number"
                                min="0"
                                max={segment.duration}
                                step="0.1"
                                value={segment.end}
                                onChange={(event) => updateVideoSegment(segment.id, 'end', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {audioUploads.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <h5 className="font-semibold text-white">Audio tracks</h5>
                      {audioUploads.map((track) => (
                        <div key={track.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-wrap justify-between gap-3">
                            <div>
                              <p className="text-sm uppercase text-primary-pink tracking-[0.2em]">Audio</p>
                              <p className="font-semibold text-white">{track.name}</p>
                              <p className="text-gray-400 text-sm">Length: {track.duration.toFixed(1)}s</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAudioTrack(track.id)}
                              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                            >
                              Remove
                            </button>
                          </div>
                          <label className="block text-sm text-gray-200 mt-4">
                            Insert at (sec)
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              value={track.insertAt}
                              onChange={(event) => updateAudioTrack(track.id, 'insertAt', event.target.value)}
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
                    <label className="text-sm text-gray-200">
                      Output file name
                      <input
                        value={combinedName}
                        onChange={(event) => setCombinedName(event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                        placeholder="combined_video"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={combineMedia}
                      disabled={ffmpegLoading}
                      className="rounded-full bg-primary-pink px-6 py-3 text-sm font-semibold text-black transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {ffmpegLoading ? 'Loading editor...' : 'Combine and Download'}
                    </button>
                  </div>

                  {combineStatus && <p className="mt-4 text-sm text-green-200">{combineStatus}</p>}
                  {combineError && <p className="mt-4 text-sm text-red-300">{combineError}</p>}

                  {combinedUrl && (
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <a
                        href={combinedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Preview combined video
                      </a>
                      <button
                        type="button"
                        onClick={handleDownloadCombined}
                        className="rounded-full bg-primary-pink px-6 py-3 text-sm font-semibold text-black transition hover:bg-pink-400"
                      >
                        Download Combined Video
                      </button>
                    </div>
                  )}
                </div>

                {mediaItems.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-6">Recorded Media</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {mediaItems.map((item) => (
                        <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="mb-3 rounded-3xl bg-black">
                            {item.blobUrl && item.type === 'video' ? (
                              <video controls src={item.blobUrl} className="h-36 w-full rounded-3xl object-cover" />
                            ) : item.blobUrl && item.type === 'audio' ? (
                              <div className="flex h-36 w-full items-center justify-center rounded-3xl bg-white/5 p-3">
                                <audio controls src={item.blobUrl} className="w-full" />
                              </div>
                            ) : (
                              <div className="h-36 w-full rounded-3xl bg-white/5" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs uppercase text-primary-pink tracking-[0.2em]">{item.type}</p>
                            <h5 className="font-semibold text-white truncate">{item.title}</h5>
                            <p className="text-gray-400 text-sm truncate">{item.description}</p>
                            <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDownloadMedia(item)}
                            className="mt-4 w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                          >
                            Download {item.type}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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
                  href="https://www.youtube.com/@Sensvio-vq3kn"
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
                    href="https://www.youtube.com/@Sensvio-vq3kn"
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
