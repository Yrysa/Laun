import { Link, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import LaunHomePage from "./laun_pages/LaunHomePage"
import LaunDashboardPage from "./laun_pages/LaunDashboardPage"

export default function LaunApp() {
  const { user } = useSelector((state) => state.launAuth)

  return (
    <>
      <header className="laun-navbar">
        <Link to="/" className="laun-brand">Laun</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          {user && <span>{user.username}</span>}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<LaunHomePage />} />
        <Route path="/dashboard" element={<LaunDashboardPage />} />
      </Routes>
    </>
  )
}
