import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, MapPin, Briefcase } from 'lucide-react'
import image from '../assets/homee.png'

const Header = () => {
    const [query, setQuery] = useState('')

    return (
        <div className="relative w-full overflow-hidden">

            {/*  Hero Image with overlay  */}
            <div className="relative w-full h-[500px]">
                <img src={image}
                    alt="Hero"
                    className="w-full h-full object-cover" />
                {/* Dark gradient overlay so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

                {/*  Content centered on image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">

                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-5 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Your Gateway to Career Success
                    </span>

                    {/* Heading */}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mb-3">
                        Building Nepal's Future,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            One Career at a Time
                        </span>
                    </h1>

                    <p className="text-white/70 text-sm md:text-base mb-8 max-w-xl">
                        with <span className="text-white font-semibold">Rojgar</span>
                        <span className="text-cyan-400 font-semibold">Bank</span> — Nepal's most trusted job platform
                    </p>

                    {/* Search bar  */}
                    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">

                        {/* Job title input */}
                        <div className="flex items-center gap-2 flex-1 bg-white rounded-xl px-4 py-2.5">
                            <Search className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Job title, keyword..."
                                className="outline-none text-sm text-gray-700 w-full placeholder-gray-400 bg-transparent"
                            />
                        </div>

                        {/* Location input */}
                        <div className="hidden md:flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 w-44">
                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="outline-none text-sm text-gray-700 w-full placeholder-gray-400 bg-transparent"
                            />
                        </div>

                        {/* Search button */}
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-200 hover:scale-105 shrink-0">
                            <Search className="w-4 h-4 mr-1.5" />
                            Search
                        </Button>
                    </div>

                    {/* Quick category pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                        <span className="text-white/50 text-xs">Popular:</span>
                        {['IT & Tech', 'Banking', 'Marketing', 'Engineering', 'Education'].map(tag => (
                            <button key={tag}
                                className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full transition-all duration-150">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Header