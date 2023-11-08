import { css } from "lit-element";

export default css`
/* Estilos generales */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

h1 {
  color: #333;
}

/* Estilos para la tabla */
table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 15px;
  text-align: left;
}

/* Estilos para los botones y la modal */
button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

/* Personaliza los estilos específicos para tu vista de salones */
/* Por favor, agrega tus estilos específicos aquí */

`;