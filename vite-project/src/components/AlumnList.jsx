// src/components/AlumnList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function AlumnList({ alumnos, eliminarAlumno }) {
  // Si no hay alumnos, muestro mensaje y botón para agregar
  if (alumnos.length === 0) {
    return (
      <div className="list-container">
        <h2>Lista de Alumnos</h2>
        <p>No hay alumnos ingresados.</p>
        <Link to="/agregar">
          <button>Agregar Alumno</button>
        </Link>
      </div>
    );
  }

  // Si hay alumnos, muestro cada ítem con sus botones
  return (
    <div className="list-container">
      <h2>Lista de Alumnos</h2>
      <Link to="/agregar">
        <button>Agregar Alumno</button>
      </Link>

      <ul>
        {alumnos.map(a => (
          <li key={a.libreta} className="alumno-item">
            {/* Información básica */}
            <div className="alumno-info">
              <strong>{a.nombre} {a.apellido}</strong> — LU: {a.libreta}
            </div>

            {/* Botones de acciones */}
            <div className="alumno-actions">
              {/* 1) Ver Detalles */}
              <Link to={`/detalle/${a.libreta}`}>
                <button>Ver Detalles</button>
              </Link>

              {/* 2) Editar */}
              <Link to={`/editar/${a.libreta}`}>
                <button>Editar</button>
              </Link>

              {/* 3) Eliminar con confirmación */}
              <button
                onClick={() => {
                  const confirmar = window.confirm(
                    `¿Seguro que querés eliminar a ${a.nombre} ${a.apellido}?`
                  );
                  if (confirmar) {
                    eliminarAlumno(a.libreta);
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
