import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";

const glitchVariants = {
  animate: {
    x: [0, -2, 2, -1, 1, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: { duration: 0.4, repeat: Infinity, repeatDelay: 3 }
  }
};

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-screen place-items-center py-16 text-center">
      <div className="relative">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-96 w-96 rounded-full bg-cyan/10 blur-3xl" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-64 w-64 rounded-full bg-plasma/8 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Big 404 */}
          <motion.p
            variants={glitchVariants}
            animate="animate"
            className="select-none text-[10rem] font-extrabold leading-none tracking-tighter text-white/[0.06] sm:text-[14rem] lg:text-[18rem]"
          >
            404
          </motion.p>

          {/* Overlay text */}
          <div className="absolute inset-0 grid place-items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan"
              >
                <Search size={12} /> Page Not Found
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                Lost in the void.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mx-auto mt-4 max-w-md text-slate-400"
              >
                The page you're looking for doesn't exist, was moved, or the signal got corrupted somewhere between AI and cybersecurity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Link className="btn-primary" to="/">
                  <Home size={16} /> Back to Home
                </Link>
                <Link className="btn-secondary" to="/courses">
                  <ArrowLeft size={16} /> Browse Courses
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating status lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <div className="glass rounded-lg px-6 py-4 font-mono text-xs text-slate-400">
            <span className="text-red-400">ERROR</span> 404 ·{" "}
            <span className="text-cyan">route</span> not resolved ·{" "}
            <span className="text-violet-400">signal</span> lost
          </div>
        </motion.div>
      </div>
    </section>
  );
}
