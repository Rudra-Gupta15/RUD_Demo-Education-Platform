import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, CheckCircle2, Clock, GraduationCap, 
  Linkedin, Mail, Link as LinkIcon, Calendar, 
  Check, ChevronDown, ChevronUp, BookOpen, 
  Target, Award, Users, ShieldCheck, Zap,
  PlayCircle, Download, Share2, Star, Sparkles,
  Search, Shield, Video, UserCheck, Briefcase, Rocket,
  ShoppingCart, ArrowRight
} from "lucide-react";
import { useApi } from "../hooks/useApi.js";
import { useCart } from "../state/CartContext.jsx";
import { demoCourses } from "../data/courses.js";
import Skeleton from "../components/Skeleton.jsx";
import Reveal from "../components/Reveal.jsx";

const FAQ_ITEMS = [
  { q: "Will my resume be shared once registration is handled correctly?", a: "Yes, once you complete the registration and eligibility check, our team will process your resume and share it with relevant hiring partners." },
  { q: "How many days is the course?", a: "The program spans 6 months of intensive training, followed by placement support." },
  { q: "What is the mode of this placement?", a: "Placement opportunities are a mix of on-site and remote roles, depending on the hiring company's requirements." },
  { q: "Is this course free or paid?", a: "This specific hiring program is a premium track with an upfront fee and a career-success guarantee." },
  { q: "Is there any age limit to apply?", a: "Generally, we look for fresh graduates from the Class of 2024, but talented individuals from other batches are welcome to apply." },
  { q: "What is the programming language taught in the course?", a: "The course focuses on Python and JavaScript, the two most in-demand languages in the industry today." }
];

const PROGRAM_FEATURES = [
  { title: "Language Support", desc: "Available in multiple languages for better understanding.", icon: Users },
  { title: "Industry Ready Training", desc: "Curriculum designed by top tech industry experts.", icon: Award },
  { title: "Soft Skills", desc: "Communication and presentation skills training.", icon: Search },
  { title: "Positive Attitude", desc: "Special sessions on mindset and professional ethics.", icon: Zap },
  { title: "Career Support", desc: "Resume building and LinkedIn optimization.", icon: Briefcase },
  { title: "Mock Interviews", desc: "Unlimited mock sessions with real interviewers.", icon: UserCheck }
];

export default function CourseDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, loading: apiLoading } = useApi(`/api/courses/${slug}`, [slug]);
  const { addToCart, cartItems } = useCart();
  const [activeTab, setActiveTab] = useState("curriculum");
  const [openFaq, setOpenFaq] = useState(null);
  const [added, setAdded] = useState(false);

  const course = useMemo(() => {
    if (data?.course) return data.course;
    return demoCourses.find(c => c.slug === slug);
  }, [data, slug]);

  const loading = apiLoading && !course;

  if (loading)
    return (
      <section className="container-shell min-h-screen pt-32 pb-16">
        <Skeleton count={3} />
      </section>
    );

  if (!course)
    return (
      <section className="container-shell min-h-screen pt-32 pb-16 text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h2 className="text-2xl font-bold text-red-800">Course Not Found</h2>
          <Link to="/courses" className="mt-6 btn-primary inline-flex">Back to Catalog</Link>
        </div>
      </section>
    );

  const syllabus = course.syllabus || [
    "Introduction to core concepts",
    "Hands-on practical training",
    "Advanced optimization",
    "Capstone project assessment"
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      
      {/* Top Banner / Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 pt-24 pb-4">
        <div className="container-shell">
          <div className="flex items-center justify-between text-sm">
            <Link to="/courses" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
              <ArrowLeft size={16} /> All Courses
            </Link>
            <div className="flex items-center gap-4 text-slate-400">
              <Share2 size={16} className="cursor-pointer hover:text-slate-600" />
              <Mail size={16} className="cursor-pointer hover:text-slate-600" />
              <LinkIcon size={16} className="cursor-pointer hover:text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section: Professional & Grounded */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container-shell">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded uppercase tracking-wider">
                Limited Enrollment
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
                Master {course.topic} through intensive training led by {course.instructor}. 
                This program is specifically designed to bridge the gap between academic knowledge and industry requirements for 2024 graduates.
              </p>
              
              <div className="flex items-center gap-6 py-4">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-500 fill-amber-500" size={18} />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-slate-400 text-sm">({course.reviews} reviews)</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2 text-slate-600">
                  <Users size={18} />
                  <span className="font-bold">1,200+ Students</span>
                </div>
              </div>

              {(() => {
                const isInCart = cartItems.some(item => item.slug === course.slug || item.id === course.id);

                return (
                  <div className="pt-4 flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      if (isInCart) {
                        navigate("/cart");
                      } else {
                        addToCart(course);
                        setAdded(true);
                        setTimeout(() => setAdded(false), 2000);
                      }
                    }}
                    className={`${isInCart ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-10 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-3`}
                  >
                    {isInCart ? (
                      <>Go to Cart <ArrowLeft className="rotate-180" size={20} /></>
                    ) : (
                      <>{added ? "Added!" : "Add to Cart"} <ShoppingCart size={20} /></>
                    )}
                  </button>
                  <button className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 px-10 py-4 rounded-lg font-bold text-lg transition-all">
                    Download Syllabus
                  </button>
                </div>
              );
            })()}
            </div>

            <div className="space-y-8 pt-12">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-slate-200">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                    <ul className="space-y-4">
                      {[
                        "Resume Linked to Top Companies",
                        "Industry-Led Training",
                        "Job Placement Support"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white text-base font-black tracking-tight">
                          <div className="w-6 h-6 rounded-full bg-transparent border-2 border-emerald-500 flex items-center justify-center shrink-0">
                            <Check size={12} className="text-emerald-500" strokeWidth={4} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </section>

      {/* Course Overview & Mindmap */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Info & Features */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Course Overview</h2>
                <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/30 flex gap-6 italic">
                  <BookOpen className="text-blue-600 shrink-0" size={28} />
                  <p className="text-slate-700 text-lg leading-relaxed font-medium">
                    "This specialization focus on the practical implementation of {course.topic} concepts. 
                    We move past theory to ensure you can build enterprise-grade solutions that meet modern security and performance standards."
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                {PROGRAM_FEATURES.map((feat, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <feat.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 mb-1 text-sm">{feat.title}</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Professional Mindmap Asset */}
            <div className="relative group flex items-center justify-center">
              <div className="relative bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden w-full max-w-[700px] aspect-square">
                <img 
                  src={course.topic?.toLowerCase().includes('cyber') || course.isVapt ? "/assets/vapt_mindmap.png" : "/assets/ai_mindmap.png"} 
                  alt={course.topic?.toLowerCase().includes('cyber') || course.isVapt ? "Cybersecurity Mindmap" : "AI Specialization Mindmap"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Decorative Overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent pointer-events-none" />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20 flex items-center gap-2">
                  <Sparkles size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Curated Roadmap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey: Series of 3 Images */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="container-shell">
          <div className="mt-8">
            <h2 className="text-2xl font-black text-slate-900 mb-12 text-center">Your Learning Journey</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Phase 1: Foundation", 
                  desc: "Master the fundamental principles and logic required for high-level specialization.", 
                  img: "/assets/foundation.png"
                },
                { 
                  title: "Phase 2: Build", 
                  desc: "Apply your knowledge in real-world scenarios through intensive project-based labs.", 
                  img: "/assets/build.png"
                },
                { 
                  title: "Phase 3: Career", 
                  desc: "Prepare for placement with mock interviews, resume linked to top companies, and direct referrals.", 
                  img: "/assets/career.png"
                }
              ].map((step, i) => (
                <div key={i} className="group">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                    <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center font-black text-xs text-blue-600">
                      {i + 1}
                    </div>
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus & Curriculum */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-shell">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-10 text-center">Course Content</h2>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200">
                {["curriculum", "outcomes"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {activeTab === "curriculum" ? (
                    <motion.div key="curriculum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      {syllabus.map((item, i) => (
                        <div key={i} className="flex gap-6">
                          <span className="font-black text-slate-300 text-2xl">0{i + 1}</span>
                          <div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">{item}</h3>
                            <ul className="space-y-2">
                              {["In-depth exploration", "Practical lab session", "Industry-aligned assessment"].map((li, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                  <div className="w-1 h-1 rounded-full bg-slate-300" /> {li}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div key="outcomes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-slate max-w-none">
                      <p className="font-medium text-slate-600">By the end of this course, you will be able to:</p>
                      <ul className="mt-4 space-y-3">
                        {(course.outcomes || ["Apply advanced logic to complex problems", "Build secure and scalable architectures"]).map((out, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                            <Check className="text-blue-600" size={18} /> {out}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Optional VAPT Framework Section (Only for Security Courses) ── */}
      {course.isVapt && (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="container-shell relative z-10">
            <Reveal>
              <div className="flex items-center gap-6 mb-8 text-blue-400">
                <div className="w-12 h-[1px] bg-current" />
                <span className="text-xs font-['Space_Mono'] tracking-[0.3em] uppercase">Professional Standard</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-light tracking-tight mb-12">
                The <span className="font-serif italic text-blue-400">VAPT</span> Operating Framework
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Networking", desc: "Foundational security layer covering architecture and structural vulnerability." },
                { title: "Digital Forensics", desc: "Investigative discipline for evidence preservation and incident recovery." },
                { title: "Compliance", desc: "Governance layer ensuring regulatory alignment and formal audits." },
                { title: "Penetration Testing", desc: "Ethical exploitation to expose vulnerabilities before malicious actors find them." },
                { title: "Threat Analysis", desc: "Intelligence-driven identification and prioritization of emerging threats." },
                { title: "Security Audits", desc: "Formal evaluation of entire organizational security postures." }
              ].map((s, idx) => (
                <Reveal key={s.title} delay={idx * 0.05}>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                    <h3 className="text-xl font-light mb-4 text-white group-hover:text-blue-400 transition-colors">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Your Instructor */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <div className="max-w-4xl mx-auto p-10 md:p-16 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
            <div className="relative shrink-0">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-2xl" />
              <img src={`https://i.pravatar.cc/200?u=${course.instructor}`} className="relative w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white" alt={course.instructor} />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">Expert Instructor</span>
              <h3 className="text-4xl font-black text-slate-900 mb-4">{course.instructor}</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                With over 12 years of hands-on experience in {course.topic}, {course.instructor} is a recognized leader in the engineering community. Having mentored 5,000+ students globally, their teaching philosophy focuses on practical, industrial-scale application rather than just theory.
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-8">
                <Linkedin size={20} className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
                <Mail size={20} className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container-shell">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {faq.q} <ChevronDown size={18} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <div className="px-6 pb-6 text-slate-500 text-sm font-medium leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container-shell text-center">
          <h2 className="text-3xl font-black mb-6">Ready to take the next step?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
            Join the upcoming cohort starting June 1st, 2024. Limited seats available for direct placement support.
          </p>
          {(() => {
            const isInCart = cartItems.some(item => item.slug === course.slug || item.id === course.id);
            return (
              <button 
                onClick={() => {
                  if (isInCart) {
                    navigate("/cart");
                  } else {
                    addToCart(course);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  }
                }}
                className={`${isInCart ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-12 py-5 rounded-lg font-black text-xl transition-all shadow-xl flex items-center gap-3 mx-auto`}
              >
                {isInCart ? "Go to My Cart" : (added ? "Successfully Added" : "Add to My Cart")}
                <ArrowRight className={isInCart ? "" : "hidden"} size={20} />
              </button>
            );
          })()}
        </div>
      </section>

    </div>
  );
}
