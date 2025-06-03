# 🗒️ pv_tp5_GRUPO16
=======
## 📝 Sistema de Gestión de Alumnos

## Esta aplicación web fue desarrollada utilizando **React** y **Vite**. Permite:
- Agregar nuevos alumnos.
- Editar datos de alumnos existentes.
- Eliminar alumnos (con confirmación).
- Ver en detalle la información de cada alumno.

## La aplicación está estructurada completamente con componentes funcionales de React y hace uso adecuado del manejo de eventos y la navegación entre vistas para garantizar una experiencia de usuario fluida e intuitiva.

## Rutas principales

- `/` → Home (pantalla de bienvenida).
- `/listaalumnos` → Lista de Alumnos (ver, editar, eliminar, ver detalles).
- `/agregar` → Agregar Alumno (formulario).
- `/editar/:libreta` → Editar Alumno.
- `/detalle/:libreta` → Detalle de Alumno.
- `/acerca` → Acerca de Nosotros (info del TP y miembros).

## Validaciones del formulario

- **LU**: `type="number" min="1" step="1"` (solo enteros ≥1).
- **LU única**: el sistema chequea en `App.jsx` que no exista ya un alumno con esa misma LU. Si hay duplicado, muestra un `alert("Ya existe un alumno con LU X…")` y no permite guardar.
- **Nombre/Apellido/Domicilio**: `type="text" required`.
- **Curso**: `type="text" pattern="[A-Za-z0-9 ]+"` (solo letras, números y espacios).
- **Email**: `type="email" required`.
- **Teléfono**: `type="tel" pattern="\d+"` (solo dígitos).

## 💻 INTEGRANTES / Usuario GitHub
## BALDELOMAR DARIAN / Darian-Balde
## SUILICE LUCA MAURICIO / MauricioSuilice19
## SURUGUAY JESUS IGNACIO / IgnacioJES
## TEJERINA GUADALUPE ORIANA / guadalupetejerina
## VALDEZ LARA MARIEL / LaraVldz



## Repositorio de Programación Visual 2025 - TP N°5
