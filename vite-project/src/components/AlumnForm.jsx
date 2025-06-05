import React, { useState, useEffect } from 'react';

export default function AlumnForm({ onSubmit, alumnoEditar, cancelarEdicion }) {
  const [libreta, setLibreta]     = useState('');
  const [nombre, setNombre]       = useState('');
  const [apellido, setApellido]   = useState('');
  const [curso, setCurso]         = useState('');
  const [email, setEmail]         = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono]   = useState('');

  useEffect(() => {
    if (alumnoEditar) {
      setLibreta(alumnoEditar.libreta.toString());
      setNombre(alumnoEditar.nombre);
      setApellido(alumnoEditar.apellido);
      setCurso(alumnoEditar.curso);
      setEmail(alumnoEditar.email);
      setDomicilio(alumnoEditar.domicilio);
      setTelefono(alumnoEditar.telefono);
    } else {
      setLibreta('');
      setNombre('');
      setApellido('');
      setCurso('');
      setEmail('');
      setDomicilio('');
      setTelefono('');
    }
  }, [alumnoEditar]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      libreta: alumnoEditar ? alumnoEditar.libreta : Number(libreta),
      nombre,
      apellido,
      curso,
      email,
      domicilio,
      telefono
    });
  };

  return (
    <div className="form-wrapper">
      <h2>{alumnoEditar ? "Editar Alumno" : "🙋‍♀️ Agregar Alumno"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {!alumnoEditar && (
          <div className="form-field">
            <label htmlFor="libreta">LU:</label>
            <input
              id="libreta"
              type="number"
              min="1"
              step="1"
              value={libreta}
              onChange={e => setLibreta(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-field">
          <label htmlFor="nombre">Nombre:</label>
          <input
           id="nombre"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="apellido">Apellido:</label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="curso">Curso:</label>
          <input
            id="curso"
            type="text"
            pattern="[A-Za-z0-9 ]+"
            title="Solo letras, números y espacios"
            value={curso}
            onChange={e => setCurso(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="domicilio">Domicilio:</label>
          <input
            id="domicilio"
            type="text"
            value={domicilio}
            onChange={e => setDomicilio(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            type="tel"
            pattern="\d+"
            inputMode="numeric"
            title="Solo números"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">
            {alumnoEditar ? 'Actualizar' : 'Guardar'}
          </button>
          {alumnoEditar && (
            <button type="button" onClick={cancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>  
  );
}