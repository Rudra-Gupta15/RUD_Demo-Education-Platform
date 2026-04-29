import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, GraduationCap, Lock, Tag } from "lucide-react";
import { useApi } from "../hooks/useApi.js";
import Skeleton from "../components/Skeleton.jsx";
import Reveal from "../components/Reveal.jsx";

const difficultyColor = {
  Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20"
};

export default function CourseDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useApi(`/api/courses/${slug}`, [slug]);
  const course = data?.course;

  if (loading)
    return (
      <section className="container-shell min-h-screen py-16">
        <Skeleton count={2} />
      </section>
    );

  if (error)
    return (
      <section className="container-shell min-h-screen py-16">
        <p className="rounded-md border border-red-400/30 bg-red-500/10 p-4 text-red-200">{error}</p>
      </section>
    );

  return (
    <section className="container-shell min-h-screen py-16">
      {/* Back */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan"
      >
        <ArrowLeft size={16} /> All courses
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Main content */}
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan border border-cyan/20">
                {course.category}
              </span>
              <span
                className={`rounded-md border px-3 py-1 text-xs font-bold ${difficultyColor[course.difficulty] || "text-slate-400 bg-white/5 border-white/10"}`}
              >
                {course.difficulty}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{course.description}</p>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Clock size={15} /> {course.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap size={15} /> {course.instructor_name}
              </span>
              <span className="inline-flex items-center gap-2">
                <Tag size={15} /> ${course.price}
              </span>
            </div>
          </Reveal>

          {/* Syllabus */}
          <div className="mt-12">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-white">Course Syllabus</h2>
              <p className="muted mt-2">What you'll learn across {course.duration}.</p>
            </Reveal>
            <div className="mt-6 grid gap-3">
              {course.syllabus.map((item, index) => (
                <Reveal key={item} delay={index * 0.06}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-xs font-bold text-cyan">
                      {index + 1}
                    </div>
                    <span className="text-slate-200">{item}</span>
                    <CheckCircle2 className="ml-auto shrink-0 text-cyan/60" size={18} />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Reveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-2xl p-6">
            <div className="animated-gradient absolute inset-x-0 top-0 h-[2px]" />

            {/* Instructor */}
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <GraduationCap size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Instructor</p>
                <h2 className="font-extrabold text-white">{course.instructor_name}</h2>
              </div>
            </div>
            <p className="muted mt-4">{course.instructor_bio}</p>

            {/* Price block */}
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-slate-400">Program fee</p>
              <p className="mt-1 text-5xl font-extrabold text-white">${course.price}</p>
              <p className="mt-2 text-xs text-slate-500">{course.duration} · {course.difficulty}</p>
            </div>

            {/* CTA */}
            <Link to="/auth" className="btn-primary mt-5 w-full">
              Enroll Now
            </Link>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock size={12} /> Secure checkout · cancel anytime
            </p>

            {/* What's included */}
            <ul className="mt-6 grid gap-2 text-sm text-slate-400">
              {[
                "Full syllabus access",
                "Live sessions + recordings",
                "Portfolio capstone project",
                "Certificate of completion"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="shrink-0 text-cyan" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
