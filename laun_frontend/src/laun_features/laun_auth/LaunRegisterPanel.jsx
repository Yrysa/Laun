import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LaunButton from "../../laun_components/LaunButton"
import LaunInput from "../../laun_components/LaunInput"
import { launRegister } from "../../laun_store/laun_auth_slice"

export default function LaunRegisterPanel() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.launAuth)
  const [form, setForm] = useState({ email: "", username: "", password: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    try {
      await dispatch(launRegister(form)).unwrap()
      setSuccess("Account created successfully. You can login now.")
      setForm({ email: "", username: "", password: "" })
    } catch (err) {
      setError(err)
    }
  }

  return (
    <form onSubmit={submitForm} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition duration-300 hover:border-violet-300/20 hover:bg-white/[0.09] sm:p-8">
      <div className="mb-8 space-y-3">
        <div className="inline-flex rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
          Registration
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white">Create account</h2>
        <p className="max-w-sm text-sm leading-7 text-slate-400">Start with a secure profile and unlock your personal dashboard.</p>
      </div>

      <div className="space-y-5">
        <LaunInput label="Username" name="username" type="text" placeholder="laun_user" value={form.username} onChange={updateForm} required />
        <LaunInput label="Email address" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateForm} required />
        <LaunInput label="Password" name="password" type="password" placeholder="Minimum 6 symbols" value={form.password} onChange={updateForm} required />
      </div>

      {error && (
        <div className="mt-5 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100 shadow-lg shadow-red-500/10">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 rounded-2xl border border-teal-300/20 bg-teal-400/10 px-4 py-3 text-sm text-teal-100 shadow-lg shadow-teal-500/10">
          {success}
        </div>
      )}

      <div className="mt-7">
        <LaunButton type="submit" loading={loading}>Create account</LaunButton>
      </div>
    </form>
  )
}
