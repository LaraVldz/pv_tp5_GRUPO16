// src/App.jsx

import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import AlumnList from './components/AlumnList';
import AlumnForm from './components/AlumnForm';
import AcercaDe from './components/AcercaDe';
import DetalleAlumno from './components/DetalleAlumno';

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [mensajeExito, setMensajeExito] = useState('');

  // Limpia el mensaje de éxito después de 3 seg
  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => setMensajeExito(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);

  // Genera la próxima libreta (LU) autom
  const generarNuevaLU = prev =>
    prev.length === 0 ? 1 : Math.max(...prev.map(a => a.libreta)) + 1;

  // Función para agregar alumno
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

  // ── FORMULARIO WRAPPER (dentro de App para acceder a setMensajeExito) ──
  function FormularioWrapper({ agregarAlumno, actualizarAlumno, alumnos }) {
    const navigate = useNavigate();
    const { libreta } = useParams();
    const alumnoEditar = libreta
      ? alumnos.find(a => a.libreta === Number(libreta))
      : null;

    const handleSave = datos => {
      // Si estamos en edición, no validamos la LU
      if (alumnoEditar) {
        actualizarAlumno(alumnoEditar.libreta, datos);
        setMensajeExito('Alumno actualizado con éxito');
        navigate('/listaalumnos');
        return;
      }

      // Si estamos en “Agregar”, validamos que la LU no exista ya
      const nuevaLU = Number(datos.libreta);
      if (alumnos.some(a => a.libreta === nuevaLU)) {
        alert('Ya existe un alumno con LU ${nuevaLU}. Debe elegir otro número.');
        return; 
      }

      // Si pasa la validación, agregamos y redirigimos
      agregarAlumno(datos);
      setMensajeExito('Alumno agregado con éxito');
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
              mensajeExito={mensajeExito}
              clearMensaje={() => setMensajeExito('')}
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

        <Route
          path="/detalle/:libreta"
          element={<DetalleAlumno alumnos={alumnos} />}
        />

        <Route path="/acerca" element={<AcercaDe />} />
      </Routes>
    </div>
  );
  }