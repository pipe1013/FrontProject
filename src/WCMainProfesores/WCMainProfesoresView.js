import { LitElement, html } from "lit-element";
import WCMainProfesoresStyle from "./WCMainProfesoresStyle";
import { wcCursosView } from "../WCCurso/wcCursosView";
import { SalonesViews } from "../WCSalon/wcSalonViews";

export class WCMainProfesoresView extends LitElement {

    constructor() {
        super();
        this.nombre = '';
        this.documento = '';
        this.edad = '';
        this.materia = '';
        this.jornada = '';
        this.curso = '';
    }

    static get properties() {
        return {
            nombre: { type: String },
            documento: { type: String },
            profesores:{
                type: Array
            },
            edad: { type: String },
            materia: { type: String },
            jornada: { type: String },
            curso: { type: String },
        }
    }

    static get scopedElements(){
        return {
            "cursos-views":wcCursosView,
            "salones-views":SalonesViews
        };
    }


    static get styles(){
        return[WCMainProfesoresStyle]
    }

    mostrarCursos(){
        let main = this.shadowRoot.querySelector('#main')
        main.innerHTML=`<cursos-views></cursos-views>`
    }
    mostrarSalones(){
        let main = this.shadowRoot.querySelector('#main')
        main.innerHTML=`<salones-views></salones-views>`
    }

    cargarProfesores() {
        const data = localStorage.getItem('profesores');
        return data ? JSON.parse(data) : [];
    }

    guardarProfesores() {
        localStorage.setItem('profesores', JSON.stringify(this.profesores));
    }

    registrarProfesor() {
        if (this.documento && this.nombre && this.edad && this.materia && this.jornada && this.curso) {
            const nuevoProfesor = {
                documento: this.documento,
                nombre: this.nombre,
                edad: this.edad,
                materia: this.materia,
                jornada: this.jornada,
                curso: this.curso
            };
            this.profesores.push(nuevoProfesor);
            this.guardarProfesores();

            this.documento = '';
            this.nombre = '';
            this.edad = '';
            this.materia = '';
            this.jornada = '';
            this.curso = '';

            this.requestUpdate();
        }
        this.cerrarModal()
    }


    actualizarProfesor(profesor) {
        console.log(profesor);
        let arregloProfesor = this.profesores.find((arregloProfesor) => arregloProfesor.documento === profesor)
        console.log(arregloProfesor);
        let documento = this.shadowRoot.querySelector('#documentoActualizar').value
        let nombre = this.shadowRoot.querySelector('#nombreActualizar').value
        let edad = this.shadowRoot.querySelector('#edadActualizar').value
        let materia = this.shadowRoot.querySelector('#materiaActualizar').value
        let jornada = this.shadowRoot.querySelector('#jornadaActualizar').value
        let curso = this.shadowRoot.querySelector('#cursoActualizar').value

        console.log(documento, nombre, edad, materia, jornada, curso)

        arregloProfesor.documento = documento
        arregloProfesor.nombre = nombre
        arregloProfesor.edad = edad
        arregloProfesor.materia = materia
        arregloProfesor.jornada = jornada
        arregloProfesor.curso = curso

        this.requestUpdate()
    }


    eliminarProfesor(profesorDocumento) {
        const indice = this.profesores.findIndex(profesor => profesor.documento === profesorDocumento);
        if (indice !== -1) {
            this.profesores.splice(indice, 1); // Elimina 1 elemento a partir del índice encontrado
            this.requestUpdate()
        } else {
            console.log("Profesor no encontrado");
        }
    }
    

    abrirModal() {
        const miModal = this.shadowRoot.querySelector("#modalRegistro");
        miModal.style.display = "block";
        miModal.style.background="rgb(0,0,0,0.7)"
        
    }


    cerrarModal() {
        const miModal = this.shadowRoot.querySelector("#modalRegistro");
        miModal.style.display = "none";
        miModal.style.background="none"
    }

    abrirModalActualizar() {
        const miModal = this.shadowRoot.querySelector("#modalActualizar");
        miModal.style.display = "block";
        miModal.style.background="rgb(0,0,0,0.7)"
    }


    cerrarModalActualizar() {
        console.log("modal cerrado")
        const miModal = this.shadowRoot.querySelector("#modalActualizar");
        miModal.style.display = "none";
        miModal.style.background="none"
    }



    navigate(location) {
        Router.go(location);

    }


    buscarDatos() {
        const documento = this.shadowRoot.querySelector("#documento").value;
        const nombre = this.shadowRoot.querySelector("#nombre").value;

        const profesorEncontrado = this.profesores.find(
            (profesor) => profesor.documento === documento && profesor.nombre === nombre
        );

        if (profesorEncontrado) {
            this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Usuario Encontrado</h1>
          <p><strong>Documento:</strong> ${profesorEncontrado.documento}</p>
          <p><strong>Nombre:</strong> ${profesorEncontrado.nombre}</p>
          <p><strong>Edad:</strong> ${profesorEncontrado.edad}</p>
          <p><strong>Materia:</strong> ${profesorEncontrado.materia}</p>
          <p><strong>Jornada:</strong> ${profesorEncontrado.jornada}</p>
          <p><strong>Curso:</strong> ${profesorEncontrado.curso}</p>
        </div>
      </div>
    `;
        } else {
            this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Profesor no encontrado</h1>
        </div>
      </div>
    `;
        }
        this.requestUpdate();
    }

    static get scopedElements() {
        return {
            "my-profesor": MyElement,
        };
    }

    render() {
        return html`
        <style>
            @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>
        <nav>
            <ul class="d-flex list-unstyled">
                <li class="mx-3"><button class="btn bg-blue1 text-white  mt-1 p-3" @click=${(e)=>this.mostrarSalones()}>Registrar salon</button></li>
                <li class="mx-3"><button class="btn bg-blue1 text-white  mt-1 p-3" @click=${(e)=>this.mostrarCursos()}>Registrar curso</button></li>
            </ul>
        </nav>
<div class="d-flex flex-column justify-content-center aling-items-center m-100" id="main">
    <div class=" d-flex flex-column ">
        <!-- Sección a la derecha -->
        <div class="container-fluid">
            <div class="page-header">
                <div class="row align-items-center justify-content-between">
                    <div class="m-3">
                        <h1>Profesores</h1>
                    </div>
                    <div class="col-auto">
                        <a class="btn bg-blue1 text-white  mt-1 p-3" href="javascript:;" @click="${this.abrirModal}">
                        <i class="bi-person-plus-fill me-1"></i> Nuevo</a>
                    </div>
                    
                    <div class="modal " id="modalRegistro" tabindex="-1" role="dialog" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModal}"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="registroForm">
                                        <div class="mb-3">
                                            <label for="nombre" class="form-label">Nombre de profesor</label>
                                            <input type="text" class="form-control" id="nombre" .value="${this.nombre}" @input="${(e) => (this.nombre = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="identificacion" class="form-label">Documento</label>
                                            <input type="text" class="form-control" id="identificacion" .value="${this.documento}" @input="${(e) => (this.documento = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="campana" class="form-label">Edad</label>
                                            <input type="text" class="form-control" id="campana" .value="${this.edad}" @input="${(e) => (this.edad = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="telefono" class="form-label">Materia</label>
                                            <input type="text" class="form-control" id="telefono" .value="${this.materia}" @input="${(e) => (this.materia = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="telefono" class="form-label">Jornada</label>
                                            <input type="text" class="form-control" id="telefono" .value="${this.jornada}" @input="${(e) => (this.jornada = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="estado" class="form-label">Curso</label>
                                            <input type="text" class="form-control" id="estado" .value="${this.curso}" @input="${(e) => (this.curso = e.target.value)}">
                                        </div>
                                        <button type="button" class="bg-blue1 text-white" @click="${this.registrarProfesor}">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ${this.profesores.map(
        (profesor) => html`
            <div class="d-flex m-5 border-50">
                <div class="w-25 d-flex div-icon-border aling-items-center justify-content-center">
                    <i class="fa-solid fa-user fa-5x m-3"></i>
                </div>
        
                <div class="w-50 p-3">
                    <div>
                        <h4>Nombre: ${profesor.nombre}</h4>
                    </div>

                    <div class="d-flex w-100">
                        <div class="w-50">Documento: ${profesor.documento}</div>
                        <div class="w-50">Edad: ${profesor.edad}</div>
                    </div>
                    <div class="d-flex w-100">
                        <div class="w-50">Materia: ${profesor.materia}</div>
                        <div class="w-50">Jornada: ${profesor.jornada}</div>
                    </div>
                    <div class="d-flex w-100">
                        curso: ${profesor.curso}
                    </div>
                </div>
                <div class="w-25 d-flex flex-column aling-items-center justify-content-center">
                    <button class="btn btn-primary w-50 m-2" @click="${() => { console.log(profesor); this.abrirModalActualizar(profesor.documento); }}">Actualizar</button>
                    <button class="btn btn-danger w-50 m-2" @click="${() => this.eliminarProfesor(profesor.documento)}">Eliminar</button>
                </div>
            </div>
        </div>
        
        <div class="modal" id="modalActualizar" tabindex="-1" role="dialog" style="display: none;">
            <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Formulario de Actualización</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModalActualizar}"></button>
                    </div>
                    <div class="modal-body">
                        <form id="actualizarForm">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre de profesor</label>
                                <input type="text" class="form-control" id="nombreActualizar" .value="${profesor.nombre}">
                            </div>
                            <div class="mb-3">
                                <label for="identificacion" class="form-label">Documento</label>
                                <input type="text" class="form-control" id="documentoActualizar" .value="${profesor.documento}">
                            </div>
                            <div class="mb-3">
                                <label for="campana" class="form-label">Edad</label>
                                <input type="text" class="form-control" id="edadActualizar" .value="${profesor.edad}">
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Materia</label>
                                <input type="text" class="form-control" id="materiaActualizar" .value="${profesor.materia}" >
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Jornada</label>
                                <input type="text" class="form-control" id="jornadaActualizar" .value="${profesor.jornada}" >
                            </div>
                            <div class="mb-3">
                                <label for="estado" class="form-label">Curso</label>
                                <input type="text" class="form-control" id="cursoActualizar" .value="${profesor.curso}">
                            </div>
                            <button type="button" class="btn btn-primary" @click="${() => this.actualizarProfesor(profesor.documento)}">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        `
        )}
`
    }
}

customElements.define('wc-mainprofesoresview', WCMainProfesoresView)