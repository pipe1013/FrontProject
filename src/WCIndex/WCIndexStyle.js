import { css } from "lit-element";

export default css `
.w-3{
    width:3%;
}
.left-25{
    left:-25%!important;
}
.animation{  
    transition: 1s;
}

.left-3x{
    left: 3%!important;
}
.z-index-1{
    z-index:1;
}
.bg-blue1{
    background-color:#265D80;
}


/* Alturas personalizadas */

.h-35{
    height: 35%;
}

.h-65{
    height: 65%;
}

.h-55{
    height: 55%;
}

/* Anchos personalizados */

.vw-93{
    width: 93vh;
}

.w-7{
    width: 7%;
}


/* Bordes de contenido Personalizados */

.border-content{
    background-color: #3A8F66;
    border: 3px;
    border-color: #285E44;
    border-style: solid;
    border-radius: 4px;   
}

.border-content2{
    background-color: #b3dacd6b;
    border: 2px;
    border-color: #14AE5C;
    border-style: solid;
    border-radius: 5px;  
}

.border-content3{
    background-color: White;
    border: 4px;
    border-color: #898888;
    border-style: solid;
    border-radius: 5px; 
}
.border-content3-01{
    background-color: White;
    border: 4px;
    border-color: #898888;
    border-style: solid;
    border-radius: 5px; 
}

.border-content4{
    background-color: #E6E6E6;
    border: 2px;
    border-color: #898888;
    border-style: solid;
    border-radius: 10px; 
}

/* Bordes de Lista personalizado */

.border-list{
    background-color: #50C393;
    border-color: #285E44;
    border-style: solid;
    border-radius: 10px;
}

.border-list2{
    background-color: white;
    border-color: #898888;
    border-style: solid;
    border-radius: 10px;
}

/* Espacio foto de perfil */

.rounder{
    background-color: white;
    border-radius: 50px;
    height:55px;
    width:55px;
}

/* Borde Especial para Botones */

.input-1{
    border: 2px;
    border-color: black;
    border-style: solid;
    border-radius: 10px; 
}

/* Botones & Color de Listas (Perfil)

.bg-danger{
    background-color: #C35050;
    border: 3px;
    border-color: #8b3838;
    border-style: solid;
    border-radius: 10px; 
}

.bg-success{
    background-color: #50C393;
    border: 3px;
    border-color: #285E44;
    border-style: solid;
    border-radius: 10px;   
}

/* Estilos base de la tarjeta */
.card {
    position: relative;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden; /* Oculta el contenido que desborda el div */
}

.card img {
    max-width: 100%;
    height: auto;
    transition: transform 0.3s;
}

/* Div de información oculto inicialmente */
.card-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Fondo con opacidad */
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0; /* Inicialmente oculto */
    transition: opacity 0.3s; /* Transición suave para la opacidad */
}

.card h2, .card p {
    margin: 5px;
}


.card:hover .card-info {
    opacity: 1; 
}

`
