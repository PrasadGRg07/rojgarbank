import { useState } from "react";
import { Save, Share2 } from "lucide-react";

export default function SocialSettings() {
  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  });

  const handleChange = (e) => {
    setSocial({
      ...social,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(social);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-500 p-3">
            <Share2 size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Social Settings
            </h1>

            <p className="text-sm text-slate-500">
              Manage social media links and integrations.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Facebook</label>

            <input
              name="facebook"
              value={social.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Twitter / X
            </label>

            <input
              name="twitter"
              value={social.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">LinkedIn</label>

            <input
              name="linkedin"
              value={social.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Instagram</label>

            <input
              name="instagram"
              value={social.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">YouTube</label>

            <input
              name="youtube"
              value={social.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/"
              className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-white hover:bg-pink-700">
            <Save size={18} />
            Save Social Settings
          </button>
        </div>
      </form>
    </div>
  );
}
