//App
import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AlumnList from "./components/AlumnList";
import AlumnForm from "./components/AlumnForm";
import DetalleAlumno from "./components/DetalleAlumno";
import AcercaDe from "./components/AcercaDe";

function FormularioWrapper({ agregarAlumno, actualizarAlumno, alumnos, setMensajeExito }) {
  const navigate = useNavigate();
  const { libreta } = useParams();
  const alumnoEditar = libreta
    ? alumnos.find((a) => a.libreta === Number(libreta))
    : null;

  const handleSave = (datos) => {
    if (alumnoEditar) {
      // Edición
      actualizarAlumno(alumnoEditar.libreta, datos);
      setMensajeExito("Alumno actualizado con éxito");
      navigate("/listaalumnos");
      return;
    }

    // Alta: validar que la LU no exista
    const nuevaLU = Number(datos.libreta);
    if (alumnos.some((a) => a.libreta === nuevaLU)) {
      window.alert(`Ya existe un alumno con LU ${nuevaLU}. Debe elegir otro número.`);
      return;
    }

    agregarAlumno(datos);
    setMensajeExito("Alumno agregado con éxito");
    navigate("/listaalumnos");
  };

  return (
    <AlumnForm
      onSubmit={handleSave}
      alumnoEditar={alumnoEditar}
      cancelarEdicion={() => navigate("/listaalumnos")}
    />
  );
}

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");

  // Limpiar mensaje de éxito después de 3 segundos
  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => setMensajeExito(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);

  // Generar la próxima libreta (LU)
  const generarNuevaLU = (prev) =>
    prev.length === 0 ? 1 : Math.max(...prev.map((a) => a.libreta)) + 1;

  // Agregar un nuevo alumno
  const agregarAlumno = useCallback(
    (alumno) => {
      setAlumnos((prev) => [
        ...prev,
        { ...alumno, libreta: alumno.libreta || generarNuevaLU(prev) }
      ]);
    },
    []
  );

  // Actualizar un alumno existente
  const actualizarAlumno = useCallback((libreta, datos) => {
    setAlumnos((prev) =>
      prev.map((a) =>
        a.libreta === libreta ? { ...a, ...datos, libreta } : a
      )
    );
  }, []);

  // Eliminar un alumno por su LU
  const eliminarAlumno = useCallback((libreta) => {
    setAlumnos((prev) => prev.filter((a) => a.libreta !== libreta));
  }, []);

  return (
    <>
      {/* 1) NavBar fuera de .app-container para que ocupe todo el ancho */}
      <NavBar />

      {/* 2) El resto de la app dentro de .app-container */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/listaalumnos"
            element={
              <AlumnList
                alumnos={alumnos}
                eliminarAlumno={eliminarAlumno}
                mensajeExito={mensajeExito}
                clearMensaje={() => setMensajeExito("")}
              />
            }
          />

          <Route
            path="/agregar"
            element={
              <FormularioWrapper
                agregarAlumno={agregarAlumno}
                actualizarAlumno={actualizarAlumno}
                alumnos={alumnos}
                setMensajeExito={setMensajeExito}
              />
            }
          />

          <Route
            path="/editar/:libreta"
            element={
              <FormularioWrapper
                agregarAlumno={agregarAlumno}
                actualizarAlumno={actualizarAlumno}
                alumnos={alumnos}
                setMensajeExito={setMensajeExito}
              />
            }
          />

          <Route
            path="/detalle/:libreta"
            element={<DetalleAlumno alumnos={alumnos} />}
          />

          <Route path="/acerca" element={<AcercaDe />} />
        </Routes>
      </div>
    </>
  );
}
