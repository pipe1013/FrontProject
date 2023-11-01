import { LitElement, html } from "lit-element";
import WCIndexStyle from "./WCIndexStyle";
import { WCMainEstudiantesView } from "../WCMainEstudiantes/WCMainEstudiantesView";





export class WCIndexview extends LitElement{
    constructor(){
        super();
        this.mainEstudiantes="";
        
    }

    static get scopedElements(){
        return {
            "wc-mainestudiantes":WCMainEstudiantesView
        };
    }

    static get properties(){
        return{
            mainEstudiantes:{
               type: String
            }
        }
    }

    static get styles(){
        return[WCIndexStyle]
    }

    
    mostrarMenu(){
        const sideMenu = this.shadowRoot.querySelector("#sideMenu");
        sideMenu.classList.remove("left-25")
        sideMenu.classList.add("left-3x")
        console.log(sideMenu)
    }

    ocultarMenu(){
        const sideMenu = this.shadowRoot.querySelector("#sideMenu");
        sideMenu.classList.add("left-25")
        sideMenu.classList.remove("left-3x")
    
    }
    
    mostrarMainEstudiantes(x){
        if(x){
            this.mainEstudiantes = html`<wc-mainestudiantes></wc-mainestudiantes>`
        }else{
            this.mainEstudiantes=html``
        }
        this.ocultarMenu()
        return this.mainEstudiantes
        
    }

    render(){
        return html`
        <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>
        <div class="d-flex">
            <div class="bg-dark vh-100 d-flex justify-content-center position-realtive w-3 z-index-1" @click=${(e)=>this.mostrarMenu()}>
                <i class="fas fa-house mt-5" style="color: #ffffff;"></i>
            </div>
            <div class="bg-dark w-25 vh-100 position-absolute left-25 animation" id="sideMenu">
                <div class="m-3">
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarMainEstudiantes(1)}>Matriculate aqui como estudiante!</button>
                    <button class="p-3 text-white bg-transparent border-0 m-3">Si eres profesor, por favor ingesa aqui!</button>
                </div>
            </div>

            <div class="bg-blue1 w-100" @click=${(e)=>this.ocultarMenu()}>
            ${this.mainEstudiantes}
            <div>
        </div>
        `
    }
}

customElements.define('wc-indexview',WCIndexview)