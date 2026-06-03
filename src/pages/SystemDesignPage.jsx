import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Layers, Terminal, Globe } from 'lucide-react'
import heroImage from '../assets/hero.png'

export default function SystemDesignPage({ articles }) {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <section className="mb-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-primary-blue">
                <Layers size={18} />
                <span>System Design Manual</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                System Design Learning Tutorial
              </h1>
              <p className="max-w-3xl text-gray-400 text-lg">
                A step-by-step system design learning manual built from curated content, reference links, architecture diagrams, images, and video lessons. Ideal for software engineers preparing for interviews or designing large-scale systems.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">High-level architecture</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">Scalability patterns</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">Reliability & monitoring</span>
              </div>
            </motion.div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/30 shadow-xl">
            <img src={heroImage} alt="System design architecture" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mb-24 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <article className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-pink">
              <Globe size={18} />
              <h2 className="text-2xl font-bold">What is System Design?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              System design is the practice of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It includes both the high-level structure of the system and the detailed design of each subsystem.
            </p>
            <ul className="mt-6 space-y-3 text-gray-400 list-disc list-inside">
              <li>Define functional and non-functional requirements</li>
              <li>Choose storage, caching, and messaging strategies</li>
              <li>Design for availability, scalability, performance, and security</li>
              <li>Build a monitoring and operational plan</li>
            </ul>
          </article>

          <article className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-blue">
              <Terminal size={18} />
              <h2 className="text-2xl font-bold">System Design Process</h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p><strong>1. Clarify requirements:</strong> Start by asking what the system must do, what volume it must handle, and what performance constraints exist.</p>
              <p><strong>2. Estimate scale:</strong> Calculate traffic, storage, and growth so you can choose the right architecture patterns.</p>
              <p><strong>3. Define components:</strong> Break the system into services, APIs, data stores, caches, and event pipelines.</p>
              <p><strong>4. Design interactions:</strong> Draw data flow diagrams and sequence flows to show how requests travel through the system.</p>
              <p><strong>5. Validate and iterate:</strong> Review tradeoffs, optimize bottlenecks, and add reliability, monitoring, and security improvements.</p>
            </div>
          </article>

          <article className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-pink">
              <Layers size={18} />
              <h2 className="text-2xl font-bold">Architecture Patterns</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Load Balancing', desc: 'Distribute requests across service instances to eliminate single points of failure.' },
                { title: 'Caching', desc: 'Use edge caches and in-memory caches to reduce latency and backend load.' },
                { title: 'CQRS', desc: 'Separate read and write models for performance and scalability.' },
                { title: 'Event-Driven', desc: 'Use message queues to decouple components and manage asynchronous workflows.' }
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-blue">
              <Terminal size={18} />
              <h2 className="text-2xl font-bold">Example: High-Level Tutorial Design</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Build a system for a responsive tutorial platform that serves articles, images, and video lessons to learners worldwide. This design focuses on scalability, fast reads, and reliable content delivery.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <h3 className="font-semibold text-white mb-3">Content Layer</h3>
                <ul className="text-gray-400 list-disc list-inside space-y-2">
                  <li>Web frontend + mobile clients</li>
                  <li>CDN for static tutorial assets</li>
                  <li>Search-enabled article discovery</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <h3 className="font-semibold text-white mb-3">Service Layer</h3>
                <ul className="text-gray-400 list-disc list-inside space-y-2">
                  <li>API gateway</li>
                  <li>Article service</li>
                  <li>Media service for images and videos</li>
                  <li>Recommendation engine</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-pink">
              <Globe size={18} />
              <h2 className="text-2xl font-bold">Visual Architecture</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">System flow</h3>
                  <p className="text-gray-400">Client requests are routed through a load balancer to stateless services and cached data stores. Media content is delivered through a CDN while logs and metrics stream to observability services.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black p-4">
                  <img src={heroImage} alt="System architecture diagram" className="w-full rounded-3xl object-cover" />
                </div>
              </div>
            </div>
          </article>
        </div>

        <aside className="space-y-8">
          <div className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-pink">
              <Terminal size={18} />
              <h2 className="text-2xl font-bold">Key System Design Checklist</h2>
            </div>
            <ul className="space-y-3 text-gray-400 list-disc list-inside">
              <li>Define traffic patterns, peak load, and user growth.</li>
              <li>Choose data storage based on consistency and query patterns.</li>
              <li>Identify hot paths and add caching strategically.</li>
              <li>Plan fault tolerance with replication and retries.</li>
              <li>Instrument metrics, logs, and alerts for production health.</li>
            </ul>
          </div>

          <div className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-blue">
              <Globe size={18} />
              <h2 className="text-2xl font-bold">Video Lesson</h2>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/GEBE4dcQLYk"
                title="System design lesson video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-gray-400 text-sm">A guided architecture overview that connects content delivery, caching, and scalability patterns for tutorial systems.</p>
          </div>

          <div className="glass-card border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 text-primary-pink">
              <Layers size={18} />
              <h2 className="text-2xl font-bold">Tutorial References</h2>
            </div>
            <div className="space-y-4">
              {articles.length ? (
                articles.map((article, index) => (
                  <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">{new Date(article.pubDate).toLocaleDateString()}</p>
                        <h3 className="font-semibold text-white text-base">{article.title}</h3>
                      </div>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-pink text-xs font-semibold"
                      >
                        Read
                      </a>
                    </div>
                    <div className="mt-3 text-sm text-gray-400 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content || article.description }} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Loading reference articles…</p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
