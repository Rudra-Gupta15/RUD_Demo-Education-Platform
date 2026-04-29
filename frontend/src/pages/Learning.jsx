import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../state/CartContext.jsx";
import Reveal from "../components/Reveal.jsx";
import { demoCourses } from "../data/courses.js";

const getCourseDescription = (course) => {
  if (course.topic === "Generative AI") {
    return "Master the fundamentals of Generative AI, prompt engineering, and LLM orchestration to build cutting-edge intelligent applications.";
  }
  if (course.topic === "AI & Machine Learning") {
    return "Deep dive into machine learning algorithms, deep neural networks, and computer vision to solve complex real-world problems.";
  }
  if (course.topic === "Data Science & Business Analytics") {
    return "Learn data analysis, predictive modeling, and data visualization techniques to drive data-informed business decisions.";
  }
  if (course.topic === "Project Management") {
    return "Master modern project management methodologies, Agile frameworks, and leadership skills to deliver successful projects.";
  }
  if (course.topic === "Cyber Security") {
    return "Acquire the skills to identify vulnerabilities, defend against cyber attacks, and secure digital infrastructure.";
  }
  return "Comprehensive guide to mastering the core concepts and practical applications in this field.";
};

const getCourseBullets = (course) => {
  if (course.topic === "Generative AI") {
    return [
      "Master prompt engineering and fine-tuning techniques",
      "Build autonomous AI agents and chatbots",
      "Integrate vector stores like Pinecone and Chroma"
    ];
  }
  if (course.topic === "AI & Machine Learning") {
    return [
      "Build and train deep neural networks with PyTorch",
      "Deploy models to production using MLOps best practices",
      "Implement computer vision and NLP pipelines"
    ];
  }
  if (course.topic === "Data Science & Business Analytics") {
    return [
      "Clean and analyze large datasets using Python & SQL",
      "Create interactive dashboards with Tableau & Power BI",
      "Build predictive models for business forecasting"
    ];
  }
  if (course.topic === "Project Management") {
    return [
      "Prepare for PMP and Scrum Master certifications",
      "Master Agile methodologies and JIRA workflows",
      "Manage project risks, budgets, and timelines effectively"
    ];
  }
  if (course.topic === "Cyber Security") {
    return [
      "Perform penetration testing and vulnerability assessments",
      "Secure cloud environments and network architectures",
      "Understand threat hunting and incident response"
    ];
  }
  return [
    "Master core concepts and advanced techniques",
    "Gain hands-on experience through practical projects",
    "Prepare for industry-recognized certifications"
  ];
};

export default function Learning() {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const topics = [...new Set(demoCourses.map(c => c.topic))];
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMouseEnter = (e, course) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCourse({
      ...course,
      rect: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredCourse(null);
  };

  return (
    <section className="container-shell min-h-screen py-16">
      <Reveal>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          What to learn next
        </h1>
      </Reveal>

      <div className="mt-12 space-y-12">
        {topics.map((topic) => (
          <div key={topic} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {topic}
            </h2>
            
            <div className="relative group">
              <div className="flex overflow-x-auto gap-5 pb-6 scrollbar-none snap-x snap-mandatory">
                {demoCourses
                  .filter((c) => c.topic === topic)
                  .map((course) => (
                    <div 
                      key={course.id} 
                      className="flex-shrink-0 w-[240px] flex flex-col group cursor-pointer snap-start relative"
                      onMouseEnter={(e) => handleMouseEnter(e, course)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => setExpandedCourse(course)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200/60 bg-slate-100">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="mt-2 flex flex-col flex-1">
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-brandprimary transition-colors min-h-[36px]">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {course.instructor}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-bold text-amber-700">{course.rating}</span>
                          <div className="flex items-center text-amber-500 text-xs">
                            {"★".repeat(Math.round(course.rating))}
                            <span className="text-slate-200">
                              {"★".repeat(5 - Math.round(course.rating))}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">({course.reviews.toLocaleString()})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-extrabold text-slate-900">{course.price}</span>
                          <span className="text-xs text-slate-400 line-through">{course.originalPrice}</span>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {course.badges.map((badge) => (
                            <span
                              key={badge}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                badge === "Premium"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-teal-100 text-teal-700"
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Popup */}
      <AnimatePresence>
        {hoveredCourse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 bg-white rounded-2xl shadow-2xl p-6 border border-slate-200 max-w-sm pointer-events-auto"
            style={{
              top: Math.max(16, Math.min(window.innerHeight - 450, hoveredCourse.rect.top)),
              left: hoveredCourse.rect.right + 16 > window.innerWidth - 400 
                ? hoveredCourse.rect.left - 400 
                : hoveredCourse.rect.right + 16,
            }}
            onMouseEnter={() => setHoveredCourse(hoveredCourse)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Arrow */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-slate-200 rotate-45 ${
                hoveredCourse.rect.right + 16 > window.innerWidth - 400 
                  ? "right-[-6px] rotate-[225deg] border-l-0 border-b-0 border-r border-t" 
                  : "left-[-6px]"
              }`} 
            />

            {/* Title */}
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
              {hoveredCourse.title}
            </h3>

            {/* Badges & Meta */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="bg-brandprimary text-white font-bold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1 shadow-sm">
                <ShieldCheck size={12} className="stroke-[2.5]" />
                Premium
              </span>
              <span className="text-emerald-600 font-extrabold">Updated April 2025</span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-xs font-bold text-slate-500">
              <span>36.5 total hours</span>
              <span>•</span>
              <span>Beginner Level</span>
              <span>•</span>
              <span>Subtitles</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs mt-3 leading-relaxed">
              {getCourseDescription(hoveredCourse)}
            </p>

            {/* Bullet Points */}
            <ul className="mt-4 space-y-3">
              {getCourseBullets(hoveredCourse).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="text-slate-900 mt-1 flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-slate-800 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 5" />
                    </svg>
                  </span>
                  <span className="leading-tight">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button 
                onClick={() => {
                  addToCart(hoveredCourse);
                }}
                className="flex-1 bg-brandprimary hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-md shadow-indigo-100"
              >
                Add to cart
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-brandprimary/20 text-brandprimary hover:bg-indigo-50 transition-all duration-200">
                <Heart size={18} className="text-brandprimary" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Course Detail Modal */}
      <AnimatePresence>
        {expandedCourse && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 md:p-12 overflow-y-auto animate-fade-in">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setExpandedCourse(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg transition"
              >
                &times;
              </button>

              {/* Left Side Content */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {expandedCourse.topic}
                </span>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-4 leading-tight">
                  {expandedCourse.title}
                </h2>

                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  {getCourseDescription(expandedCourse)}
                </p>

                <p className="text-xs text-slate-400 mt-2 font-medium">
                  Created by <span className="font-bold text-slate-700">{expandedCourse.instructor}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-4">
                  <span className="text-sm font-bold text-amber-700">{expandedCourse.rating}</span>
                  <div className="flex items-center text-amber-500 text-sm">
                    {"★".repeat(Math.round(expandedCourse.rating))}
                    <span className="text-slate-200">
                      {"★".repeat(5 - Math.round(expandedCourse.rating))}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">({expandedCourse.reviews.toLocaleString()} ratings)</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {expandedCourse.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                        badge === "Premium"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* What you'll learn */}
                <div className="mt-10 border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">What you'll learn</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getCourseBullets(expandedCourse).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-600">
                        <span className="text-brandprimary mt-0.5 flex-shrink-0">
                          <svg className="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 5" />
                          </svg>
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side Sticky Card */}
              <div className="w-full md:w-[340px] bg-slate-50 p-8 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm mb-6">
                    <img
                      src={expandedCourse.image}
                      alt={expandedCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition duration-200">
                        <svg className="w-6 h-6 text-slate-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-black text-slate-900">{expandedCourse.price}</span>
                    <span className="text-sm text-slate-400 line-through font-medium">{expandedCourse.originalPrice}</span>
                  </div>
                  
                  <p className="text-indigo-600 text-xs font-bold mb-6">
                    Special introductory price!
                  </p>
                </div>

                <div className="space-y-3 mt-auto">
                  <button 
                    onClick={() => {
                      addToCart(expandedCourse);
                      setExpandedCourse(null);
                    }}
                    className="w-full bg-brandprimary hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                  >
                    Add to cart
                  </button>
                  <button 
                    onClick={() => {
                      addToCart(expandedCourse);
                      setExpandedCourse(null);
                      navigate("/checkout");
                    }}
                    className="w-full border-2 border-slate-200 hover:border-slate-300 font-bold py-3 px-4 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition duration-200"
                  >
                    Buy now
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

