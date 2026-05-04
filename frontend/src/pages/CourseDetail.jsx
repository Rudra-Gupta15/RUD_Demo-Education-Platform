import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Clock, GraduationCap,
  Linkedin, Mail, Link as LinkIcon, Calendar,
  Check, ChevronDown, ChevronUp, BookOpen,
  Target, Award, Users, ShieldCheck, Zap,
  PlayCircle, Download, Share2, Star, Sparkles
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
  { label: "Degree", value: "B.Tech / MCA / M.Tech", icon: GraduationCap },
  { label: "Branch", value: "Computer Science / IT", icon: Target },
  { label: "Marks", value: "Min 60% Overall", icon: ShieldCheck }
];

const OVERVIEW_FEATURES = [
  { title: "Language Support", desc: "Available in multiple languages.", icon: Users },
  { title: "Industry Ready", desc: "Curriculum designed by top experts.", icon: Award },
  { title: "Career Support", desc: "Resume building and optimization.", icon: Linkedin }
];

export default function CourseDetail() {
  const { slug } = useParams();
  const { data, loading: apiLoading } = useApi(`/api/courses/${slug}`, [slug]);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [openFaq, setOpenFaq] = useState(null);

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
          <p className="mt-2 text-red-600">We couldn't find the course you're looking for.</p>
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

  const layoutVariant = course.id % 3;

  return (
    <div className={`relative min-h-screen ${layoutVariant === 2 ? 'bg-slate-50' : 'bg-white'}`}>

      {/* Header / Breadcrumbs */}
      <div className={`pt-32 pb-8 ${layoutVariant === 2 ? 'bg-slate-900 text-white' : 'bg-white border-b border-slate-100'}`}>
        <div className="container-shell flex items-center justify-between">
          <Reveal>
            <div className="flex items-center gap-3">
              <Link to="/courses" className={`p-2 rounded-full border transition-colors ${layoutVariant === 2 ? 'border-white/10 hover:bg-white/10' : 'border-slate-200 hover:border-blue-600'}`}>
                <ArrowLeft size={18} />
              </Link>
              <nav className="text-sm font-medium opacity-60">
                Courses / {course.title}
              </nav>
            </div>
          </Reveal>
          <div className="flex gap-2">
            {[Share2, LinkIcon].map((Icon, i) => (
              <button key={i} className={`p-2 rounded-lg border transition-colors ${layoutVariant === 2 ? 'border-white/10 hover:bg-white/10' : 'border-slate-200 hover:bg-slate-50'}`}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section Variants */}
      {layoutVariant === 0 && (
        <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
          <div className="container-shell relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest">Premium Program</span>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">{course.title}</h1>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-xl">Master the nuances of {course.topic} with {course.instructor}. A comprehensive track designed for career excellence.</p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className="btn-primary px-10 py-5">Register Now</button>
                    <button className="btn-secondary px-10 py-5">Syllabus</button>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl" />
                  <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl">
                    <img src={course.image} alt={course.title} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-8">
                      <ul className="space-y-3">
                        {["Resume Support", "Industry Training", "Placement Help"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-white text-sm font-bold">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={12} /></div>
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
      )}

      {layoutVariant === 1 && (
        <section className="relative pt-20 pb-32 overflow-hidden bg-white">
          <div className="container-shell relative">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <Reveal>
                <div className="relative lg:order-last">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
                      <Sparkles size={16} /> Elite Specialization
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">{course.title}</h1>
                    <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
                      <p className="text-indigo-900 font-medium leading-relaxed italic">"Transforming potential into performance through industry-first curriculum led by {course.instructor}."</p>
                    </div>
                    <div className="pt-6">
                      <button className="w-full sm:w-auto btn-primary px-12 py-6 text-xl shadow-lg shadow-blue-600/20">Secure Your Slot</button>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="relative">
                  <div className="absolute top-0 -left-12 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl" />
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-1">
                    <img src={course.image} alt={course.title} className="w-full aspect-square object-cover" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-xs font-black text-slate-900 shadow-sm border border-slate-200">
                      Top Rated Course
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {layoutVariant === 2 && (
        <section className="relative pt-20 pb-32 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          <div className="container-shell relative z-10">
            <Reveal center>
              <div className="text-center max-w-4xl mx-auto space-y-10">
                <div className="flex justify-center">
                  <div className="px-4 py-1 rounded-full border border-white/20 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em]">Full Access Pass</div>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">{course.title}</h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">Master the most in-demand skills in {course.topic} with {course.instructor}. Complete project-based learning.</p>
                <div className="relative max-w-2xl mx-auto pt-8">
                  <div className="absolute inset-0 bg-blue-600/30 blur-3xl rounded-full" />
                  <div className="relative rounded-[2.5rem] overflow-hidden border-[12px] border-white/5 shadow-3xl aspect-square">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex justify-center gap-6 pt-10">
                  <button className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all">Enroll Now</button>
                  <button className="text-white border border-white/20 px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/5 transition-all">Curriculum</button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Main Content Sections */}
      <section className={`py-32 ${layoutVariant === 2 ? 'bg-white' : 'bg-white border-t border-slate-50'}`}>
        <div className="container-shell">
          <div className={`grid lg:grid-cols-${layoutVariant === 2 ? '1' : '2'} gap-20`}>

            <div className="space-y-16">
              <Reveal>
                <h2 className="text-3xl font-black text-slate-900">Eligibility Criteria</h2>
                <div className="grid sm:grid-cols-2 gap-6 mt-10">
                  {ELIGIBILITY.map((item, i) => (
                    <div key={i} className={`p-8 rounded-3xl border transition-all ${layoutVariant === 2 ? 'bg-slate-50 border-slate-100 hover:border-blue-600' : 'bg-white border-slate-100 hover:shadow-xl'}`}>
                      <item.icon className="text-blue-600 mb-6" size={24} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-lg font-black text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={`p-10 rounded-[2.5rem] ${layoutVariant === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>
                  <h3 className="text-2xl font-black mb-8">What you'll get</h3>
                  <div className="space-y-6">
                    {OVERVIEW_FEATURES.map((feat, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><feat.icon size={20} /></div>
                        <div>
                          <p className="font-bold text-lg">{feat.title}</p>
                          <p className="opacity-60 text-sm">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="space-y-12">
              <Reveal>
                <div className="flex border-b border-slate-100">
                  {["curriculum", "faqs"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </Reveal>

              <AnimatePresence mode="wait">
                {activeTab === "curriculum" ? (
                  <motion.div
                    key="curriculum"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {syllabus.map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-6 group hover:bg-white hover:shadow-lg transition-all">
                        <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-blue-600 shadow-sm">{i + 1}</span>
                        <p className="font-bold text-slate-800">{item}</p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="faqs"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {FAQ_ITEMS.map((faq, i) => (
                      <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden">
                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center font-bold text-slate-800">
                          {faq.q} <ChevronDown size={18} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaq === i && <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{faq.a}</div>}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Reveal delay={0.4}>
                <div className="pt-10 border-t border-slate-100">
                  <div className="flex items-center gap-6 p-8 rounded-3xl bg-slate-50">
                    <img src={`https://i.pravatar.cc/100?u=${course.instructor}`} className="w-16 h-16 rounded-2xl object-cover" alt={course.instructor} />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instructor</p>
                      <p className="text-xl font-black text-slate-900">{course.instructor}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Cohorts Footer */}
      <section className={`py-32 ${layoutVariant === 1 ? 'bg-slate-50' : 'bg-slate-900'}`}>
        <div className="container-shell text-center">
          <Reveal center>
            <h2 className={`text-4xl font-black mb-16 ${layoutVariant === 1 ? 'text-slate-900' : 'text-white'}`}>Upcoming Cohorts</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map(i => (
              <div key={i} className={`p-10 rounded-[2.5rem] text-left border ${layoutVariant === 1 ? 'bg-white border-slate-100 shadow-xl' : 'bg-white/5 border-white/10 text-white'}`}>
                <div className="flex justify-between items-start mb-10">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase">Cohort {i}</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Starts On</p>
                    <p className="text-xl font-black">June {10 + i}, 2024</p>
                  </div>
                </div>
                <button className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${layoutVariant === 1 ? 'bg-slate-900 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20'}`}>Reserve My Spot</button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
