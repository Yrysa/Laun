import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import LaunButton from "../laun_components/LaunButton"
import LaunGlassCard from "../laun_components/LaunGlassCard"
import { launLoadProfile, launLogout } from "../laun_store/laun_auth_slice"

export default function LaunDashboardPage() {
  const dispatch = useDispatch()
  const { user, token, loading } = useSelector((state) => state.launAuth)

  useEffect(() => {
    if (token && !user) {
      dispatch(launLoadProfile())
    }
  }, [dispatch, token, user])

  return (
    <div className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
            Dashboard
          </div>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">Account overview</h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300">
            Your secured profile details are loaded from the protected API route.
          </p>
        </div>

        <div className="w-full sm:w-48">
          <LaunButton variant="ghost" onClick={() => dispatch(launLogout())}>Logout</LaunButton>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <LaunGlassCard className="min-h-96">
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-teal-300/25 to-violet-300/25 shadow-2xl shadow-teal-500/10">
              <span className="text-3xl font-black text-white">{user?.username?.[0]?.toUpperCase() || "L"}</span>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Profile</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-white">{loading ? "Loading..." : user?.username}</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-sm text-slate-400">User ID</p>
              <p className="mt-2 text-xl font-bold text-white">{user?.id || "—"}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-2 text-xl font-bold text-white">{user?.is_active ? "Active" : "Inactive"}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:col-span-2">
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-2 break-all text-xl font-bold text-white">{user?.email || "—"}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:col-span-2">
              <p className="text-sm text-slate-400">Created at</p>
              <p className="mt-2 text-xl font-bold text-white">{user?.created_at ? new Date(user.created_at).toLocaleString() : "—"}</p>
            </div>
          </div>
        </LaunGlassCard>

        <div className="grid gap-6">
          <LaunGlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">Session</p>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-white">Protected access</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Token is stored locally and attached to every protected request.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#101827]/70 p-4">
              <p className="truncate text-xs leading-6 text-slate-400">{token || "No token"}</p>
            </div>
          </LaunGlassCard>

          <LaunGlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">Health</p>
            <div className="mt-5 flex items-center justify-between rounded-3xl border border-teal-300/20 bg-teal-300/10 p-5">
              <span className="font-bold text-white">API connection</span>
              <span className="rounded-full bg-teal-300/20 px-3 py-1 text-sm font-bold text-teal-100">Ready</span>
            </div>
          </LaunGlassCard>
        </div>
      </div>
    </div>
  )
}
