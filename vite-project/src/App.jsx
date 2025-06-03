import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import AlumnList from './components/AlumnList';
import AlumnForm from './components/AlumnForm';
import AcercaDe from './components/AcercaDe';
import DetalleAlumno from './components/DetalleAlumno';

// Usamos el mismo formulario para alta y edición
function FormularioWrapper({ agregarAlumno, actualizarAlumno, alumnos }) {
  const navigate = useNavigate();
  const { libreta } = useParams();
  const alumnoEditar = libreta
    ? alumnos.find(a => a.libreta === Number(libreta))
    : null;

  // Esta función maneja tanto crear como editar
  const handleSave = datos => {
    if (alumnoEditar) {
      actualizarAlumno(alumnoEditar.libreta, datos);
    } else {
      agregarAlumno(datos);
    }
    navigate('/listaalumnos');
  };

  return (
    <AlumnForm
      onSubmit={handleSave}
      alumnoEditar={alumnoEditar}
      cancelarEdicion={() => navigate('/listaalumnos')}
    />
  );
}

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  // Genera el próximo número de libreta
  const generarNuevaLU = prev =>
    prev.length === 0 ? 1 : Math.max(...prev.map(a => a.libreta)) + 1;

  // Función para agregar nuevo alumno
  const agregarAlumno = useCallback(alumno => {
    setAlumnos(prev => [
      ...prev,
      { ...alumno, libreta: alumno.libreta || generarNuevaLU(prev) }
    ]);
  }, []);

  // Función para editar alumno existente
  const actualizarAlumno = useCallback((libreta, datos) => {
    setAlumnos(prev =>
      prev.map(a =>
        a.libreta === libreta ? { ...a, ...datos, libreta } : a
      )
    );
  }, []);

  // Función para eliminar alumno
  const eliminarAlumno = useCallback(libreta => {
    setAlumnos(prev => prev.filter(a => a.libreta !== libreta));
  }, []);

  return (
    <div className="app-container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/listaalumnos"
          element={
            <AlumnList
              alumnos={alumnos}
              eliminarAlumno={eliminarAlumno}
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
        <Route path="/detalle/:libreta"
               element={
               <DetalleAlumno alumnos={alumnos} />}
        />

        <Route path="/acerca" element={<AcercaDe />} />
      </Routes>
    </div>
  );


}

