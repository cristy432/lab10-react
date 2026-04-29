import { useNavigate, Link } from "react-router-dom";

export default function DocsNotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404 — Pagină docs inexistentă</h1>
      <p>Această pagină nu există în documentație. Poate ai greșit URL-ul?</p>
      <div className="not-found-actions">
        <button onClick={() => navigate(-1)} className="btn-secondary">← Înapoi</button>
        <Link to="/docs" className="btn-primary">Index docs</Link>
      </div>
    </div>
  );
}
