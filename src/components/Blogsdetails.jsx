import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { getBlog } from "../lib/blogApi";

export default function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("Fetching blog slug:", slug);

        const data = await getBlog(slug);

        console.log("Blog Data:", data);

        setBlog(data);
      } catch (err) {
        console.error("Blog fetch failed:", err);
        console.error("Status:", err.response?.status);
        console.error("Response:", err.response?.data);
        console.error("Slug:", slug);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold">Blog not found</h1>
          <p className="mt-4 text-gray-500">
            Check the browser console (F12) for the API error.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">
        {blog.cover_image && (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-xl shadow mb-8"
          />
        )}

        <div className="mb-6">
          <span className="text-sm text-gray-500">
            {new Date(blog.created_at).toLocaleDateString()}
          </span>

          <h1 className="text-4xl font-bold mt-2">
            {blog.title}
          </h1>

          <p className="text-gray-500 mt-2">
            By {blog.author_name || "Admin"}
          </p>
        </div>

        <div className="prose max-w-none whitespace-pre-line">
          {blog.content}
        </div>
      </div>

      <Footer />
    </div>
  );
}