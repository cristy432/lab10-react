import { Link } from "react-router-dom";

export default function Acasa() {
  return (
    <div className="page-home">
      <h1>BeatKit Documentation</h1>
      <p className="lead">
        O bibliotecă JS pentru DJ-ing în browser — deck-uri virtuale, mixer, efecte audio și vizualizare waveform.
      </p>
      <div className="home-actions">
        <Link to="/docs" className="btn-primary">Începe să citești</Link>
        <Link to="/cauta" className="btn-secondary">Caută în docs</Link>
      </div>
      <div className="home-cards">
        <div className="card">
          <h3>Ghid de început</h3>
          <p>Instalare, configurare audio și primul tău deck virtual.</p>
          <Link to="/docs/inceput">Deschide →</Link>
        </div>
        <div className="card">
          <h3>API Referință</h3>
          <p>Mixer, efecte, loop-uri, sync și cue points.</p>
          <Link to="/docs/api">Deschide →</Link>
        </div>
        <div className="card">
          <h3>Vizualizare & Output</h3>
          <p>Waveform, spectrum analyzer, VU meter și înregistrare set.</p>
          <Link to="/docs/vizualizare">Deschide →</Link>
        </div>
      </div>
    </div>
  );
}
