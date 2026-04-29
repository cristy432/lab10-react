import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import sectiuni from "../data/sectiuni.json";
import pagini from "../data/pages.json";
import Breadcrumb from "./Breadcrumb.jsx";

export default function DocsLayout() {
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
    <div className="docs-wrapper">
      <aside className="docs-sidebar">
        <div className="sidebar-top">
          <Link to="/" className="logo">
            BeatKit <span>docs</span>
          </Link>
          <form onSubmit={handleSearch} className="sidebar-search">
            <input
              type="text"
              placeholder="Caută... (Ctrl+K)"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>
        </div>

        <nav className="sidebar-nav">
          {sectiuni.map((sec) => {
            const paginileSecțiunii = pagini.filter((p) => p.sectiune === sec.id);
            return (
              <div key={sec.id} className="sidebar-section">
                <NavLink
                  to={`/docs/${sec.id}`}
                  end
                  className={({ isActive }) =>
                    "sidebar-section-title" + (isActive ? " active" : "")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="active-indicator">▸</span>}
                      {sec.label}
                    </>
                  )}
                </NavLink>

                <ul className="sidebar-pages">
                  {paginileSecțiunii.map((p) => (
                    <li key={p.id}>
                      <NavLink
                        to={`/docs/${sec.id}/${p.id}`}
                        className={({ isActive }) =>
                          "sidebar-page-link" + (isActive ? " active" : "")
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive ? "✓ " : ""}{p.titlu}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="sidebar-section">
            <NavLink
              to="/docs/privat"
              className={({ isActive }) =>
                "sidebar-section-title" + (isActive ? " active" : "")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="active-indicator">▸</span>}
                  🔒 Secțiune privată
                </>
              )}
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/istoric" className="sidebar-link-small">Istoric navigare</NavLink>
          <NavLink to="/cauta" className="sidebar-link-small">Căutare avansată</NavLink>
        </div>
      </aside>

      <div className="docs-content">
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
}
