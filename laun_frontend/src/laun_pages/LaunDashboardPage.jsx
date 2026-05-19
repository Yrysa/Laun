import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { launLoadProfile, launLogout } from "../laun_store/laun_auth_slice"

export default function LaunDashboardPage() {
  const dispatch = useDispatch()
  const { user, token, loading } = useSelector((state) => state.launAuth)

  useEffect(() => {
    if (token && !user) {
      dispatch(launLoadProfile())
    }
  }, [dispatch, token, user])

  if (!token) {
    return (
      <main className="laun-page">
        <section className="laun-auth-card">
          <h2>Unauthorized</h2>
          <p>Please login first.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="laun-page">
      <section className="laun-auth-card laun-dashboard-card">
        <h2>Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>ID: {user?.id}</p>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <p>Status: {user?.is_active ? "Active" : "Inactive"}</p>
          </>
        )}
        <button onClick={() => dispatch(launLogout())}>Logout</button>
      </section>
    </main>
  )
}
