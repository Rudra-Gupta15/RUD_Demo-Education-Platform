import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Mail, Bell, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { fetchNews } from "../api/news.js";

const categories = [
  "All",
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Cybersecurity / VAPT",
  "Data & Business Analytics",
  "Student Stories",
  "Career & Industry",
  "Company News"
];

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
    : blogs.filter(b => {
        if (category === "Deep Learning") return b.category === "Machine Learning";
        if (category === "Artificial Intelligence") return b.category === "Artificial Intelligence";
        if (category === "Cybersecurity / VAPT") return b.category === "Cybersecurity / VAPT";
        if (category === "Machine Learning") return b.category === "Machine Learning";
        return b.category === category;
      });

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* Immersive Header Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        
        <div className="container-shell relative">
          <Reveal>
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-6">
                <Sparkles size={12} className="text-[#1d4ed8]" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Industry Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-8">
                News & <span className="text-[#1d4ed8]">Blogs</span>
              </h1>

              {/* Category filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`relative rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                      category === item
                        ? "text-white"
                        : "bg-white text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm"
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {category === item && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#1d4ed8] rounded-full shadow-lg shadow-blue-200"
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
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#1d4ed8]" size={32} />
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {!isLoading && filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  {/* Outer Card Container - More visible with thicker border */}
                  <div className="bg-[#eef2f6] rounded-[2.75rem] p-5 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 border-2 border-slate-200 group/card">
                    
                    {/* Image Section - Now fits comfortably inside with more padding */}
                    <div className="relative h-52 z-10">
                      <div className="w-full h-full overflow-hidden rounded-[2rem] shadow-sm">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80";
                          }}
                        />
                      </div>
                      
                      {/* Date Badge - Precisely Positioned & No Clipping */}
                      <div className="absolute -top-3 right-6 z-30">
                        <div className="relative flex flex-col items-center">
                          <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center shadow-lg border border-slate-100">
                            <span className="text-base font-black text-slate-900 leading-none">
                              {new Date(blog.created_at).getDate()}
                            </span>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </div>
                          {/* Triangle Pointer */}
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mt-[-2px]" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Overlapping White Card */}
                    <div className="px-1 pb-1 -mt-10 relative z-20 flex-1 flex flex-col">
                      <div className="bg-white rounded-[2rem] p-6 shadow-xl flex-1 flex flex-col border border-slate-100/50">
                        <h3 className="text-base font-black text-[#1d4ed8] mb-3 leading-tight group-hover:text-blue-800 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-5 line-clamp-2">
                          {blog.excerpt || "Read more about this blog to explore detailed insights and updates."}
                        </p>

                        <div className="mt-auto flex justify-end">
                          {blog.url ? (
                            <a
                              href={blog.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#1d4ed8] hover:gap-2.5 transition-all group/link uppercase tracking-[0.15em]"
                            >
                              Read More <ArrowRight size={12} />
                            </a>
                          ) : (
                            <Link
                              to={`/blog/${blog.slug}`}
                              className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#1d4ed8] hover:gap-2.5 transition-all group/link uppercase tracking-[0.15em]"
                            >
                              Read More <ArrowRight size={12} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
