import React from 'react'
import logo from '../assets/logoo.jpeg'
import logo2 from "../assets/image copy 2.png";
import logo3 from "../assets/image copy 3.png";
import logo4 from "../assets/image copy 4.png";
import logo5 from "../assets/image copy 5.png";
import logo6 from "../assets/image copy 6.png";
import logo7 from "../assets/image copy 7.png";
import logo8 from "../assets/image copy 8.png";
import logo9 from "../assets/image copy 9.png";
import logo10 from "../assets/image copy 10.png";
const employerLogos = [
  { src: logo, alt: "Rojgar Bank" },
  { src: logo2, alt: "Company 2" },
  { src: logo3, alt: "Company 3" },
  { src: logo4, alt: "Company 4" },
  { src: logo5, alt: "Company 5" },
  { src: logo6, alt: "Company 6" },
  { src: logo7, alt: "Company 7" },
  { src: logo8, alt: "Company 8" },
  { src: logo9, alt: "Company 9" },
  { src: logo10, alt: "Company 10" },
]

const Topemployers = () => (
  <div className="w-full py-10 overflow-hidden bg-white">
    <h2 className="text-3xl font-bold text-center text-cyan-700 mb-10">
      Top Employers Hiring Now
    </h2>

    <div className="relative w-full overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {employerLogos.map((logo, index) => (
          <div key={`first-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-auto object-contain transition duration-300"
            />
          </div>
        ))}
        {employerLogos.map((logo, index) => (
          <div key={`second-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-auto object-contain transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Topemployers