import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, GraduationCap, Linkedin, Mail,
  Check, ChevronDown, BookOpen, Award, Users,
  ShieldCheck, Zap, UserCheck, Briefcase, Search,
  BarChart2, Database, MessageSquare, Rocket, Shield,
  FileText, Server, CheckCircle2, Code,
  Share2, Link as LinkIcon, Star, Sparkles,
  ShoppingCart, ArrowRight, PlayCircle
} from "lucide-react";
import { useApi } from "../hooks/useApi.js";
import { useCart } from "../state/CartContext.jsx";
import { demoCourses } from "../data/courses.js";
import { getCourseDetail } from "../data/courseDetails.js";
import Skeleton from "../components/Skeleton.jsx";
import Reveal from "../components/Reveal.jsx";
import SEO from "../components/SEO.jsx";

/* Map icon string → Lucide component */
const ICON_MAP = {
  Code, Database, Rocket, BarChart2, Briefcase, UserCheck,
  Zap, BookOpen, Search, MessageSquare, Shield, Award,
  FileText, Server, CheckCircle2, Users,
};

function FeatureIcon({ name }) {
  const Icon = ICON_MAP[name] || Zap;
  return <Icon size={18} />;
}

const FAQ_FALLBACK = [
  { q: "Will my resume be shared once registration is complete?", a: "Yes — our team shares your resume with relevant hiring partners after completing eligibility checks." },
  { q: "What is the mode of placement?", a: "A mix of on-site and remote roles depending on the hiring company." },
  { q: "Is there an age limit?", a: "Fresh graduates from the Class of 2024/2025 are prioritised, but talented candidates from other batches are welcome." },
];

export default function CourseDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, loading: apiLoading } = useApi(`/api/courses/${slug}`, [slug]);
  const { addToCart, cartItems } = useCart();

  const [activeTab, setActiveTab] = useState("curriculum");
  const [openFaq, setOpenFaq] = useState(null);
  const [added, setAdded] = useState(false);

  /* ── Data resolution ── */
  const course = useMemo(() => {
    if (data?.course) return data.course;
    return demoCourses.find(c => c.slug === slug);
  }, [data, slug]);

  /* All editable content comes from the config file */
  const detail = useMemo(() => getCourseDetail(slug), [slug]);

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

  const isInCart = cartItems.some(item => item.slug === course.slug || item.id === course.id);
  const faqs = detail.faqs?.length ? detail.faqs : FAQ_FALLBACK;

  const handleCartAction = () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(course);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title={`${course.title} | ${detail.tagline}`} 
        description={detail.fullDescription}
        keywords={`${course.title}, ${course.topic}, ${detail.instructor.name}, ${detail.meta.level} course`}
      />

      {/* ── Breadcrumb bar ── */}
      <div className="bg-white border-b border-slate-100 pt-24 pb-3 sticky top-0 z-40 shadow-sm">
        <div className="container-shell flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-bold transition-colors"
          >
            <ArrowLeft size={15} /> All Courses
          </button>

        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-28 bg-white border-b border-slate-100">
        <div className="container-shell">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-widest">
                {detail.tagline}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.15]">
                {course.title}
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                {detail.fullDescription}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-5 py-2">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-500 fill-amber-500" size={16} />
                  <span className="font-bold text-sm">{course.rating}</span>
                  <span className="text-slate-400 text-xs">({course.reviews} reviews)</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Users size={15} />
                  <span className="font-bold">{detail.meta.students} Students</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Clock size={15} />
                  <span className="font-bold">{detail.meta.duration}</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <GraduationCap size={15} />
                  <span className="font-bold">{detail.meta.level}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Updated <span className="text-slate-600 font-bold">{detail.meta.updated}</span>
                {" · "}By <span className="text-slate-600 font-bold">{detail.instructor.name}</span>
              </p>

              {/* CTA */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleCartAction}
                  className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-sm ${
                    isInCart
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-900 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isInCart ? (
                    <><ArrowRight size={17} /> Go to Cart</>
                  ) : (
                    <><ShoppingCart size={17} /> {added ? "Added!" : "Add to Cart"}</>
                  )}
                </button>
                <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm transition-all">
                  Download Syllabus
                </button>
              </div>
            </div>

            {/* Right — Hero image card */}
            <div className="w-full">
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-lg aspect-square">
                <img
                  src={course.image}
                  alt={course.title}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 flex flex-col justify-end gap-3">
                  {detail.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-400 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-emerald-400" strokeWidth={3.5} />
                      </div>
                      <span className="text-white text-sm font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price card below image */}
              <div className="mt-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    {course.price === "TBC" ? "₹849" : course.price}
                  </span>
                  <span className="text-sm text-slate-300 line-through font-medium">
                    {course.originalPrice === "TBC" ? "₹3,499" : course.originalPrice}
                  </span>
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wide">
                  Special Price
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      {detail.features?.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-shell">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10">What's Included</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {detail.features.map((feat, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <FeatureIcon name={feat.icon} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{feat.title}</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Overview + Mindmap ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Course Overview</h2>
                <div className="p-6 bg-white border border-slate-200 border-l-4 border-l-blue-600 rounded-r-xl flex gap-4">
                  <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-slate-700 text-[15px] leading-relaxed italic">
                    "{detail.fullDescription}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Duration", value: detail.meta.duration, icon: Clock },
                  { label: "Level", value: detail.meta.level, icon: BarChart2 },
                  { label: "Students", value: detail.meta.students, icon: Users },
                  { label: "Updated", value: detail.meta.updated, icon: CheckCircle2 },
                ].map((m, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <m.icon size={15} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{m.label}</p>
                      <p className="text-sm font-bold text-slate-900">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mindmap */}
            <div className="relative group">
              <div className="relative rounded-xl border border-slate-200 shadow-sm overflow-hidden aspect-[4/3] bg-white">
                <img
                  src={detail.mindmapImage}
                  alt="Course Roadmap"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"; }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5">
                  <Sparkles size={12} className="text-blue-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Curated Roadmap</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Learning Journey ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container-shell">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 text-center">Your Learning Journey</h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {detail.learningJourney.map((step, i) => (
              <div key={i} className="flex flex-col p-6 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 text-[15px]">{step.title}</h3>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-grow">{step.desc}</p>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-100 bg-slate-50 mt-auto">
                  <img
                    src={step.img}
                    alt={step.title}
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80"; }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Content & Outcomes ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container-shell">
          
          {/* Curriculum */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center">Course Content</h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8 md:p-10">
              <div className="space-y-6">
                {detail.syllabus.map((mod, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {i !== detail.syllabus.length - 1 && (
                        <div className="w-px h-full bg-slate-100 my-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="text-base font-black text-slate-900 mb-3 mt-2">{mod.module}</h3>
                      <ul className="space-y-2.5">
                        {mod.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detail.outcomes.map((out, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-emerald-600" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] font-medium text-slate-700 leading-relaxed">{out}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── VAPT Framework (security courses only) ── */}
      {detail.isVapt && (
        <section className="py-24 bg-slate-900 text-white">
          <div className="container-shell">
            <Reveal>
              <div className="flex items-center gap-4 mb-6 text-blue-400">
                <div className="w-10 h-px bg-current" />
                <span className="text-[11px] font-black tracking-[0.3em] uppercase">Professional Standard</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-12">
                The <span className="italic text-blue-400">VAPT</span> Framework
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Networking", desc: "Architecture and structural vulnerability assessment." },
                { title: "Digital Forensics", desc: "Evidence preservation and incident recovery." },
                { title: "Compliance", desc: "Regulatory alignment and formal audit frameworks." },
                { title: "Penetration Testing", desc: "Ethical exploitation to uncover vulnerabilities." },
                { title: "Threat Analysis", desc: "Intelligence-driven identification of emerging threats." },
                { title: "Security Audits", desc: "Full evaluation of organizational security postures." },
              ].map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-colors group">
                    <h3 className="text-base font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{s.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Instructor ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container-shell">
          <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-3 bg-blue-100/60 rounded-2xl blur-xl" />
              <div className="relative w-28 h-28 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center text-slate-200">
                <Users size={48} strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-3">
                Your Instructor
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{detail.instructor.name}</h3>
              <p className="text-xs text-slate-400 font-bold mb-4">{detail.instructor.title}</p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{detail.instructor.bio}</p>
              <div className="flex justify-center md:justify-start gap-3 mt-5">
                {detail.instructor.socials?.linkedin && (
                  <a href={detail.instructor.socials.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Linkedin size={18} />
                  </a>
                )}
                {detail.instructor.socials?.mail && (
                  <a href={`mailto:${detail.instructor.socials.mail}`} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Mail size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container-shell">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {faq.q}
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pt-3 text-xs text-slate-500 leading-relaxed font-medium border-t border-slate-100">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-shell text-center">
          <h2 className="text-2xl font-black mb-3">Ready to take the next step?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm font-medium">
            Join the upcoming cohort. Limited seats available for direct placement support.
          </p>
          <button
            onClick={handleCartAction}
            className={`inline-flex items-center gap-3 px-10 py-4 rounded-xl font-black text-base transition-all shadow-xl active:scale-95 ${
              isInCart
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isInCart ? "Go to My Cart" : added ? "Successfully Added!" : "Add to My Cart"}
            {isInCart && <ArrowRight size={18} />}
          </button>
        </div>
      </section>

    </div>
  );
}