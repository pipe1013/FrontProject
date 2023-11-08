import { css } from "lit-element";

export default css`
/* Estilo para el contenedor principal */
div {
  text-align: center; /* Centra el contenido del div */
}

/* Estilo para el título */
h1 {
  margin: 0; /* Elimina el margen superior predeterminado */
}

/* Estilo para el botón "Agregar Curso" */
#agregar-button {
  float: right;
  margin-right: 20px;
  margin-top: 0px;
}

/* Estilo para la tabla */
#cursos-list {
  width: 90%;
  margin:20px
  border-collapse: collapse;
  margin-top: 40px;
}

#cursos-list th, #cursos-list td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
  height: 30px; /* Altura fija de las filas */
}

/* Estilo para los botones */
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
}

/* Estilo para el botón de "Agregar Curso" */
#agregar-button {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
}



/* Estilos para la ventana modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-dialog {
  width: 30%; /* Ancho del 30% de la pantalla */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Estilos para el botón de cerrar */
.modal-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: black; /* Cambiar el color del icono a negro */
}

/* Estilos para el formulario */
.modal-body {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Estilos para los campos de entrada */
label {
  font-weight: bold;
  margin-bottom: 10px; /* Aumentar el margen a 10% */
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px; /* Aumentar el margen a 10% */
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

`;