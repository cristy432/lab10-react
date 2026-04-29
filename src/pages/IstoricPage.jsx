import { Link } from "react-router-dom";
import { useIstoric } from "../context/IstoricContext.jsx";

export default function IstoricPage() {
  const { istoric, stergeIstoric } = useIstoric();

  return (
    <div className="page-simple">
      <div className="page-header-row">
        <h1>Istoric navigare</h1>
        {istoric.length > 0 && (
          <button onClick={stergeIstoric} className="btn-danger">Șterge istoricul</button>
        )}
      </div>

      {istoric.length === 0 ? (
        <p>Nu ai vizitat nicio pagină de documentație încă.</p>
      ) : (
        <ul className="history-list">
          {istoric.map((item, i) => (
            <li key={item.id + i} className="history-item">
              <span className="history-index">{i + 1}</span>
              <Link to={item.path}>{item.titlu}</Link>
              <span className="history-section">{item.sectiune}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
