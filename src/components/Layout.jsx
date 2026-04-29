import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/cauta?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
    }
  }

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">
            BeatKit <span>docs</span>
          </Link>

          <nav className="main-nav">
            <NavLink to="/" end>Acasă</NavLink>
            <NavLink to="/docs">Documentație</NavLink>
            <NavLink to="/despre">Despre</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <form onSubmit={handleSearch} className="header-search">
            <input
              type="text"
              placeholder="Caută... (Ctrl+K)"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit">→</button>
          </form>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>BeatKit Docs — un proiect demonstrativ. <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </footer>
    </div>
  );
}
