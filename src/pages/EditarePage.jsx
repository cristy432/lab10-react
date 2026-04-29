import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import pagini from "../data/pages.json";
import PaginaInexistenta from "./PaginaInexistenta.jsx";

export default function EditarePage() {
  const { sectiune, paginaId } = useParams();
  const navigate = useNavigate();

  const pagina = pagini.find(
    (p) => p.id === paginaId && p.sectiune === sectiune,
  );

  const [titlu, setTitlu] = useState(pagina?.titlu || "");
  const [continut, setContinut] = useState(pagina?.continut || "");

  if (!pagina) {
    return <PaginaInexistenta />;
  }

  function handleSalveaza(e) {
    e.preventDefault();

    alert("Salvat! (demonstrativ — datele nu se persistă)");
    navigate(`/docs/${sectiune}/${paginaId}`, { replace: true });
  }

  function handleAnuleaza() {
    navigate(-1);
  }

  return (
    <div className="editare-page">
      <h1>Editare: {pagina.titlu}</h1>

      <form onSubmit={handleSalveaza} className="edit-form">
        <div className="form-group">
          <label htmlFor="titlu">Titlu</label>
          <input
            id="titlu"
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="continut">Conținut</label>
          <textarea
            id="continut"
            rows={10}
            value={continut}
            onChange={(e) => setContinut(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Salvează
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleAnuleaza}
          >
            Anulează
          </button>
        </div>
      </form>
    </div>
  );
}
