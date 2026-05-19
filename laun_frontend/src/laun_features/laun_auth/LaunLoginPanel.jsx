import { useState } from "react"
import { useDispatch } from "react-redux"
import { launLogin } from "../../laun_store/laun_auth_slice"

export default function LaunLoginPanel() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      await dispatch(launLogin(form)).unwrap()
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submitForm} className="laun-auth-card">
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={updateForm} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={updateForm} required />
      {error && <p className="laun-error">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
    </form>
  )
}
