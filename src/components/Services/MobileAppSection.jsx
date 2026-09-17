import React from "react";
import appImg from "../../assets/mobile-app.png";

export default function MobileAppSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: App Image */}
          <div className="flex justify-center">
            <div className="flex w-full max-w-[320px] items-center justify-center overflow-hidden">
              <img src={appImg} alt="Mobile App" className="w-full h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center lg:text-left">
            <h2 className="mb-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Download Our Mobile App
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Get the best of Rojgarbank on your phone. Search jobs, track
              applications, and manage your hiring process on the go.
            </p>

            {/* App Store Buttons */}
            <div className="mb-12 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button className="flex items-center gap-3 rounded-lg bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800">
                <svg viewBox="0 0 384 512" className="h-6 w-6 fill-current">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-none text-slate-300">
                    Download on the
                  </div>
                  <div className="text-base font-semibold leading-none">
                    App Store
                  </div>
                </div>
              </button>

              <button className="flex items-center gap-3 rounded-lg bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800">
                <svg viewBox="0 0 512 512" className="h-6 w-6 fill-current">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-none text-slate-300">
                    GET IT ON
                  </div>
                  <div className="text-base font-semibold leading-none">
                    Google Play
                  </div>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 border-t border-slate-100 pt-8 lg:justify-start">
              <div>
                <div className="text-2xl font-bold text-blue-600">30K+</div>
                <div className="text-sm font-medium text-slate-500">
                  Downloads
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">16K+</div>
                <div className="text-sm font-medium text-slate-500">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm font-medium text-slate-500">
                  Active Jobs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
