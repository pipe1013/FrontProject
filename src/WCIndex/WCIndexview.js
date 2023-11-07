import { LitElement, html } from "lit-element";
import WCIndexStyle from "./WCIndexStyle";
import { WCMainEstudiantesView } from "../WCMainEstudiantes/WCMainEstudiantesView";
import { WCMainProfesoresView } from "../WCMainProfesores/WCMainProfesoresView";
import { WCLoginView } from "../WCLogin/WCLoginView";
import { WCAcudienteview } from "../WCACudiente/WCACudienteview";






export class WCIndexview extends LitElement{
    constructor(){
        super();
        this.main="";
        this.mainProfesores="";
        this.arreglos={
            Profesores:[
                {
                documento: '1019762839',
                nombre:'Brayan',
                edad:'18',
                materia:'Programación',
                jornada: 'Tarde',
                curso: '4',
                contraseña: 'Brayan123'
                }
            ]
        }
        
    }

    static get scopedElements(){
        return {
            "wc-mainestudiantes":WCMainEstudiantesView,
            "wc-mainprofesoresview":WCMainProfesoresView,
            "wc-loginview":WCLoginView,
            "my-acudiente":WCAcudienteview
        };
    }

    static get properties(){
        return{
            main:{
                type: String
            },
            mainProfesores:{
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
            this.main = html`<wc-mainestudiantes></wc-mainestudiantes>`
        }else{
            this.main=html``
        }
        this.ocultarMenu()
        return this.main
        
    }


    mostrarLogin(x){
        if(x){
            this.main = html `<wc-loginview .profesores="${this.arreglos.Profesores}"></wc-loginview>`
        }else{
            this.main=html``
        }
        this.ocultarMenu()
        return this.main
    }

    mostrarAcudiente(x){
        if(x){
            this.main = html `<my-acudiente></my-acudiente>`
        }else{
            this.main=html``
        }
        this.ocultarMenu()
        return this.main
    }

    render(){
        return html`
        <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>
        <div class="d-flex h-100">
            <div class="bg-dark vh-100 d-flex justify-content-center position-realtive w-3 z-index-1" @click=${(e)=>this.mostrarMenu()}>
                <i class="fas fa-house mt-5" style="color: #ffffff;"></i>
            </div>
            <div class="bg-dark w-25 vh-100 position-absolute left-25 animation" id="sideMenu">
                <div class="m-3">
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarMainEstudiantes(1)}>Matriculate aqui como estudiante!</button>
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarAcudiente(1)}>Inscribite aqui como acudiente para tu hijo!</button>
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarLogin(1)}>Login!</button>
                </div>
            </div>

            <div class="w-100" @click=${(e)=>this.ocultarMenu()}>
            ${this.main}
            
            </div>
        `
    }
}

customElements.define('wc-indexview',WCIndexview)