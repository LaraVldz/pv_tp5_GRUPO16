import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/listaalumnos">Lista de Alumnos</Link>
      <Link to="/agregar">Agregar Alumno</Link>
      <Link to="/acerca">Acerca de Nosotros</Link>
    </nav>
  );
}

export default NavBar;
