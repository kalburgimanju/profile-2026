import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function ArticleDetailPage({ article, onBack }) {
  if (!article) {
    return (
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <p className="text-gray-400">Article not found</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-primary-pink hover:text-pink-400 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </button>

        {/* Article Header */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 mb-3">
            {article.pubDate && new Date(article.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
        </div>

        {/* Article Content */}
        <div className="glass-card p-8 border-white/5 max-w-none">
          <div className="space-y-6 text-gray-300 leading-relaxed prose prose-invert max-w-none">
            {article.content ? (
              <div
                className="prose prose-invert max-w-none 
                  prose-p:mb-4 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-white
                  prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-white
                  prose-h4:text-xl prose-h4:font-bold prose-h4:mt-4 prose-h4:mb-2
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4
                  prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4
                  prose-li:my-2 prose-li:text-gray-300
                  prose-blockquote:border-l-4 prose-blockquote:border-primary-pink prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
                  prose-code:bg-black/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-primary-pink prose-code:text-sm
                  prose-pre:bg-black/50 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                  prose-a:text-primary-pink prose-a:hover:text-pink-400 prose-a:underline
                  prose-img:rounded-lg prose-img:my-6 prose-img:max-w-full
                  prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-gray-200
                  prose-hr:border-white/10 prose-hr:my-8"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
                    .replace(/on\w+="[^"]*"/gi, '')
                }}
              />
            ) : article.fullDescription ? (
              <div className="text-gray-300 leading-relaxed text-base">
                {article.fullDescription.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            ) : article.description ? (
              <div className="text-gray-300 leading-relaxed text-base">
                {article.description.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            ) : null}
          </div>

          {/* Link to Medium at bottom */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-pink hover:text-black"
            >
              <ExternalLink size={14} />
              View on Medium
            </a>
          </div>
        </div>

        {/* Related Articles Suggestion */}
        <div className="mt-12 pt-12 border-t border-white/10 flex justify-between items-center">
          <p className="text-gray-400">
            <button
              onClick={onBack}
              className="text-primary-pink hover:text-pink-400 transition-colors"
            >
              ← Back to all articles
            </button>
          </p>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-pink hover:text-black"
          >
            <ExternalLink size={14} />
            Original on Medium
          </a>
        </div>
      </motion.div>
    </main>
  )
}
