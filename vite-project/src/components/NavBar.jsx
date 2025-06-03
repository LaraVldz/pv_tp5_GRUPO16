//NavBar
import { NavLink } from "react-router-dom";
import "./NavBar.css"; 
import React,{ useState } from "react";

export default function NavBar() {

  //Menu hamburguesa
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(prev => !prev);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Botón de hamburguesa */}
        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className={`barra${menuAbierto ? " barra--abierta1" : ""}`}></span>
          <span className={`barra${menuAbierto ? " barra--abierta2" : ""}`}></span>
          <span className={`barra${menuAbierto ? " barra--abierta3" : ""}`}></span>
        </button>

          <div className={`navbar-links${menuAbierto ? " mostrar" : ""}`}>
              <NavLink to="/" end className="nav-link" onClick={cerrarMenu}>
                Inicio
              </NavLink>
              <NavLink to="/listaalumnos" className="nav-link" onClick={cerrarMenu}>
                Lista de Alumnos
              </NavLink>
              <NavLink to="/agregar" className="nav-link" onClick={cerrarMenu}>
                 Agregar Alumno
              </NavLink>
              <NavLink to="/acerca" className="nav-link" onClick={cerrarMenu}>
                 Acerca de Nosotros
              </NavLink>
          </div>
        </div>
       
    </nav>
  );

  }