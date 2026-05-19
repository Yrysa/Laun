import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import LaunHomePage from "./laun_pages/LaunHomePage"
import LaunDashboardPage from "./laun_pages/LaunDashboardPage"

function LaunProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.launAuth)
  return token ? children : <Navigate to="/" replace />
}

function LaunNavigation() {
  const location = useLocation()
  const { user } = useSelector((state) => state.launAuth)

  const linkClass = (path) =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
      location.pathname === path
        ? "bg-white/15 text-white shadow-lg shadow-teal-500/10"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#101827]/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-xl shadow-teal-500/10 backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:border-teal-300/30">
            <span className="bg-gradient-to-br from-teal-300 to-violet-300 bg-clip-text text-xl font-black text-transparent">L</span>
          </div>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-white">Laun</p>
            <p className="text-xs text-slate-400">Secure Platform</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="h-2.5 w-2.5 rounded-full bg-teal-300 shadow-lg shadow-teal-300/60" />
          <span className="max-w-36 truncate text-sm font-medium text-slate-300">{user?.username || "Guest"}</span>
        </div>
      </div>
    </header>
  )
}

export default function LaunApp() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#101827] text-[#F3F4F6]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-28 h-[34rem] w-[34rem] rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:34px_34px]" />
      </div>

      <LaunNavigation />

      <main className="relative z-10 pt-20">
        <Routes>
          <Route path="/" element={<LaunHomePage />} />
          <Route path="/dashboard" element={<LaunProtectedRoute><LaunDashboardPage /></LaunProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
