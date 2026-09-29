import { useEffect, useState } from 'react'

import Navbar from './Navbar'
import PageLoader from './PageLoader'
import Footer from './Footer'

import { getPublicAbout } from '../lib/aboutApi'
import aboutFallback from './aboutFallback'

const proseClass = 'text-[16px] leading-[1.9] tracking-[0.005em] text-black md:text-[17px]'

function RichText({ html, className = '' }) {
    if (!html) return null

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

function SectionImage({ src, alt, children }) {
    const [imgError, setImgError] = useState(false)

    return (
        <div className="relative">
            <div className="absolute -inset-3 border border-sky-300/40 rounded-2xl -z-10 hidden md:block" />

            {src && !imgError ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setImgError(true)}
                    className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
                />
            ) : (
                <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-gray-400 shadow-sm">
                    {children ?? 'Image coming soon'}
                </div>
            )}
        </div>
    )
}

function TeamCard({ member }) {
    const [imgError, setImgError] = useState(false)
    const showPhoto = member.image_url && !imgError

    return (
        <div className="flex flex-col items-center rounded-xl border-2 border-sky-400 bg-white px-8 py-10 text-center shadow-sm transition-shadow hover:shadow-md">
            {showPhoto ? (
                <img
                    src={member.image_url}
                    alt={member.name}
                    onError={() => setImgError(true)}
                    className="mb-5 h-24 w-24 rounded-md object-cover"
                />
            ) : (
                <div
                    aria-hidden="true"
                    className="mb-5 flex h-24 w-24 items-center justify-center rounded-md bg-sky-50 text-2xl font-bold text-sky-500"
                >
                    {member.name?.trim()?.charAt(0).toUpperCase() ?? '?'}
                </div>
            )}

            <h3 className="text-lg font-bold text-black">{member.name}</h3>

            {member.role && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-sky-600">
                    {member.role}
                </p>
            )}

            {member.bio && (
                <div
                    className="mt-4 max-w-xs text-sm leading-relaxed text-black [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: member.bio }}
                />
            )}
        </div>
    )
}

const Aboutus = () => {
    const [content, setContent] = useState(null)
    const [usingFallback, setUsingFallback] = useState(false)

    useEffect(() => {
        let cancelled = false

        getPublicAbout()
            .then((data) => {
                if (!cancelled) setContent(data)
            })
            .catch((err) => {
                console.error(err)
                if (cancelled) return
                setUsingFallback(true)
                setContent(aboutFallback)
            })

        return () => {
            cancelled = true
        }
    }, [])

    if (!content) {
        return (
            <div className="min-h-screen bg-[#F8F7F4]">
                <Navbar />
                <div className="flex items-center justify-center py-40">
                    <PageLoader message="Please wait..." />
                </div>
            </div>
        )
    }

    const { page } = content
    const achievements = content.achievements ?? []
    const leadership = content.leadership ?? []
    const pillars = content.pillars ?? []
    const team = content.team ?? []

    return (
        <div className="bg-[#F8F7F4] min-h-screen">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            {usingFallback && (
                <div className="mx-auto max-w-4xl px-6 pt-8">
                    <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        We could not load the latest company information, so this
                        page is showing our previous copy.
                    </p>
                </div>
            )}

            {/* Page intro */}
            <div className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
                <div className="mb-14 text-center">
                    {page.hero_title && (
                        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-black md:text-5xl lg:text-6xl">
                            {page.hero_title}
                        </h1>
                    )}

                    {page.hero_title_highlight && (
                        <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-sky-600 md:text-5xl lg:text-6xl">
                            {page.hero_title_highlight}
                        </h1>
                    )}

                    <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-sky-400" />

                    {page.hero_subtitle && (
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black md:text-lg">
                            {page.hero_subtitle}
                        </p>
                    )}
                </div>

                {/* Company introduction */}
                {page.show_intro && (
                    <div className="mx-auto max-w-4xl">
                        <RichText
                            html={page.intro_paragraphs}
                            className={`space-y-7 text-center ${proseClass}`}
                        />

                        {page.show_commitment && (page.commitment_title || page.commitment_text) && (
                            <div className="mt-12 flex items-center justify-center gap-4 border-l-4 border-sky-500 bg-white px-6 py-5 text-center shadow-sm">
                                <div>
                                    {page.commitment_title && (
                                        <p className="text-sm font-bold uppercase tracking-wider text-sky-600">
                                            {page.commitment_title}
                                        </p>
                                    )}
                                    {page.commitment_text && (
                                        <p className="mt-1 text-sm leading-6 text-black">
                                            {page.commitment_text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Our Achievements */}
                {page.show_achievements && achievements.length > 0 && (
                    <div className="max-w-4xl mx-auto px-6 pb-24">
                        {page.achievements_title && (
                            <h2 className="text-3xl font-bold text-center text-black mb-12">
                                {page.achievements_title}
                            </h2>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                                >
                                    <p className="text-3xl font-bold text-sky-600">
                                        {achievement.value}
                                    </p>
                                    <p className="text-black mt-2">{achievement.label}</p>
                                </div>
                            ))}
                        </div>

                        {page.achievements_paragraphs && (
                            <div className="mt-12 max-w-4xl mx-auto">
                                <RichText
                                    html={page.achievements_paragraphs}
                                    className="space-y-6 text-center text-lg leading-relaxed text-black"
                                />
                            </div>
                        )}
                    </div>
                )}

                {page.show_leadership && (
                    <>
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-5 leading-tight">
                            {page.leadership_title}
                        </h1>
                        {page.leadership_subtitle && (
                            <p className="text-black text-lg leading-relaxed">
                                {page.leadership_subtitle}
                            </p>
                        )}
                    </>
                )}
            </div>

            {/* Leadership messages */}
            {page.show_leadership && leadership.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 pb-24 space-y-20">
                    {leadership.map((person, index) => (
                        <div
                            key={person.id}
                            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                                index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                            }`}
                        >
                            <SectionImage
                                src={person.image_url}
                                alt={`${person.role || person.name} portrait`}
                            />

                            <div>
                                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
                                    Message from our {person.name}
                                </p>
                                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                                    {person.role}
                                </h2>
                                <div className="w-12 h-[3px] bg-sky-500 mb-6" />
                                <RichText
                                    html={person.message}
                                    className="space-y-6 leading-relaxed text-base md:text-lg text-black"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Mission, Vision, Opportunities */}
            {page.show_pillars && pillars.length > 0 && (
                <div className="max-w-8xl mx-auto px-6 pb-24 space-y-20">
                    {page.pillars_title && (
                        <h2 className="text-center text-3xl font-bold text-black">
                            {page.pillars_title}
                        </h2>
                    )}

                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.id}
                            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                                index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                            }`}
                        >
                            <SectionImage
                                src={pillar.image_url}
                                alt={`${pillar.title} image`}
                            />

                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-black mb-3">
                                    {pillar.title}
                                </h3>
                                <div className="w-10 h-[3px] bg-sky-500 mb-4" />
                                <RichText
                                    html={pillar.description}
                                    className="space-y-6 leading-relaxed text-black"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Our Team */}
            {page.show_team && team.length > 0 && (
                <section className="w-full">
                    <div className="max-w-5xl mx-auto px-6 pb-24">
                        {page.team_title && (
                            <h2 className="mb-12 text-center text-3xl font-bold text-black">
                                {page.team_title}
                            </h2>
                        )}

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {team.map((member) => (
                                <TeamCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Aboutus
