import { Link, useNavigate } from "react-router-dom";

export default function PaginaInexistenta() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h2>Pagina nu a fost găsită</h2>
      <p>Parametrii din URL nu corespund niciunei pagini din documentație.</p>
      <div className="not-found-actions">
        <button onClick={() => navigate(-1)} className="btn-secondary">← Înapoi</button>
        <Link to="/docs" className="btn-primary">Index docs</Link>
      </div>
    </div>
  );
}
