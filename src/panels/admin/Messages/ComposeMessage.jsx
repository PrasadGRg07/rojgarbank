import { useState } from "react";
import { Send } from "lucide-react";

export default function ComposeMessage() {
  const [formData, setFormData] = useState({
    receiver: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Compose Message
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create and send a new message.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="space-y-5">
          {/* Receiver */}

          <div>
            <label className="mb-2 block text-sm font-medium">Receiver</label>

            <input
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={handleChange}
              placeholder="Enter receiver name"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* Subject */}

          <div>
            <label className="mb-2 block text-sm font-medium">Subject</label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* Message */}

          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              placeholder="Write your message..."
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Send size={18} />
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
