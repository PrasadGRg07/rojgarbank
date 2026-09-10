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
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="mb-5 flex flex-col items-center">
              <img
                src={logo}
                alt="RogjarBank Logo"
                className="h-20 w-20 rounded-full border-4 border-cyan-100 bg-white object-contain p-1 shadow-lg"
              />
              <h2 className="mt-4 text-center text-xl font-bold text-slate-900 sm:text-2xl">
                Welcome to{" "}
                <span className="text-cyan-600">RogjarBank</span>
              </h2>
            </div>

            <p className="text-center text-sm text-gray-500">
              Your career, sorted. Here's what you can do:
            </p>

            <div className="mt-6 space-y-3">
              {features.map(({ icon: Icon, color, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-xs text-gray-400">
              And much more — explore to discover everything.
            </p>

            <Button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-xl bg-cyan-600 py-3 text-white hover:bg-cyan-700"
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