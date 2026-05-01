import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Reveal from "../components/Reveal.jsx";

const categories = ["All", "AI", "Cybersecurity", "Tech"];

const demoBlogs = [
  {
    id: 1,
    title: "Understanding Prompt Injection: The New Security Threat",
    excerpt: "How attackers are manipulating LLMs through prompt engineering, and what developers can do to secure their apps.",
    category: "Cybersecurity",
    read_time: "5 min",
    slug: "prompt-injection-security",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 2,
    title: "The Rise of Autonomous AI Agents in Software Engineering",
    excerpt: "Exploring the capabilities and limits of tools like Devin and open-source alternatives for everyday coding tasks.",
    category: "AI",
    read_time: "8 min",
    slug: "autonomous-ai-agents",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 3,
    title: "Essential MLOps Tools for Data Teams in 2026",
    excerpt: "A comprehensive review of the best tools for versioning models, monitoring performance, and automating deployments.",
    category: "Tech",
    read_time: "6 min",
    slug: "essential-mlops-tools",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 4,
    title: "Building Zero Trust Infrastructure from Scratch",
    excerpt: "A practical guide to deploying network microsegmentation and strong identity controls using Kubernetes and Istio.",
    category: "Cybersecurity",
    read_time: "12 min",
    slug: "zero-trust-infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 5,
    title: "Getting Started with Vector Databases for Search",
    excerpt: "Comparing Pinecone, Chroma, and Qdrant for semantic search and Retrieval-Augmented Generation (RAG).",
    category: "AI",
    read_time: "7 min",
    slug: "vector-databases-guide",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400&q=80"
  }
];

export default function Blog() {
  const [category, setCategory] = useState("All");

  const filteredBlogs = category === "All" 
    ? demoBlogs 
    : demoBlogs.filter(b => b.category === category);

  return (
    <section className="container-shell min-h-screen pt-32 pb-16">
      <Reveal>
        <p className="eyebrow">Articles</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mt-3 leading-tight">
          Technical writing for AI, security, and the teams building both.
        </h1>
      </Reveal>

      {/* Category filters */}
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            id={`blog-filter-${item.toLowerCase()}`}
            className={`rounded-xl px-5 py-2 text-sm font-extrabold transition-all duration-200 ${
              category === item
                ? "bg-brandprimary text-white shadow-soft"
                : "border border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-soft"
            }`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <Reveal key={blog.id} delay={index * 0.05}>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft flex flex-col h-full group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-brandprimary shadow-sm">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-brandprimary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>{blog.read_time} read</span>
                  <Link
                    className="inline-flex items-center gap-1.5 text-brandprimary group/link hover:text-indigo-700 transition-colors"
                    to={`/blog/${blog.slug}`}
                  >
                    Read article <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
