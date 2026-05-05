import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Large Logo in Center */}
        <motion.div
          layoutId="hero-logo"
          transition={{ 
            duration: 1.2, 
            ease: [0.43, 0.13, 0.23, 0.96] 
          }}
          className="w-64 h-64 md:w-96 md:h-96 rounded-full border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden bg-[#0a0a0a] p-0 flex items-center justify-center z-10"
        >
          <img 
            src="/logo.png" 
            alt="ConvoSec AI Logo" 
            className="w-full h-full object-contain scale-[0.85]"
          />
        </motion.div>

        {/* Loading text or brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">ConvoSec AI</h2>
          <div className="mt-4 flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-[#00a8cc]"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Neural Network pattern slightly visible */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-center bg-cover"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      />
    </motion.div>
  );
}
