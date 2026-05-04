import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, CheckCircle2, Clock, GraduationCap, 
  Linkedin, Mail, Link as LinkIcon, Calendar, 
  Check, ChevronDown, ChevronUp, BookOpen, 
  Target, Award, Users, ShieldCheck, Zap
} from "lucide-react";
import { useApi } from "../hooks/useApi.js";
import { demoCourses } from "../data/courses.js";
import Skeleton from "../components/Skeleton.jsx";
import Reveal from "../components/Reveal.jsx";

const FAQ_ITEMS = [
  { q: "Will my resume be shared once registration is handled correctly?", a: "Yes, once you complete the registration and eligibility check, our team will process your resume and share it with relevant hiring partners." },
  { q: "How many days is the course?", a: "The program spans 6 months of intensive training, followed by placement support." },
  { q: "What is the mode of this placement?", a: "Placement opportunities are a mix of on-site and remote roles, depending on the hiring company's requirements." },
  { q: "Is this course free or paid?", a: "This specific hiring program is a premium track with an upfront fee and a career-success guarantee." }
];

const ELIGIBILITY = [
  { label: "Graduating Year", value: "2024 Graduates", icon: Calendar },
  { label: "Degree", value: "B.Tech / B.E / MCA / M.Tech", icon: GraduationCap },
  { label: "Branch", value: "All Tech Branches", icon: Target },
  { label: "Marks", value: "Min 60% in 10th, 12th & Graduation", icon: ShieldCheck }
];

const OVERVIEW_FEATURES = [
  { title: "Language Support", desc: "Available in multiple languages for better understanding.", icon: Users },
  { title: "Positive Attitude", desc: "Special sessions on mindset and professional ethics.", icon: Zap },
  { title: "Industry Ready", desc: "Curriculum designed by top tech industry experts.", icon: Award },
  { title: "Soft Skills", desc: "Communication and presentation skills training.", icon: Target },
  { title: "Career Support", desc: "Resume building and LinkedIn optimization.", icon: Linkedin },
  { title: "Mock Interviews", desc: "Unlimited mock sessions with real interviewers.", icon: Users }
];

export default function CourseDetail() {
  const { slug } = useParams();
  const { data, loading: apiLoading, error: apiError } = useApi(`/api/courses/${slug}`, [slug]);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [openFaq, setOpenFaq] = useState(null);

  // Fallback to local data if API fails or is loading
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
      <section className="container-shell min-h-screen pt-32 pb-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800">Course Not Found</h2>
          <p className="mt-2 text-red-600">We couldn't find the course you're looking for. Please check the URL or return to the catalog.</p>
          <Link to="/courses" className="mt-6 btn-primary inline-flex">
            Back to Catalog
          </Link>
        </div>
      </section>
    );

  // Ensure syllabus exists
  const syllabus = course.syllabus || [
    "Introduction to the core concepts",
    "Hands-on practical training with real-world tools",
    "Advanced optimization and best practices",
    "Capstone project and final assessment"
  ];


  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-20">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        
        <div className="container-shell relative">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Link to="/courses" className="p-2 rounded-full bg-white border border-slate-200 hover:border-brandprimary/50 transition-colors shadow-sm">
                  <ArrowLeft size={18} className="text-slate-600" />
                </Link>
                <nav className="text-sm text-slate-500">
                  <span className="hover:text-brandprimary transition-colors cursor-pointer">Courses</span> / <span className="text-slate-900 font-medium">{course.title}</span>
                </nav>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">Share:</span>
                <div className="flex gap-2">
                  {[Linkedin, Mail, LinkIcon].map((Icon, i) => (
                    <button key={i} className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {course.title} <br className="hidden md:block" />
                <span className="text-brandprimary text-[0.8em] font-extrabold">- Exclusive for 2024 Graduates</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Master the essentials of {course.title.split(":")[1] || course.title} with {course.instructor || course.instructor_name}. This program is designed to bridge the gap between academic knowledge and industry requirements.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-4 text-lg">
                  Register Now
                </button>
                <button className="btn-secondary px-8 py-4 text-lg">
                  View Syllabus
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative group max-w-lg mx-auto lg:ml-auto lg:mr-0">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brandprimary/20 to-brandsecondary/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative glass border-slate-200/50 rounded-[2rem] overflow-hidden shadow-2xl">
                  <img 
                    src="/course_banner.png" 
                    alt="Course Preview" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                    <ul className="space-y-3">
                      {[
                        "Resume Linked to Top Companies",
                        "Industry-Led Training",
                        "Exclusive for 2024 Graduates",
                        "Job Placement Support"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white font-medium">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check size={12} className="text-white" strokeWidth={3} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <Reveal center>
            <div className="text-center mb-16">
              <span className="eyebrow">Requirement</span>
              <h2 className="section-title">Eligibility Parameters</h2>
              <p className="muted mt-4 max-w-2xl mx-auto">Make sure you meet these criteria before applying for the fast-track program.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ELIGIBILITY.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brandprimary/30 hover:bg-indigo-50/50 transition-all group h-full flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brandprimary mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{item.label}</h3>
                  <p className="text-slate-900 font-extrabold text-lg">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24 bg-slate-50">
        <div className="container-shell">
          <Reveal>
            <h2 className="text-3xl font-black text-slate-900 mb-12">Course Overview</h2>
            
            <div className="p-8 rounded-3xl bg-[#FFF9F2] border border-[#FFE4C4] mb-16 flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                <BookOpen size={24} />
              </div>
              <p className="text-slate-700 text-lg leading-relaxed italic">
                "Our hiring program is designed to bridge the gap between academic knowledge and industry requirements. We ensure every student is job-ready from day one."
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OVERVIEW_FEATURES.map((feat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-brandprimary/10 flex items-center justify-center text-brandprimary flex-shrink-0">
                      <feat.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{feat.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <Reveal center>
            <div className="text-center mb-16">
              <h2 className="section-title">Course Syllabus</h2>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="flex border-b border-slate-200 bg-slate-50">
              {["overview", "curriculum"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-5 text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === tab 
                      ? "bg-white text-brandprimary border-b-2 border-brandprimary" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12 bg-white min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === "curriculum" ? (
                  <motion.div
                    key="curriculum"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    {syllabus.map((topic, i) => (
                      <div key={i} className="group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-8 rounded-full bg-brandprimary text-white flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{topic}</h3>
                        </div>
                        <ul className="ml-12 space-y-3">
                          <li className="flex items-center gap-3 text-slate-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-brandprimary/40" />
                            Core concepts and foundational principles
                          </li>
                          <li className="flex items-center gap-3 text-slate-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-brandprimary/40" />
                            Hands-on practical exercises and mini-projects
                          </li>
                          <li className="flex items-center gap-3 text-slate-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-brandprimary/40" />
                            Industry best practices and optimization
                          </li>
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="prose prose-slate max-w-none"
                  >
                    <p className="text-slate-600 text-lg leading-relaxed">
                      This program is meticulously crafted for the class of 2024. It covers everything from core technical skills to soft skills required for top-tier tech roles.
                    </p>
                    <ul className="mt-6 space-y-4 text-slate-600">
                      <li className="flex gap-3">
                        <CheckCircle2 className="text-brandprimary flex-shrink-0" size={20} />
                        <span>Comprehensive coverage of {course.title}</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="text-brandprimary flex-shrink-0" size={20} />
                        <span>Real-world projects inspired by industry needs</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="text-brandprimary flex-shrink-0" size={20} />
                        <span>Personalized mentorship and doubt clearing sessions</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      <section className="py-24 bg-slate-50">
        <div className="container-shell">
          <Reveal center>
            <h2 className="section-title text-center mb-16">Upcoming Batches</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { type: "Pre-recorded", date: "May 15th, 2024", time: "Self-paced", slots: "120 Left" },
              { type: "Live Session", date: "June 1st, 2024", time: "7:00 PM IST", slots: "45 Left" }
            ].map((batch, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-brandprimary/10 text-brandprimary text-xs font-bold uppercase">
                        {batch.type}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 mt-3">{batch.date}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs font-bold uppercase">Status</p>
                      <p className="text-emerald-600 font-bold">{batch.slots}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-500 mb-8 pb-8 border-b border-slate-100">
                    <Clock size={18} />
                    <span>{batch.time}</span>
                  </div>

                  <button className={`w-full py-4 rounded-xl font-bold transition-all ${i === 0 ? "bg-brandprimary text-white" : "border-2 border-brandprimary text-brandprimary hover:bg-brandprimary hover:text-white"}`}>
                    {i === 0 ? "Buy Now" : "Register Now"}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <Reveal center>
            <h2 className="section-title text-center mb-16">Frequently Asked Questions</h2>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={20} className="text-brandprimary" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

