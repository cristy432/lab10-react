import { Link } from "react-router-dom";
import sectiuni from "../data/sectiuni.json";
import pagini from "../data/pages.json";

export default function DocsIndex() {
  return (
    <div className="docs-index">
      <h1>Bun venit în documentația FluxKit</h1>
      <p>Selectează o secțiune din sidebar sau alege una de mai jos pentru a începe.</p>

      <div className="section-list">
        {sectiuni.map((sec) => {
          const paginileSecțiunii = pagini.filter((p) => p.sectiune === sec.id);
          return (
            <div key={sec.id} className="section-card">
              <h2>
                <Link to={`/docs/${sec.id}`}>{sec.label}</Link>
              </h2>
              <ul>
                {paginileSecțiunii.map((p) => (
                  <li key={p.id}>
                    <Link to={`/docs/${sec.id}/${p.id}`}>{p.titlu}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
