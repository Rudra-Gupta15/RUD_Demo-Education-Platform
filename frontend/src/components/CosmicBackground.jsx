import { motion } from "framer-motion";
import { useMemo } from "react";

/** Deterministic "random" so stars don't shift on re-render */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hash(n) {
  // simple Wang hash
  let x = (n ^ 61) ^ (n >> 16);
  x = x + (x << 3);
  x = x ^ (x >> 4);
  x = (x * 0x27d4eb2d) >>> 0;
  x = x ^ (x >> 15);
  return x;
}

function pseudoRandom(seed) {
  return (hash(seed) % 1000) / 1000;
}

const STAR_COUNT = 90;

export default function CosmicBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        cx: `${lerp(1, 99, pseudoRandom(i * 3 + 0))}%`,
        cy: `${lerp(1, 99, pseudoRandom(i * 3 + 1))}%`,
        r: lerp(0.4, 1.6, pseudoRandom(i * 3 + 2)),
        delay: lerp(0, 6, pseudoRandom(i * 7 + 3)),
        dur: lerp(2.5, 6, pseudoRandom(i * 7 + 4))
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-subtle-grid bg-[length:48px_48px] opacity-[0.35]" />

      {/* Star field */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {stars.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#4F46E5" opacity="0.1">
            <animate
              attributeName="opacity"
              values="0.1;0.9;0.1"
              dur={`${s.dur}s`}
              begin={`${s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Animated glow blobs */}
      <motion.div
        className="absolute left-[5%] top-[8%] h-80 w-80 rounded-full bg-brandprimary/8 blur-3xl"
        animate={{ x: [0, 40, -14, 0], y: [0, -24, 22, 0], scale: [1, 1.1, 0.94, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[5%] top-[5%] h-96 w-96 rounded-full bg-brandsecondary/8 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 28, -16, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[38%] h-64 w-64 rounded-full bg-brandsecondary/5 blur-3xl"
        animate={{ x: [0, 20, -18, 0], y: [0, -20, 12, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
