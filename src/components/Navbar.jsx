import React, { useState, useRef } from 'react';
import logo from '../assets/logoo.jpeg';
import { LogOut, User, ChevronDown, Menu, X,Briefcase, Settings, BookOpen, Building2, Code, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarImage } from './ui/avatar';


const jobCategories = [
    { label: 'IT & Technology', to: '/jobs/it', icon: Code },
    { label: 'Banking & Finance', to: '/jobs/banking', icon: Building2 },
    { label: 'Marketing', to: '/jobs/marketing', icon: Megaphone },
    { label: 'Engineering', to: '/jobs/engineering', icon: Settings },
    { label: 'Education', to: '/jobs/education', icon: BookOpen },
    { label: 'Business & Management', to: '/jobs/business', icon: Briefcase },
];

const services = [
    { label: 'Resume Builder', to: '/services/resume', icon: BookOpen },
    { label: 'Career Counseling', to: '/services/counseling', icon: User },
    { label: 'Job Placement', to: '/services/placement', icon: Briefcase },
    { label: 'Skill Assessment', to: '/services/assessment', icon: Settings },
];

const simpleLinks = [
    { label: 'Training', to: '/training' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

// Reusable plain hover dropdown — no Radix, so no internal pointer conflicts
const HoverDropdown = ({ triggerLabel, triggerClassName, items, align = 'left' }) => {
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef(null);

    const handleEnter = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setOpen(true);
    };

    const handleLeave = () => {
        closeTimeout.current = setTimeout(() => setOpen(false), 150);
    };

    return (
        <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <button
                style={{ cursor: 'pointer' }}
                className={triggerClassName}
            >
                {triggerLabel}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div
                    className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} w-56 rounded-xl shadow-lg bg-white border border-gray-100 p-1 z-50`}
                >
                    {items.map(({ label, to, icon: Icon }) => (
                        <Link
                            key={label}
                            to={to}
                            style={{ cursor: 'pointer' }}
                            className="flex items-center gap-2.5 text-sm text-black hover:text-cyan-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
                        >
                            {Icon && <Icon className="w-4 h-4 text-cyan-500" />}
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const Navbar = () => {
    const user = false;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <img src={logo} alt="Logo" className="h-14 sm:h-20 w-auto object-contain sm:-translate-x-8" />
                </Link>

                {/* Desktop Nav Links */}
                <ul className="hidden lg:flex items-center gap-7">
                    <li>
                        <HoverDropdown
                            triggerLabel="Jobs Categories"
                            triggerClassName="flex items-center gap-1 text-md font-medium text-black hover:text-cyan-600 transition-colors select-none outline-none"
                            items={jobCategories}
                        />
                    </li>

                    <li>
                        <HoverDropdown
                            triggerLabel="Services"
                            triggerClassName="flex items-center gap-1 text-md font-medium text-black hover:text-cyan-600 transition-colors select-none outline-none"
                            items={services}
                        />
                    </li>

                    {simpleLinks.map(({ label, to }) => (
                        <li key={label}>
                            <Link to={to} style={{ cursor: 'pointer' }} className="text-md font-medium text-black hover:text-cyan-600 transition-colors duration-150">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right side: auth buttons OR avatar */}
                <div className="hidden lg:flex items-center gap-4">
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <HoverDropdown
                                triggerLabel="For JobSeekers"
                                triggerClassName="text-sm font-semibold text-gray-700 rounded-full hover:text-cyan-600 select-none outline-none flex items-center gap-1 px-4 py-2"
                                items={[
                                    { label: 'Jobseeker Login', to: '/jobseeker/login' },
                                    { label: 'Jobseeker Register', to: '/jobseeker/register' },
                                ]}
                                align="right"
                            />

                            <HoverDropdown
                                triggerLabel="For Employers"
                                triggerClassName="text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-5 select-none outline-none flex items-center gap-1 py-2"
                                items={[
                                    { label: 'Employer Login', to: '/employee/login' },
                                    { label: 'Employer Register', to: '/employee/register' },
                                ]}
                                align="right"
                            />
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar style={{ cursor: 'pointer' }} className="ring-2 ring-transparent hover:ring-cyan-400 transition">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 rounded-2xl shadow-xl p-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">Rudra</p>
                                        <p className="text-xs text-gray-500 leading-snug">Frontend Developer, Kathmandu</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 mb-3" />
                                <div className="flex flex-col gap-1">
                                    <Link to="/profile" style={{ cursor: 'pointer' }} className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 px-2 py-1.5 rounded-lg hover:bg-cyan-50 transition-colors">
                                        <User className="w-4 h-4" /> Profile
                                    </Link>
                                    <button style={{ cursor: 'pointer' }} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    style={{ cursor: 'pointer' }}
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 px-4  sm:px-6 py-4 flex flex-col gap-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2 mb-1">Jobs Categories</p>
                    {jobCategories.map(({ label, to, icon: Icon }) => (
                        <Link key={label} to={to} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 py-1.5">
                            <Icon className="w-4 h-4 text-cyan-500" />{label}
                        </Link>
                    ))}

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-1">Services</p>
                    {services.map(({ label, to, icon: Icon }) => (
                        <Link key={label} to={to} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 py-1.5">
                            <Icon className="w-4 h-4 text-cyan-500" />{label}
                        </Link>
                    ))}

                    <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-1">
                        {simpleLinks.map(({ label, to }) => (
                            <Link key={label} to={to} onClick={() => setMobileOpen(false)}
                                className="text-sm font-medium text-gray-600 hover:text-cyan-600 py-1.5">
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-2">
                        <Link to="/jobseeker/login" className="text-sm font-medium text-gray-700">JobSeeker Login</Link>
                        <Link to="/jonseeker/register" className="text-sm font-medium text-gray-700">JobSeeker Register</Link>
                        <Link to="/employee/login" className="text-sm font-medium text-cyan-600">Employer Login</Link>
                        <Link to="/employee/register" className="text-sm font-medium text-cyan-600">Employer Register</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;