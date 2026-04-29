import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function PrivatPage() {
  const { setLogat } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setLogat(false);
    navigate("/docs", { replace: true });
  }

  return (
    <div className="pagina-doc">
      <div className="pagina-doc-main">
        <h1> Secțiune privată</h1>
        <p>Ești autentificat și poți vedea această secțiune.</p>
        <p>
          Aceasta e o demonstrație a rutelor protejate cu{" "}
          <code>{"<Navigate>"}</code> și context. Dacă nu ești logat, ești
          redirecționat automat spre <code>/login</code>.
        </p>
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{ marginTop: "16px" }}
        >
          Delogare
        </button>
      </div>
    </div>
  );
}
