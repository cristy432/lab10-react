import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import pagini from "../data/pages.json";
import sectiuni from "../data/sectiuni.json";

function filtreazaPagini(pages, q, sectiune, tags) {
  return pages.filter((p) => {
    const matchQ =
      !q ||
      p.titlu.toLowerCase().includes(q.toLowerCase()) ||
      p.continut.toLowerCase().includes(q.toLowerCase());
    const matchSec = !sectiune || p.sectiune === sectiune;
    const matchTags =
      tags.length === 0 || tags.every((t) => p.tags.includes(t));
    return matchQ && matchSec && matchTags;
  });
}

export default function CautaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  const q = searchParams.get("q") || "";
  const sectiune = searchParams.get("sectiune") || "";
  const tags = searchParams.getAll("tag");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const rezultate = filtreazaPagini(pagini, q, sectiune, tags);

  function setQ(val) {
    const next = new URLSearchParams(searchParams);
    if (val) next.set("q", val);
    else next.delete("q");
    setSearchParams(next);
  }

  function setSectiune(val) {
    const next = new URLSearchParams(searchParams);
    if (val) next.set("sectiune", val);
    else next.delete("sectiune");
    setSearchParams(next);
  }

  function adaugaTag(tag) {
    if (!tag || tags.includes(tag)) return;
    const next = new URLSearchParams(searchParams);
    next.append("tag", tag);
    setSearchParams(next);
  }

  function stergeTag(tag) {
    const next = new URLSearchParams(searchParams);
    const remaining = tags.filter((t) => t !== tag);
    next.delete("tag");
    remaining.forEach((t) => next.append("tag", t));
    setSearchParams(next);
  }

  function resetFiltre() {
    setSearchParams({});
  }

  const toateTagurile = [...new Set(pagini.flatMap((p) => p.tags))].sort();

  return (
    <div className="cauta-page">
      <h1>Căutare</h1>

      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Caută în documentație..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <label>Secțiune:</label>
          <select
            value={sectiune}
            onChange={(e) => setSectiune(e.target.value)}
          >
            <option value="">Toate</option>
            {sectiuni.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Tag-uri active:</label>
          <div className="active-tags">
            {tags.map((t) => (
              <span key={t} className="tag active-tag">
                {t}
                <button onClick={() => stergeTag(t)} className="tag-remove">
                  ×
                </button>
              </span>
            ))}
            {tags.length === 0 && <span className="no-tags">niciunul</span>}
          </div>
        </div>

        <div className="filter-group">
          <label>Adaugă tag:</label>
          <div className="available-tags">
            {toateTagurile
              .filter((t) => !tags.includes(t))
              .map((t) => (
                <button
                  key={t}
                  className="tag tag-btn"
                  onClick={() => adaugaTag(t)}
                >
                  + {t}
                </button>
              ))}
          </div>
        </div>

        <button onClick={resetFiltre} className="btn-reset">
          Resetează filtrele
        </button>
      </div>

      <div className="search-results">
        <p className="results-count">{rezultate.length} rezultate</p>
        {rezultate.length === 0 ? (
          <p className="no-results">Nicio pagină nu corespunde filtrelor.</p>
        ) : (
          <ul className="results-list">
            {rezultate.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/docs/${p.sectiune}/${p.id}`}
                  className="result-item"
                >
                  <strong>{p.titlu}</strong>
                  <span className="result-section">
                    {sectiuni.find((s) => s.id === p.sectiune)?.label}
                  </span>
                  <p className="result-excerpt">
                    {p.continut.slice(0, 120)}...
                  </p>
                  <div className="result-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
