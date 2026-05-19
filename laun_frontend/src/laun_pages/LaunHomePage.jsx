import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import LaunLoginPanel from "../laun_features/laun_auth/LaunLoginPanel"
import LaunRegisterPanel from "../laun_features/laun_auth/LaunRegisterPanel"

export default function LaunHomePage() {
  const { user } = useSelector((state) => state.launAuth)

  return (
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
      <section className="space-y-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-300 shadow-lg shadow-teal-300/60" />
          <span className="text-sm font-medium text-slate-300">Modern authorization experience</span>
        </div>

        <div className="space-y-6">
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Secure login with a calm atmospheric interface.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Minimal glassmorphism, soft shadows, deep graphite background, smooth interactions and a clean dashboard-ready flow.
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
            <p className="text-2xl font-black text-white">JWT</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Token based session</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
            <p className="text-2xl font-black text-white">UX</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Soft premium forms</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
            <p className="text-2xl font-black text-white">API</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Backend connected</p>
          </div>
        </div>

        {user && (
          <Link
            to="/dashboard"
            className="inline-flex rounded-2xl bg-gradient-to-r from-teal-300 to-violet-300 px-7 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-teal-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-teal-400/30"
          >
            Open dashboard
          </Link>
        )}
      </section>

      <section className="grid gap-6">
        <LaunLoginPanel />
        <LaunRegisterPanel />
      </section>
    </div>
  )
}
