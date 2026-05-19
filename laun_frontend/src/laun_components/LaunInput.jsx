export default function LaunInput({ label, error, className = "", ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      <input
        className={`h-14 w-full rounded-2xl border bg-white/[0.06] px-5 text-[15px] text-white outline-none backdrop-blur-xl transition duration-300 placeholder:text-slate-500 ${
          error
            ? "border-red-300/50 shadow-lg shadow-red-500/10 focus:border-red-300/80"
            : "border-slate-300/10 shadow-inner shadow-white/5 focus:border-teal-300/50 focus:bg-white/[0.09] focus:shadow-xl focus:shadow-teal-500/10"
        }`}
        {...props}
      />
      {error && <span className="block text-sm text-red-200">{error}</span>}
    </label>
  )
}
