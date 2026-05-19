import { useSelector } from "react-redux"
import LaunLoginPanel from "../laun_features/laun_auth/LaunLoginPanel"
import LaunRegisterPanel from "../laun_features/laun_auth/LaunRegisterPanel"

export default function LaunHomePage() {
  const { user } = useSelector((state) => state.launAuth)

  return (
    <main className="laun-page">
      <section className="laun-hero">
        <h1>Laun</h1>
        <p>Unique full-stack authentication platform powered by FastAPI, React and PostgreSQL</p>
      </section>
      {user ? (
        <section className="laun-auth-card">
          <h2>Welcome, {user.username}</h2>
          <p>You are authorized.</p>
        </section>
      ) : (
        <section className="laun-auth-grid">
          <LaunLoginPanel />
          <LaunRegisterPanel />
        </section>
      )}
    </main>
  )
}
