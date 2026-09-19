import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const Topemployers = () => {
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
    <div className="w-full py-10 overflow-hidden bg-white">
      <h2 className="text-3xl font-bold text-center text-cyan-700 mb-10">
        Top Employers Hiring Now
      </h2>

      <div className="relative w-full overflow-hidden">
        {employers.length > 0 ? (
          <div className="flex animate-marquee whitespace-nowrap">
            {logosToDisplay.map((logoItem, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
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
              <div key={`second-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
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
    </div>
  );
};

export default Topemployers;
