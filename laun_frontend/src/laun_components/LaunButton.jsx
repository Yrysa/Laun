export default function LaunButton({ children, loading, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-teal-300 to-violet-300 text-slate-950 shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30",
    ghost: "border border-white/10 bg-white/[0.06] text-white shadow-xl shadow-black/10 hover:bg-white/[0.1]",
    danger: "bg-red-400/90 text-white shadow-2xl shadow-red-500/20 hover:bg-red-300",
  }

  return (
    <button
      className={`group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl px-6 text-sm font-bold tracking-wide transition duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      <span className="relative z-10">{loading ? "Loading..." : children}</span>
      <span className="absolute inset-0 translate-y-full bg-white/25 transition duration-300 group-hover:translate-y-0" />
    </button>
  )
}
