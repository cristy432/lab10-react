import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import { useEffect } from "react";
import pagini from "../data/pages.json";
import { useIstoric } from "../context/IstoricContext.jsx";
import PaginaInexistenta from "./PaginaInexistenta.jsx";

export default function PaginaDoc() {
  const { sectiune, paginaId } = useParams();
  const { adaugaInIstoric } = useIstoric();

  const pagina = pagini.find(
    (p) => p.id === paginaId && p.sectiune === sectiune,
  );
  const paginileSectiunii = pagini.filter((p) => p.sectiune === sectiune);

  const indexCurent = paginileSectiunii.findIndex((p) => p.id === paginaId);
  const paginaAnt = indexCurent > 0 ? paginileSectiunii[indexCurent - 1] : null;
  const paginaUrm =
    indexCurent < paginileSectiunii.length - 1
      ? paginileSectiunii[indexCurent + 1]
      : null;

  useEffect(() => {
    if (pagina) {
      adaugaInIstoric({
        id: pagina.id,
        titlu: pagina.titlu,
        sectiune: pagina.sectiune,
        path: `/docs/${sectiune}/${paginaId}`,
      });
    }
  }, [paginaId, sectiune]);

  if (!pagina) {
    return <PaginaInexistenta />;
  }

  return (
    <div className="pagina-doc">
      <div className="pagina-doc-main">
        <div className="pagina-header">
          <h1>{pagina.titlu}</h1>
          <div className="pagina-tags">
            {pagina.tags.map((t) => (
              <Link
                key={t}
                to={`/cauta?tag=${encodeURIComponent(t)}`}
                className="tag"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        <div className="pagina-continut">
          <p>{pagina.continut}</p>
        </div>

        <div className="pagina-actions">
          <Link
            to={`/docs/${sectiune}/${paginaId}/editare`}
            className="btn-edit"
          >
            ✏ Editează pagina
          </Link>
          <NavLink
            to={`/docs/${sectiune}/${paginaId}/comentarii`}
            className={({ isActive }) =>
              "btn-comments" + (isActive ? " active" : "")
            }
          >
            Comentarii
          </NavLink>
        </div>

        <nav className="prev-next">
          {paginaAnt ? (
            <Link
              to={`/docs/${sectiune}/${paginaAnt.id}`}
              className="prev-link"
            >
              ← {paginaAnt.titlu}
            </Link>
          ) : (
            <span />
          )}
          {paginaUrm ? (
            <Link
              to={`/docs/${sectiune}/${paginaUrm.id}`}
              className="next-link"
            >
              {paginaUrm.titlu} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      <div className="pagina-doc-side">
        <Outlet />
      </div>
    </div>
  );
}
