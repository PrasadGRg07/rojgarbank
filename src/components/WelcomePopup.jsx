import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Bell, Zap } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/logoo.jpeg";

const features = [
  {
    icon: FileText,
    color: "text-cyan-600 bg-cyan-50",
    title: "Automatic CV Builder",
    desc: "Generate a professional, ATS-friendly CV in minutes",
  },
  {
    icon: Bell,
    color: "text-purple-600 bg-purple-50",
    title: "Instant Job Alerts",
    desc: "Get notified the moment a matching job is posted",
  },
  {
    icon: Zap,
    color: "text-yellow-600 bg-yellow-50",
    title: "One-Click Apply",
    desc: "Apply to hundreds of verified jobs with a single click",
  },
];

const STORAGE_KEY = "rojgar_welcome_seen";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 sm:right-6 sm:top-6"
            >
              <X size={24} />
            </button>

            <div className="mb-6 flex flex-col items-center">
              <img
                src={logo}
                alt="RogjarBank Logo"
                className="h-24 w-24 rounded-full border-4 border-cyan-100 bg-white object-contain p-1 shadow-lg sm:h-28 sm:w-28"
              />
              <h2 className="mt-5 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
                Welcome to{" "}
                <span className="text-cyan-600">RogjarBank</span>
              </h2>
            </div>

            <p className="text-center text-base text-gray-500">
              Your career, sorted. Here's what you can do:
            </p>

            <div className="mt-7 space-y-4">
              {features.map(({ icon: Icon, color, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-5 rounded-2xl bg-slate-50 p-5"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${color}`}
                  >
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              And much more — explore to discover everything.
            </p>

            <Button
              onClick={() => setOpen(false)}
              className="mt-7 w-full rounded-xl bg-cyan-600 py-4 text-lg text-white hover:bg-cyan-700"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;