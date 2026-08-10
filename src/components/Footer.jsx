import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logoo.jpeg"
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#0891b2] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div>
                <img
                  src={logo}
                  alt="logo"
                  className="w-20 h-20 rounded-full bg-white p-1 object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold">
                Rojgar
                <span className="text-cyan-400">Bank</span>
              </h2>
            </div>

            <p className="text-white leading-7 text-sm">
              Rojgar Bank is Nepal's trusted recruitment platform,
              connecting talented job seekers with reputable employers
              through professional HR and staffing solutions.
              We simplify hiring with reliable, transparent, and efficient
              recruitment services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                  <ArrowRight className="w-4 h-4" />
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about"
                  className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                  <ArrowRight className="w-4 h-4" />
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs" className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                  <ArrowRight className="w-4 h-4" />
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/contact" className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                  <ArrowRight className="w-4 h-4" />
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/training" className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                  <ArrowRight className="w-4 h-4" />
                  Training
                </Link>
              </li>

              <li>
                <Link
                  to="/services" className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                  <ArrowRight className="w-4 h-4" />
                  Services
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white mt-1" />
                <div>
                  <p className="text-white text-xs">Email</p>
                  <p className="text-white text-sm">
                    info@rojgarbank.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white mt-1" />
                <div>
                  <p className="text-white text-xs">Phone</p>
                  <p className="text-white text-sm">
                    +977-9800000000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white mt-1" />
                <div>
                  <p className="text-white text-xs">Address</p>
                  <p className="text-white text-sm">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-white text-sm text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">
              Rojgar Bank
            </span>
            . All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;