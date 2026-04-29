import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-simple not-found">
      <h1>404 — Pagină inexistentă</h1>
      <p>URL-ul pe care l-ai accesat nu există în aplicație.</p>
      <div className="not-found-actions">
        <button onClick={() => navigate(-1)} className="btn-secondary">← Înapoi</button>
        <Link to="/" className="btn-primary">Acasă</Link>
      </div>
    </div>
  );
}
