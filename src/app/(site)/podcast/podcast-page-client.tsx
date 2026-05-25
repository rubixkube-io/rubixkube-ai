'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { motion } from "framer-motion"
import { fadeUpVariants, fadeUp } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"
import { rkMono10, rkMono13 } from "@/lib/landing-responsive-type"
import { urlFor } from "@/lib/sanity.client"
import { Calendar, Search, Rss } from "lucide-react"
import Link from "next/link"

import { IconBrandApplePodcast } from "@tabler/icons-react"

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

function getYoutubeId(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/)
  return match ? match[1] : null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PodcastPageClient({ episodes }: { episodes: any[] }) {
  const prefersReducedMotion = useReducedMotion()
  const featuredEpisode = episodes[0]
  const pastEpisodes = episodes.slice(1)

  return (
    <>
      <Navbar />

      {/* Hero Section — matching BlogPageClient hero structure */}
      <section className="relative bg-[var(--bg)] px-[var(--pad)]">
        <div className="rk-blog-listing-shell pt-[calc(var(--nav-stack)+2.5rem)] pb-10 sm:pb-12 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="flex w-full flex-col items-stretch text-center"
          >
            <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-5', rkMono10)}>
              Original Series
            </span>
            <h1 className="rk-landing-h2-std font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] w-full">
              The Root Cause <span className="italic text-[var(--blue)]">Podcast</span>
            </h1>
            <p className="font-light leading-[1.75] text-[var(--mid)] w-full mx-auto mt-6 max-w-2xl text-lg">
              Deep dives into AI-native infrastructure, war stories from the trenches, and the future of autonomous site reliability.
            </p>

            {/* Icon Links */}
            <div className="mt-8 flex items-center justify-center gap-4">
               <a href="https://www.youtube.com/playlist?list=PL0RlH4tLsvsgl9A07Ha31rYSalREe5Cp3" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--rule)] bg-[var(--background-secondary)] hover:border-[#FF0000] hover:text-[#FF0000] text-[var(--ink)] transition-colors">
                  <YoutubeIcon className="w-5 h-5" />
               </a>
               <a href="https://podcasts.apple.com/us/podcast/the-root-cause-by-rubixkube/id1896761094" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--rule)] bg-[var(--background-secondary)] hover:border-[#872EC4] hover:text-[#872EC4] text-[var(--ink)] transition-colors">
                  <IconBrandApplePodcast stroke={1.5} className="w-5 h-5" />
               </a>
               <a href="https://feeds.zencastr.com/f/3wcU1DE3.rss" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--rule)] bg-[var(--background-secondary)] hover:border-[var(--blue)] hover:text-[var(--blue)] text-[var(--ink)] transition-colors">
                  <Rss className="w-4 h-4 ml-0.5" />
               </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section matching BlogPageClient */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] px-[var(--pad)] py-12 sm:py-16">
        <div className="rk-blog-listing-shell">
           {episodes.length === 0 ? (
              <motion.div
                className="text-center py-20"
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
              >
                <div className="max-w-lg mx-auto">
                  <div className="w-16 h-16 flex items-center justify-center bg-[var(--blue)]/10 mx-auto mb-8 rounded-full">
                    <Search className="w-8 h-8 text-[var(--blue)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] text-[var(--ink)] mb-4">
                    No episodes found
                  </h3>
                  <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mb-8', rkMono13)}>
                    We are crafting exceptional audio content on infrastructure reliability. Check back soon.
                  </p>
                </div>
              </motion.div>
           ) : (
              <div className="space-y-14 sm:space-y-16">
                 {/* Featured Episode */}
                 {featuredEpisode && (
                    <motion.div
                      variants={fadeUpVariants}
                      initial={prefersReducedMotion ? 'visible' : 'hidden'}
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                       <div className="mb-8">
                         <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
                           Featured
                         </span>
                         <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-3">
                           Latest <span className="italic text-[var(--blue)]">Episode</span>
                         </h2>
                       </div>

                       {/* Render Featured Card without absolute text overlay */}
                       <Link href={`/podcast/${featuredEpisode.slug}`} className="group block">
                          <article className="bg-[var(--background-secondary)] border border-[var(--rule)] rounded-3xl overflow-hidden transition-all duration-500 hover:border-[var(--blue)]/30 hover:shadow-xl hover:-translate-y-1">
                             <div className="relative aspect-video overflow-hidden border-b border-[var(--rule)]">
                                {getYoutubeId(featuredEpisode.youtubeUrl) ? (
                                  <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`https://img.youtube.com/vi/${getYoutubeId(featuredEpisode.youtubeUrl)}/maxresdefault.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                  </>
                                ) : featuredEpisode.image ? (
                                  <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={urlFor(featuredEpisode.image).url()} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                  </>
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[var(--blue)]/20 via-[var(--bg)] to-[var(--blue)]/30 flex items-center justify-center">
                                     <Rss className="w-16 h-16 text-[var(--blue)] opacity-60" />
                                  </div>
                                )}
                             </div>

                             <div className="p-8 md:p-10 lg:p-12">
                                <div className="mb-4">
                                  <span className="inline-flex items-center rounded-full bg-[var(--blue)]/10 text-[var(--blue)] px-3 py-1 text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-mono)]">
                                    Podcast
                                  </span>
                                </div>
                                <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--ink)] mb-4 group-hover:text-[var(--blue)] transition-colors">
                                   {featuredEpisode.title}
                                </h3>
                                {featuredEpisode.excerpt && (
                                  <p className="font-[family-name:var(--font-mono)] text-[var(--mid)] text-[15px] leading-relaxed max-w-4xl mb-8">
                                     {featuredEpisode.excerpt}
                                  </p>
                                )}
                                <div className="flex items-center gap-6 text-sm text-[var(--mid)] font-[family-name:var(--font-mono)]">
                                   <div className="flex items-center gap-2">
                                     <Calendar className="w-4 h-4" />
                                     <time>{new Date(featuredEpisode.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                   </div>
                                </div>
                             </div>
                          </article>
                       </Link>
                    </motion.div>
                 )}

                 {/* Past Episodes Grid */}
                 {pastEpisodes.length > 0 && (
                   <motion.div
                      variants={fadeUpVariants}
                      initial={prefersReducedMotion ? 'visible' : 'hidden'}
                      whileInView="visible"
                      viewport={{ once: true }}
                   >
                      <div className="mb-8">
                         <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
                           All Episodes
                         </span>
                         <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-3">
                           Past <span className="italic text-[var(--blue)]">conversations.</span>
                         </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                         {pastEpisodes.map((episode, idx) => {
                           const videoId = getYoutubeId(episode.youtubeUrl)
                           return (
                              <motion.div
                                key={episode._id}
                                variants={fadeUpVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: (idx * 0.04) + 0.2 }}
                              >
                                <Link href={`/podcast/${episode.slug}`} className="group block h-full">
                                   <article className="h-full bg-[var(--background-secondary)] border border-[var(--rule)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--blue)]/30 hover:shadow-xl hover:-translate-y-2">
                                      <div className="aspect-video relative overflow-hidden border-b border-[var(--rule)]">
                                         {videoId ? (
                                            <>
                                              {/* eslint-disable-next-line @next/next/no-img-element */}
                                              <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                            </>
                                         ) : episode.image ? (
                                            <>
                                              {/* eslint-disable-next-line @next/next/no-img-element */}
                                              <img src={urlFor(episode.image).url()} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                            </>
                                         ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[var(--blue)]/10 via-[var(--bg)] to-[var(--blue)]/20 flex items-center justify-center">
                                              <Rss className="w-10 h-10 text-[var(--blue)] opacity-60" />
                                            </div>
                                         )}
                                         
                                         <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm text-[var(--ink)] border border-[var(--rule)] px-3 py-1.5 text-xs font-semibold shadow-lg">
                                              Podcast
                                            </span>
                                          </div>
                                      </div>
                                      <div className="p-6 h-full flex flex-col">
                                         <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[var(--ink)] mb-3 leading-tight line-clamp-2 group-hover:text-[var(--blue)] transition-colors duration-300">
                                            {episode.title}
                                         </h3>
                                         {episode.excerpt && (
                                            <p className="font-[family-name:var(--font-mono)] text-[var(--mid)] leading-relaxed mb-6 line-clamp-3 flex-grow text-sm">
                                              {episode.excerpt}
                                            </p>
                                         )}
                                         <div className="flex items-center justify-between text-sm text-[var(--mid)] pt-4 border-t border-[var(--rule)] font-[family-name:var(--font-mono)]">
                                            <div className="flex items-center gap-1.5">
                                               <Calendar className="w-3.5 h-3.5" />
                                               <time>{new Date(episode.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                                            </div>
                                         </div>
                                      </div>
                                   </article>
                                </Link>
                              </motion.div>
                           )
                         })}
                      </div>
                   </motion.div>
                 )}
              </div>
           )}
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
