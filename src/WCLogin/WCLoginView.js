import { LitElement, html } from "lit-element";




export class WCLoginView extends LitElement{
    constructor(){
        super();
        this.saludo="Inicio de sesión";
        this.mensaje="";
        this.main=""
    }


    static get properties(){
        return{
            saludo:{
               type: String
            },
            mensaje:{
                type: String
             },
             profesores:{
                type: Array
            },
            main:{
                type:String
            }
        }
    }

    static get scopedElements(){
        return {
            "wc-mainprofesoresview":WCMainProfesoresView,
        };
    }

    mostrarMainProfesores(x){
        if(x){
            let login=this.shadowRoot.querySelector("#login")
            login.innerHTML = '';
            this.main = html`<wc-mainprofesoresview .profesores="${this.profesores}"></wc-mainprofesoresview>`
        }else{
            this.main=html``
        }
        return this.main
        
    }

    ingresarLogin(){
        let username = this.shadowRoot.querySelector('#username').value;
        let password = this.shadowRoot.querySelector('#password').value;


        if (username == null || username == undefined || username == '') {
            this.mensaje='Atención...campo nombre vacio';
            this.mostrarError()
            return false;
        } 
        else if (password == null || password == undefined || password == '') {
            this.mensaje='Atención...campo contraseña vacio';
            this.mostrarError()
            return false;
        }else{

            let credenciales = this.profesores.find((profe) => profe.documento === username && profe.contraseña === password);
            if(credenciales==null || credenciales == undefined){
                alert("credenciales de acceso incorrectas")
            }else{
                this.mostrarMainProfesores(1)
            }
            

        }
        
    }


    
    mostrarError(){
        return html `<div class="position-absolute bottom-0 start-50 translate-middle z-index-1">${this.mensaje}</div>`
    }

    static get styles(){
        return[]
    }

    render(){
        return html `
        <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>
    
        <div class="container position-relative d-flex justify-content-center aling-items-center" id="login">
            <div class="position-absolute bottom-50 start-50 translate-middle z-index-1" ><i class="fas fa-user fa-5x bg-icon p-5 rounded-circle" style="color: #ffffff;"></i></div>
            <div class="container border border-0 border-20 px-5 py-5 bg-whiteTransparent position-relative w-50">

                <div class="mb-3 mt-5 d-flex" >
                    <span class="input-group-text bg-icon"><i class="fas fa-user" style="color: #ffffff;"></i></span>
                    <input type="text" id="username" class="w-100 rounded form-control bg-input placeholder-white" placeholder="Usuario"></input>  
                </div>
                <div class="mb-3 d-flex">
                    <span class="input-group-text bg-icon"><i class="fas fa-lock" style="color: #ffffff;"></i></span>
                    <input type="password" id="password" class="w-100 rounded form-control bg-input placeholder-white" placeholder="Password"></input>
                </div>  
                <div class="d-flex justify-content-between">
                    <div class="form-check">
                        <input type="checkbox" name="remember" id="remember" class="form-check-input">
                        <label for="remember" class="form-check-label">Recuerdame</label>
                    </div>
                    <div class="ml-auto">
                        <span>Recuperar contraseña</span>
                    </div>
                <button class="btn position-absolute start-50 translate-middle-x mt-1 w-25 bottom-rounded p-3" @click=${(e)=>this.ingresarLogin()}><strong>LOGIN<strong></button>
                ${this.mostrarError()}
                </div>                         
            </div> 
        </div>
        ${this.main}
        `
    }
}

customElements.define('wc-loginview',WCLoginView)