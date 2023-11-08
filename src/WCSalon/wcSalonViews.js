import { LitElement, html } from 'lit-element';
import stylesScss from './wcSalonStyle';

export class SalonesViews extends LitElement {
  constructor() {
    super();
    this.salones = [];
    this.salonIdActual = null;
  }

  static get styles() {
    return [stylesScss];
  }

  abrirAgregarSalon() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarSalon`);
    modal.style.display = "block";
    modal.style.background = "rgb(0,0,0,0.7)";
  }

  cerrarAgregarSalon() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarSalon`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  abrirActualizarSalon(salonId) {
    const salon = this.salones.find((s) => s.ID === salonId);

    if (salon) {
      this.shadowRoot.getElementById('piso').value = salon.piso;
      this.salonIdActual = salonId;
      const modal = this.shadowRoot.querySelector(`#modalActualizarSalon`);
      modal.style.display = "block";
    } else {
      console.error('Salon no encontrado para actualizar.');
    }
  }

  cerrarActualizarSalon() {
    const modal = this.shadowRoot.querySelector(`#modalActualizarSalon`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  render() {
    return html`
      <div>
        <h1>Lista de Salones</h1>
        <button @click="${() => this.abrirAgregarSalon()}">Agregar Salón</button>

        <table>
          <tr>
            <th>ID</th>
            <th>Piso</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
          ${this.salones.map(salon => html`
            <tr>
              <td>${salon.ID}</td>
              <td>${salon.piso}</td>
              <td>
                <button @click="${() => this.toggleEstado(salon)}">${salon.estado}</button>
              </td>
              <td>
                <button @click="${() => this.borrarSalon(salon.ID)}">Borrar</button>
                <button @click="${() => this.abrirActualizarSalon(salon.ID)}">Actualizar</button>

                <div class="modal" id="modalActualizarSalon" style="display: none;">
                  <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" @click=${() => this.cerrarActualizarSalon()}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="d-flex flex-column">
                          <label for="piso">Piso:</label>
                          <input class="p-2 border-10 border-1" id="piso" name="piso" placeholder="piso">
                        </div>
                      </div>
                      <div class="d-flex justify-content-center align-items-center m-3">
                        <button class="bg-icon text-white p-2 border-10" @click=${() => this.actualizarSalon()}>Actualizar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          `)}
        </table>

        <div class="modal" id="modalAgregarSalon" style="display: none;">
        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" @click=${(e)=>this.cerrarAgregarSalon()}>
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="d-flex flex-column">
                <label for="profesor">Id salon:</label>
                <input class=" p-2 border-10 border-1" id="salon" name="salon" placeholder="salon">
              </div>
              <div class="d-flex flex-column">
                <label for="capacidad">Piso:</label>
                <input class=" p-2 border-10 border-1" id="piso" name="piso" placeholder="piso">
              </div>
              <div class="d-flex flex-column">
                <label for="jornada">Estado:</label>
                <input class=" p-2 border-10 border-1" id="estado" name="estado" placeholder="estado">
              </div>
            </div>
            <div class="d-flex justify-content-center aling-items-center m-3">
              <button class="bg-icon text-white p-2 border-10" @click=${(e)=>this.agregarSalon()}>Agregar</buttton>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  saveSalonesToLocalStorage(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
  }

  limpiarFormulario() {
    this.shadowRoot.getElementById('salon').value = '';
    this.shadowRoot.getElementById('piso').value = '';
    this.shadowRoot.getElementById('estado').value = '';
  }


  agregarSalon() {
    
    const salon = this.shadowRoot.getElementById('salon').value;
    const piso = this.shadowRoot.getElementById('piso').value;
    const estado = this.shadowRoot.getElementById('estado').value;


    const nuevoSalon = {
      ID: salon, 
      piso: piso,
      estado: estado,
    };
    this.salones = [...this.salones, nuevoSalon];
      this.saveSalonesToLocalStorage(this.salones);
      this.requestUpdate();
      this.limpiarFormulario();

      this.cerrarAgregarSalon();
  }

  toggleEstado(salon) {
    salon.ESTADO = salon.ESTADO === "Activo" ? "Inactivo" : "Activo";
    this.saveSalonesToLocalStorage(this.salones);
    this.requestUpdate('salones');
  }

  borrarSalon(id) {
    this.salones = this.salones.filter(salon => salon.ID !== id);
    this.saveSalonesToLocalStorage(this.salones);
    this.requestUpdate('salones');
  }

  actualizarSalon() {
    const pisoActual = this.shadowRoot.getElementById('piso').value;

    if (this.salonIdActual !== null) {
      const indiceSalon = this.salones.findIndex((salon) => salon.ID === this.salonIdActual);

      if (indiceSalon !== -1) {
        this.salones[indiceSalon].piso = pisoActual;

        this.cerrarActualizarSalon();
        this.saveSalonesToLocalStorage(this.salones);
        this.salonIdActual = null;
        this.requestUpdate('salones');
      } else {
        console.error('Salon no encontrado para actualizar.');
      }
    } else {
      console.error('No se ha seleccionado un salon para actualizar.');
    }
  }

  saveSalonesToLocalStorage(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
  }

  getSalonesFromLocalStorage() {
    const salones = localStorage.getItem('salones');
    return salones ? JSON.parse(salones) : [];
  }
}

customElements.define('salones-views', SalonesViews);
