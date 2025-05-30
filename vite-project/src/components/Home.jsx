function Home() {
  return (
    <div>
      <h1>Bienvenido al Sistema de Gestión de Alumnos</h1>

      <p style={{ maxWidth: '700px', lineHeight: '1.6' }}>
        Esta aplicación fue desarrollada utilizando React con el objetivo de facilitar la administración 
        de datos de estudiantes. Aquí podrás agregar nuevos alumnos, editar la información existente o 
        eliminar registros que ya no sean necesarios.
        <br /><br />
        La aplicación utiliza rutas dinámicas mediante `react-router-dom`, y maneja el estado interno con 
        `useState` y `useCallback`. Aunque los datos se mantienen en memoria (sin una base de datos real), 
        este proyecto demuestra cómo implementar una arquitectura CRUD (Crear, Leer, Actualizar, Eliminar) 
        de forma estructurada en una SPA (Single Page Application).
        <br /><br />
        A medida que avances, podrás acceder a las diferentes secciones desde el menú de navegación para 
        comenzar a gestionar la información académica de manera eficiente.
      </p>
    </div>
  );
}

export default Home;
