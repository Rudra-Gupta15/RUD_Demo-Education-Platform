/** Shimmer skeleton loader */
export default function Skeleton({ count = 3 }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative h-52 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5">
          {/* Shimmer sweep */}
          <div className="skeleton-shimmer absolute inset-0" />
          <div className="h-4 w-24 rounded-md bg-white/10" />
          <div className="mt-8 h-5 w-3/4 rounded-md bg-white/10" />
          <div className="mt-4 h-3 w-full rounded-md bg-white/10" />
          <div className="mt-3 h-3 w-2/3 rounded-md bg-white/10" />
          <div className="mt-6 h-8 w-28 rounded-md bg-white/10" />
        </div>
      ))}
    </div>
  );
}
