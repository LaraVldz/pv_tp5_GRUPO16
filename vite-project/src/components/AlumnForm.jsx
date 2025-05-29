import React, { useState, useEffect } from 'react';

const AlumnForm = ({ agregarAlumno, actualizarAlumno, alumnoEditar, cancelarEdicion }) => {
  const [libreta, setLU] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [curso, setCurso] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (alumnoEditar) {
      setNombre(alumnoEditar.nombre);
      setApellido(alumnoEditar.apellido);
      setCurso(alumnoEditar.curso);
      setEmail(alumnoEditar.email);
      setDomicilio(alumnoEditar.domicilio);
      setTelefono(alumnoEditar.telefono);
    } else {
      setNombre('');
      setApellido('');
      setCurso('');
      setEmail('');
      setDomicilio('');
      setTelefono('');
    }
  }, [alumnoEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAlumno = { nombre, apellido, curso, email, domicilio, telefono };

    if (alumnoEditar) {
      actualizarAlumno(alumnoEditar.libreta, nuevoAlumno);
    } else {
      agregarAlumno(nuevoAlumno);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Domicilio"
        value={domicilio}
        onChange={(e) => setDomicilio(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <div className="form-buttons">
        <button type="submit">{alumnoEditar ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={cancelarEdicion}>Cancelar</button>
      </div>
    </form>
  );
};

export default AlumnForm;