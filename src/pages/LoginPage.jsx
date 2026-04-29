import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { setLogat } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/docs";

  function handleLogin() {
    setLogat(true);
    navigate(from, { replace: true });
  }

  return (
    <div className="page-simple login-page">
      <h1>Autentificare necesară</h1>
      <p>
        Secțiunea pe care ai încercat s-o accesezi necesită autentificare.
        Apasă butonul de mai jos pentru a te „loga" (simulat).
      </p>
      <p className="login-redirect-note">
        După login vei fi redirecționat la: <code>{from}</code>
      </p>
      <button onClick={handleLogin} className="btn-primary">
        Intră în cont
      </button>
      <p><Link to="/">Înapoi acasă</Link></p>
    </div>
  );
}
