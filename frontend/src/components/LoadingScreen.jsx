import { motion } from "framer-motion";
import { useState } from "react";

export default function LoadingScreen() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[8px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] overflow-hidden bg-[#0a0a0a] p-0 flex items-center justify-center z-10 relative"
        >
          {/* Subtle spinning loader behind the image until it loads */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full"
               />
            </div>
          )}
          <img
            src="/logo.png"
            alt="ConvoSec AI Logo"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-contain transition-all duration-1000 ease-in-out ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          />
        </motion.div>

        {/* Loading text or brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-black text-[#0f172a] tracking-[0.2em] uppercase">ConvoSec AI</h2>
          <div className="mt-6 flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.4, 1], 
                  opacity: [0.2, 1, 0.2],
                  backgroundColor: ["#e2e8f0", "#2563eb", "#e2e8f0"]
                }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.25 }}
                className="w-2.5 h-2.5 rounded-full shadow-sm"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Neural Network pattern slightly visible */}
      <div
        className="absolute inset-0 z-0 opacity-5 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      />
    </motion.div>
  );
}
