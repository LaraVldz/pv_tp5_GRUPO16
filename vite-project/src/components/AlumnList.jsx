import { Link } from "react-router-dom";
function AlumnList({ alumnos, manejarEditar, eliminarAlumno }) {
  return (
    <div>
      <h2>Lista de Alumnos</h2>
      <Link to="/agregar">
        <button>Agregar Alumno</button>
      </Link>
      <ul>
        {alumnos.map((a) => (
          <li key={a.libreta}>
            {a.nombre} {a.apellido} - {a.curso} - {a.email}
            <Link to={`/editar/${a.libreta}`}>
              <button>Editar</button>
            </Link>

            <button onClick={() => eliminarAlumno(a.libreta)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlumnList;