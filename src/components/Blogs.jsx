import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";

import { getBlogs } from "../lib/blogApi";

const Blogs = () => {
  const blogSectionRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
          const data = await getBlogs();
          console.log("Blogs API:", data);
          setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="border-b border-gray-100 bg-slate-50/50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Your Career, <span className="text-cyan-600">Sorted.</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Practical resume tips, interview advice, and job search guides to
            help you move forward with confidence.
          </p>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() =>
                blogSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="px-5 py-3 sm:px-7 sm:py-5 bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Explore Blogs
            </Button>
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section
        ref={blogSectionRef}
        className="bg-white rounded-2xl border border-gray-200 shadow-md p-4 sm:p-6 my-6 sm:my-10 mx-4 sm:mx-6 lg:mx-10"
      >
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">
            Latest Articles
          </h2>
        </div>

        {currentBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No blogs available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content.slice(0, 120)}...
                  </p>

                        <Link
                            to={`/blogs/${blog.slug}`}
                            className="text-cyan-600 hover:text-cyan-800 font-medium"
                        >
                            Read More
                            <ArrowRight className="inline-block w-4 h-4 ml-1" />
                        </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            ← Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded ${
                currentPage === index + 1
                  ? "bg-cyan-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Blogs;