import { useParams, Link } from "react-router-dom";
import pagini from "../data/pages.json";
import sectiuni from "../data/sectiuni.json";
import PaginaInexistenta from "./PaginaInexistenta.jsx";

export default function SectiunePage() {
  const { sectiune } = useParams();
  const secInfo = sectiuni.find((s) => s.id === sectiune);
  const paginileSecțiunii = pagini.filter((p) => p.sectiune === sectiune);

  if (!secInfo) {
    return <PaginaInexistenta />;
  }

  return (
    <div className="sectiune-page">
      <h1>{secInfo.label}</h1>
      <p>{paginileSecțiunii.length} pagini în această secțiune</p>
      <ul className="page-list">
        {paginileSecțiunii.map((p) => (
          <li key={p.id}>
            <Link to={`/docs/${sectiune}/${p.id}`}>
              <strong>{p.titlu}</strong>
              <span className="page-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
