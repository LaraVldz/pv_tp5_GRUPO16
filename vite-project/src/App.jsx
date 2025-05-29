import React, { useState, useEffect, useMemo, useCallback, use } from 'react';
import './App.css'
import AlumnForm from './components/AlumnForm';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [alumnoEditar, setAlumnoEditar] = useState(null);

  console.log('Render de App');

  const obtenerSiguienteLU = () => {
    if (alumnos.length === 0) return 1;
    return Math.max(...alumnos.map((a) => a.libreta)) + 1;
  };

  const agregarAlumno = useCallback((alumno) => {
    const nuevoAlumno = { ...alumno, libreta: obtenerSiguienteLU() };
    setAlumnos((prev) => [...prev, nuevoAlumno]);
    setMostrarForm(false);
  },[alumnos]);

  const eliminarAlumno = useCallback((libreta) => {
    setAlumnos((prev) => prev.filter((a) => a.libreta !== libreta));
    if (alumnoEditar?.libreta === libreta) setAlumnoEditar(null);
  }, [alumnoEditar]);

  const actualizarAlumno = useCallback((libreta, datosActualizados) => {
    setAlumnos((prev) =>
      prev.map((a) => (a.libreta === libreta ? { ...a, ...datosActualizados } : a))
    );
    setAlumnoEditar(null);
    setMostrarForm(false);
  }, []);
  
  const manejarEditar = useCallback((alumno) => {
    setAlumnoEditar(alumno);
    setMostrarForm(true);
  }, []);

  const cancelarEdicion = useCallback(() => {
    setAlumnoEditar(null);
    setMostrarForm(false);
  }, []);

  return (
    <div className='app-container'>
      <button
          className="add-product-btn"
          onClick={() => {
            setMostrarForm(true);
            setAlumnoEditar(null);
          }}
        >
          Agregar Producto
        </button>
        {mostrarForm && (
        <AlumnForm
          agregarAlumno={agregarAlumno}
          actualizarAlumno={actualizarAlumno}
          alumnoEditar={alumnoEditar}
          cancelarEdicion={cancelarEdicion}
        />
      )}
    </div>
  )
}

export default App
