export default function LaunGlassCard({ children, className = "" }) {
  return (
    <section className={`rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8 ${className}`}>
      {children}
    </section>
  )
}
