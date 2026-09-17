import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoo.jpeg";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1C75BC] pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={logo}
                alt="Rojgar Bank Logo"
                className="h-16 w-16 rounded-full bg-white object-contain p-1"
              />
              <h2 className="text-2xl font-bold">
                Rojgar<span className="text-cyan-300">Bank</span>
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-blue-100">
              Rojgar Bank is Nepal's trusted recruitment platform, connecting
              talented job seekers with reputable employers through professional
              HR and staffing solutions. We simplify hiring with reliable,
              transparent, and efficient recruitment services.
            </p>
          </div>

          {/* Jobseekers */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Jobseekers</h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li>
                <Link to="/jobseeker/login" className="transition hover:text-white">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/it" className="transition hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/services/counseling" className="transition hover:text-white">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Company</h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li>
                <Link to="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="transition hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Contact</h3>
            <ul className="space-y-5 text-sm text-blue-100">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0" size={18} />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 shrink-0" size={18} />
                <div className="flex flex-col">
                  <span>+977-9813040854</span>
                  <span>01-5913732 / 01-5912732</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0" size={18} />
                <span>prabesh@hamrojobs.com.np</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-blue-800 pt-8 md:flex-row">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Rojgar Bank. All Rights Reserved.
          </p>
          <p className="mt-4 text-sm text-blue-200 md:mt-0">
            Developed by softvistacreations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;