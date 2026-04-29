import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import DocsLayout from "./components/DocsLayout.jsx";

import Acasa from "./pages/Acasa.jsx";
import Despre from "./pages/Despre.jsx";
import Contact from "./pages/Contact.jsx";
import DocsIndex from "./pages/DocsIndex.jsx";
import SectiunePage from "./pages/SectiunePage.jsx";
import PaginaDoc from "./pages/PaginaDoc.jsx";
import EditarePage from "./pages/EditarePage.jsx";
import CautaPage from "./pages/CautaPage.jsx";
import IstoricPage from "./pages/IstoricPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import DocsNotFound from "./pages/DocsNotFound.jsx";
import PrivatPage from "./pages/PrivatPage.jsx";
import RutaPrivata from "./components/RutaPrivata.jsx";

import sectiuni from "./data/sectiuni.json";

function CtrlKHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        navigate("/cauta");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <>
      <CtrlKHandler />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Acasa />} />
          <Route path="despre" element={<Despre />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsIndex />} />

          <Route
            path="privat"
            element={
              <RutaPrivata>
                <PrivatPage />
              </RutaPrivata>
            }
          />

          <Route path=":sectiune">
            <Route index element={<SectiunePage />} />
            <Route path=":paginaId" element={<PaginaDoc />}>
              <Route path="comentarii" element={<ComentariiPlaceholder />} />
            </Route>
            <Route path=":paginaId/editare" element={<EditarePage />} />
          </Route>

          <Route path="*" element={<DocsNotFound />} />
        </Route>

        <Route path="cauta" element={<CautaPage />} />
        <Route path="istoric" element={<IstoricPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function ComentariiPlaceholder() {
  return (
    <div
      style={{
        padding: "12px",
        background: "#f5f5f5",
        borderRadius: "4px",
        marginTop: "16px",
      }}
    >
      <strong>Comentarii</strong>
      <p style={{ margin: "8px 0 0", color: "#666", fontSize: "14px" }}>
        Nicio funcționalitate de comentarii deocamdată. Aceasta e o rută
        imbricată demonstrativă.
      </p>
    </div>
  );
}
