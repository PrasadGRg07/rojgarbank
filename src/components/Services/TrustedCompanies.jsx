import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function TrustedCompanies() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await api.get("/jobseeker/employers/public/");
        if (response.data && response.data.length > 0) {
          setEmployers(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch employers:", error);
      }
    };
    fetchEmployers();
  }, []);

  const logosToDisplay = employers.map(emp => ({
    src: emp.profile_picture,
    alt: emp.company_name || "Company Logo",
    link: `/employer/${emp.id}`
  }));

  return (
    <section className="bg-[#F8FAFC] py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-800">
            Join Our 30000+ happy customers
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        {employers.length > 0 ? (
          <div className="flex animate-marquee whitespace-nowrap">
            {logosToDisplay.map((logoItem, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <Link to={logoItem.link}>
                  <img
                    src={logoItem.src}
                    alt={logoItem.alt}
                    className="h-16 w-auto object-contain transition duration-300 cursor-pointer hover:opacity-80"
                  />
                </Link>
              </div>
            ))}
            {logosToDisplay.map((logoItem, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <Link to={logoItem.link}>
                  <img
                    src={logoItem.src}
                    alt={logoItem.alt}
                    className="h-16 w-auto object-contain transition duration-300 cursor-pointer hover:opacity-80"
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Please wait loading...</p>
        )}
      </div>
    </section>
  );
}
