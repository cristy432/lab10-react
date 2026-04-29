import { Link, useLocation } from "react-router-dom";
import sectiuni from "../data/sectiuni.json";
import pagini from "../data/pages.json";

function getLabelForSegment(segment, index, segments) {
  if (segment === "docs") return "Docs";
  if (segment === "editare") return "Editare";
  if (segment === "comentarii") return "Comentarii";
  if (segment === "privat") return "Privat";

  const sec = sectiuni.find((s) => s.id === segment);
  if (sec) return sec.label;

  const pag = pagini.find((p) => p.id === segment);
  if (pag) return pag.titlu;

  return segment;
}

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const label = getLabelForSegment(seg, i, segments);
    return { label, path };
  });

  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link to="/">Acasă</Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.path}>
          <span className="breadcrumb-sep"> / </span>
          {i === crumbs.length - 1 ? (
            <span className="breadcrumb-current">{crumb.label}</span>
          ) : (
            <Link to={crumb.path}>{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
