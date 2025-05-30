import React, { useState, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import AlumnForm from './components/AlumnForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AlumnList from './components/AlumnList';


function FormularioWrapper({ agregarAlumno, actualizarAlumno, alumnos }) {
  const navigate = useNavigate();
  const { libreta } = useParams();

  // Buscar alumno a editar (si viene libreta)
  const alumnoEditar = libreta ? alumnos.find((a) => a.libreta === Number(libreta)) : null;

  const cancelarEdicion = () => {
    navigate('/');
  };

  const onSubmit = (alumno) => {
    if (alumnoEditar) {
      actualizarAlumno(alumnoEditar.libreta, alumno);
    } else {
      agregarAlumno(alumno);
    }
    navigate('/');
  };

  return (
    <AlumnForm
      agregarAlumno={onSubmit}
      actualizarAlumno={onSubmit}
      alumnoEditar={alumnoEditar}
      cancelarEdicion={cancelarEdicion}
    />
  );
}

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const navigate = useNavigate();

  const obtenerSiguienteLU = () => {
    if (alumnos.length === 0) return 1;
    return Math.max(...alumnos.map((a) => a.libreta)) + 1;
  };

  const agregarAlumno = useCallback((alumno) => {
    const nuevoAlumno = { ...alumno, libreta: obtenerSiguienteLU() };
    setAlumnos((prev) => [...prev, nuevoAlumno]);
  }, [alumnos]);

  const eliminarAlumno = useCallback((libreta) => {
    setAlumnos((prev) => prev.filter((a) => a.libreta !== libreta));
  }, []);

  const actualizarAlumno = useCallback((libreta, datosActualizados) => {
    setAlumnos((prev) =>
      prev.map((a) => (a.libreta === libreta ? { ...a, ...datosActualizados } : a))
    );
  }, []);

  const manejarEditar = (alumno) => {
    navigate(`/editar/${alumno.libreta}`);
    // Navega a ruta editar con la libreta en URL
    // Esto se hace en ListaAlumnos con <Link>
  };

  return (
    <div className="app-container">
      <NavBar /> {/* mostrar navbar siempre */}
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/agregar"
          element={
            <FormularioWrapper
              agregarAlumno={agregarAlumno}
              actualizarAlumno={actualizarAlumno}
              alumnos={alumnos}
            />
          }
        />
        <Route
          path="/listaalumnos"
          element={
            <AlumnList
              alumnos={alumnos}
              manejarEditar={(a) => manejarEditar(a)}
              eliminarAlumno={eliminarAlumno}
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
