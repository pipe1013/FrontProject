import { LitElement, html } from "lit-element";
import WCACudienteStyle from "../WCAcudiente/WCACudienteStyle";


export class WCACudienteview extends LitElement {

  constructor() {
    super();
    this.acudientes = []; 
    this.documento = '';
    this.nombre = '';
    this.parentesco = '';
    this.edad = '';
    this.telefono = '';
  }

  static get properties() {
    return {
      acudientes: { type: Array },
      documento: { type: String },
      nombre: { type: String },
      parentesco: { type: String },
      edad: { type: String },
      telefono: { type: String },
    }
  }

  static get styles(){
    return[WCACudienteStyle]
}

  
  cargaAcudientes() {
    const data = localStorage.getItem('acudientes');
    return data ? JSON.parse(data) : [];
  }

  guardarAcudientes() {
    localStorage.setItem('acudientes', JSON.stringify(this.acudientes));
  }

  registrarAcudiente() {
    if (this.documento && this.nombre && this.parentesco && this.edad && this.telefono) {
      const nuevoAcudiente = {
        documento: this.documento,
        nombre: this.nombre,
        parentesco: this.parentesco,
        edad: this.edad,
        telefono: this.telefono
      };
      this.acudientes.push(nuevoAcudiente);
      this.guardarAcudientes();

      this.documento = '';
      this.nombre = '';
      this.parentesco = '';
      this.edad = '';
      this.telefono = '';

      this.requestUpdate();
    }
    this.cerrarModal()
  }

  actualizarAcudiente(acudiente) {
    console.log(acudiente);
    let arregloAcudiente = this.acudientes.find((arregloAcudiente)=>arregloAcudiente.documento === acudiente)
    console.log(arregloAcudiente);
    let documento = this.shadowRoot.querySelector('#documentoActualizar').value
    let nombre = this.shadowRoot.querySelector('#nombreActualizar').value
    let parentesco = this.shadowRoot.querySelector('#parentescoActulizar').value
    let edad = this.shadowRoot.querySelector('#edadActualizar').value
    let telefono = this.shadowRoot.querySelector('#telefonoActualizar').value

    console.log(documento, nombre,parentesco,edad,telefono)

    arregloAcudiente.documento = documento
    arregloAcudiente.nombre = nombre
    arregloAcudiente.parentesco = parentesco
    arregloAcudiente.edad = edad
    arregloAcudiente.telefono = telefono

    this.requestUpdate()
    this.cerrarModalActualizar()
  }
  
  eliminarAcudiente(acudiente) {
    if (acudiente && acudiente.documento) {
      this.acudientes = this.acudientes.filter(p => p.documento !== acudiente.documento);
      this.guardarAcudientes();
    } else {
      console.log("Error Al Eliminar El Acudiente");
    }
  }
  
abrirModal() {  
  const miModal = this.shadowRoot.querySelector("#modalRegistro");
  miModal.style.display = "block";
  miModal.style.background="rgb(0,0,0,0.7)";
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

buscarDatos() {
  const documento = this.shadowRoot.querySelector("#documento").value;
  const nombre = this.shadowRoot.querySelector("#nombre").value;

  const acudienteEncontrado = this.acudientes.find(
    (acudiente) => acudiente.documento === documento && acudiente.nombre === nombre
  );

  if (acudienteEncontrado) {
    this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Usuario Encontrado</h1>
          <p><strong>Documento:</strong> ${acudienteEncontrado.documento}</p>
          <p><strong>Nombre:</strong> ${acudienteEncontrado.nombre}</p>
          <p><strong>Edad:</strong> ${acudienteEncontrado.parentesco}</p>
          <p><strong>Materia:</strong> ${acudienteEncontrado.edad}</p>
          <p><strong>Jornada:</strong> ${acudienteEncontrado.telefono}</p>
        </div>
      </div>
    `;
  } else {
    this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Acudiente No Encontrado</h1>
        </div>
      </div>
    `;
  }
  this.requestUpdate();
}

static get scopedElements(){
  return{
    "my-acudiente": MyElement,
  };
}

render() {
  return html`
    <style>
      @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");
      @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
    
      .container {
        width: 100%;
        max-width: 1200px;
      }
    </style>

    <div class="bg-light vw-100 vh-100 d-flex">

        <div class="col m-5">
            <button
                id="botonAbrirModal"
                class="btn bg-blue1 text-white  mt-1 p-3>"
                @click="${this.abrirModal}">
                Nueva acudiente<i class="fas fa-plus fa-beat-fade"></i>
            </button>
            <div class="modal" id="modalRegistro" tabindex="-1" role="dialog" style="display: none;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModal}"></button>
                        </div>
                        <div class="modal-body">
                            <form id="registroForm">
                                <div class="mb-3">
                                    <label for="documento" class="form-label">Documento De Acudiente</label>
                                    <input type="text" class="form-control" id="documento" .value="${this.documento}" @input="${(e) => (this.documento = e.target.value)}">
                                </div>
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombre" .value="${this.nombre}" @input="${(e) => (this.nombre = e.target.value)}">
                                </div>
                                <div class="mb-3">
                                    <label for="parentesco" class="form-label">Parentesco</label>
                                    <input type="text" class="form-control" id="parentesco" .value="${this.parentesco}" @input="${(e) => (this.parentesco = e.target.value)}">
                                </div>
                                <div class="mb-3">
                                    <label for="edad" class="form-label">Edad</label>
                                    <input type="text" class="form-control" id="edad" .value="${this.edad}" @input="${(e) => (this.edad = e.target.value)}">
                                </div>
                                <div class="mb-3">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" class="form-control" id="telefono" .value="${this.telefono}" @input="${(e) => (this.telefono = e.target.value)}">
                                </div>
                                <button type="button" class="btn btn-primary" @click="${this.registrarAcudiente}">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-color-secondary1 d-flex justify-content-center  align-items-center h-100">
                <div class="border-dark col   w-75 h-75">
                    <table class="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Documento</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Parentesco</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.acudientes.map(
                        (acudiente) => html`
                        <tr>
                            <td>${acudiente.documento}</td>
                            <td>${acudiente.nombre}</td>
                            <td>${acudiente.parentesco}</td>
                            <td>${acudiente.edad}</td>
                            <td>${acudiente.telefono}</td>
                            <td><button class="btn btn-primary" @click="${() => { console.log(acudiente); this.abrirModalActualizar(acudiente.documento); }}">Actualizar</button></td>
                            <td><button class="btn btn-danger" @click="${() => this.eliminarAcudiente(acudiente)}">Eliminar</button></td>
                        </tr>
                        <div class="modal" id="modalActualizar" tabindex="-1" role="dialog" style="display: none;">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Formulario de Actualización De Acudiente</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModalActualizar}"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="actualizarForm">
                                            <div class="mb-3">
                                                <label for="documento" class="form-label"> Documento De Acudiente</label>
                                                <input type="text" class="form-control" id="documentoActualizar" .value="${acudiente.documento}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="nombre" class="form-label">Documento</label>
                                                <input type="text" class="form-control" id="nombreActualizar" .value="${acudiente.nombre}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="parentesco" class="form-label">Parentesco</label>
                                                <input type="text" class="form-control" id="parentescoActulizar" .value="${acudiente.parentesco}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="edad" class="form-label">Edad</label>
                                                <input type="text" class="form-control" id="edadActualizar" .value="${acudiente.edad}" >
                                            </div>
                                            <div class="mb-3">
                                                <label for="telefono" class="form-label">Telefono</label>
                                                <input type="text" class="form-control" id="telefonoActualizar" .value="${acudiente.telefono}" >
                                            </div>

                                            <button type="button" class="btn btn-primary" @click="${() => this.actualizarAcudiente(acudiente.documento)}">Actualizar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>`
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  `;
}
}

customElements.define('my-acudiente', WCACudienteview)