import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <img src="/logo.png" alt="Logo del sistema" className="logo-home" />

      <h1>Bienvenido al Sistema de Gestión de Alumnos</h1>

      <p className="home-text">
        Esta aplicación fue desarrollada utilizando React con el objetivo de facilitar la administración 
        de datos de estudiantes. Aquí podrás agregar nuevos alumnos, editar la información existente o 
        eliminar registros que ya no sean necesarios.
        <br /><br />
        La aplicación utiliza rutas dinámicas mediante <code>react-router-dom</code>, y maneja el estado interno con 
        <code>useState</code> y <code>useCallback</code>. Aunque los datos se mantienen en memoria (sin una base de datos real), 
        este proyecto demuestra cómo implementar una arquitectura CRUD (Crear, Leer, Actualizar, Eliminar) 
        de forma estructurada en una SPA (Single Page Application).
        <br /><br />
        A medida que avances, podrás acceder a las diferentes secciones desde el menú de navegación para 
        comenzar a gestionar la información académica de manera eficiente.
      </p>

      <blockquote className="home-quote">
        “La educación es el arma más poderosa para cambiar el mundo.” – Nelson Mandela
      </blockquote>

      <h2 className="home-subtitle">📚 En esta aplicación podrás:</h2>

      <ul className="features-list">
        <li>📌 Crear y registrar nuevos alumnos</li>
        <li>✏️ Editar información de forma rápida</li>
        <li>📋 Visualizar y eliminar registros</li>
        <li>🔍 Navegar fácilmente entre secciones</li>
      </ul>
    </div>
  );
}

export default Home;
