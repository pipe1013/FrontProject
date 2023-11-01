import { LitElement, html } from "lit-element";
import StylesMainEstudiantes  from "./WCMainEstudiantesStyle"

export class WCMainEstudiantesView extends LitElement{
    constructor(){
        super();
        // this.saludo="Inicio de sesión";
        // this.mensaje="";
        
    }


    static get properties(){
        return{
            // saludo:{
            //    type: String
            // },
            // mensaje:{
            //     type: String
            //  } 
        }
    }

    static get styles(){
        return[StylesMainEstudiantes]
    }

    render(){
        return html`
        <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>
        <div class="text-white m-5">
            <div class="d-flex aling-items-center justify-content-center flex-column">
                <h1>Estas a un paso de matricularte!</h1>
                <img src="./src/img/Estudiantes.jpg" alt="Estudiantes" class="h-25">
            </div>
            
            <h3>Conoces los requisitos para poderte matricularte en nuestro colegio?</h3>
        </div>
        `
    }
}

customElements.define("wc-mainestudiantes",WCMainEstudiantesView)