import { css } from "lit-element";

export default css `
/* Estilos para el fondo oscurecido cuando se muestra la ventana modal */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Color de fondo oscurecido con opacidad */
    z-index: 1000; /* Asegura que el fondo esté por encima de todo lo demás */
    display: none; /* Ocultar por defecto */
  }
  
  /* Estilos para centrar la ventana modal en la pantalla */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001; /* Asegura que la ventana modal esté por encima del fondo */
    display: none; /* Ocultar por defecto */
  }
  
  /* Agrega transiciones suaves para una apertura y cierre de la ventana modal */
  .modal.show, .overlay.show {
    display: block;
    transition: opacity 0.3s ease-in-out;
  }
  
  /* Estilos para la ventana modal */
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Agrega más estilos de la ventana modal según sea necesario */
  .bg-blue1{
    background-color:#265D80;
}
#botonAbrirModal:hover{
  background-color:gray;
}

`