import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Mail, Bell, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { fetchNews } from "../api/news.js";

const categories = ["All", "AI", "Cybersecurity", "Tech"];

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      setIsLoading(true);
      try {
        const data = await fetchNews();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load news", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadNews();
  }, []);

  const filteredBlogs = category === "All" 
    ? blogs 
    : blogs.filter(b => b.category === category);

  return (
    <div className="min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Immersive Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[120px]" 
          />
        </div>

        <div className="container-shell relative">
          <Reveal>
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-6">
                <Sparkles size={14} className="text-brandprimary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Real-time Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Technical writing for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandprimary to-indigo-400">AI Era.</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mb-10">
                Deep dives into artificial intelligence, cybersecurity vulnerabilities, and the bleeding edge of technological advancement.
              </p>

              {/* Category filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`relative rounded-full px-6 py-2.5 text-sm font-extrabold transition-all duration-300 ${
                      category === item
                        ? "text-white"
                        : "bg-white text-slate-500 hover:text-slate-900 border border-slate-100 shadow-sm"
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {category === item && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-brandprimary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container-shell pb-24">
        <div className="relative">
          {isLoading && (
            <div className="absolute -top-12 right-0 flex items-center gap-2 text-brandprimary font-bold text-xs">
              <Loader2 className="animate-spin" size={14} />
              <span>Updating News Feed...</span>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Skeleton loader
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-soft flex flex-col h-[480px] animate-pulse">
                    <div className="aspect-[16/11] bg-slate-100" />
                    <div className="p-8 flex-1 flex flex-col gap-4">
                      <div className="h-6 bg-slate-100 rounded-full w-3/4" />
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-100 rounded-full w-full" />
                        <div className="h-3 bg-slate-100 rounded-full w-5/6" />
                      </div>
                      <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between">
                        <div className="h-3 bg-slate-100 rounded-full w-20" />
                        <div className="h-3 bg-slate-100 rounded-full w-20" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-soft h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 relative">
                      {/* Image Container */}
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute top-6 left-6">
                          <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-brandprimary shadow-xl border border-white/20">
                            {blog.category}
                          </div>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>5 min read</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brandprimary transition-colors leading-snug line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-brandprimary">
                              {blog.author.charAt(0)}
                            </div>
                            <span className="text-[11px] font-bold text-slate-600 truncate max-w-[100px]">
                              {blog.author}
                            </span>
                          </div>

                          {blog.url ? (
                            <a
                              href={blog.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-black text-brandprimary hover:text-indigo-700 transition-colors group/link"
                            >
                              READ ARTICLE <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                            </a>
                          ) : (
                            <Link
                              to={`/blog/${blog.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-black text-brandprimary hover:text-indigo-700 transition-colors group/link"
                            >
                              READ ARTICLE <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

      </section>

      {!isLoading && filteredBlogs.length === 0 && (
        <div className="pb-32 text-center">
          <p className="text-slate-500 font-medium text-lg">No articles found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
