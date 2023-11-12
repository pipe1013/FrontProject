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
              <button
              @click="${() => this.toggleEstado(salon)}"
              data-id="${salon.ID}"
              class="${salon.estado === 'Activo' ? 'btn-activo' : 'btn-inactivo'}">
              ${salon.estado}
            </button>
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
                        <label for="pisoActual">Piso:</label>
                        <input class="p-2 border-10 border-1" id="pisoActual" name="pisoActual" placeholder="piso">
                      </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center m-3">
                      <button class="btn btn-primary" @click=${() => this.actualizarSalon()}>Actualizar</button>
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
              <button type="button" @click=${(e) => this.cerrarAgregarSalon()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="d-flex flex-column">
                <label for="profesor">Id salon:</label>
                <input class="p-2 border-10 border-1" id="salon" name="salon" placeholder="salon">
              </div>
              <div class="d-flex flex-column">
                <label for="capacidad">Piso:</label>
                <input class="p-2 border-10 border-1" id="piso" name="piso" placeholder="piso">
              </div>
            </div>
            <div class="d-flex justify-content-center aling-items-center m-3">
              <!-- Modifica el botón de "Agregar" para usar clases de Bootstrap -->
              <button class="btn btn-primary" @click=${(e) => this.agregarSalon()}>Agregar</button>
            </div>
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
    const idSalon = this.shadowRoot.getElementById('salon').value;
    const piso = this.shadowRoot.getElementById('piso').value;
  
    // Validar que los campos no estén vacíos
    if (!idSalon || !piso) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    // Validar si el ID del salón ya está registrado
    if (this.salones.some(salon => salon.ID === idSalon)) {
      alert('Ya existe un salón con ese ID.');
      return;
    }
  
    const nuevoSalon = {
      ID: idSalon,
      piso: piso,
      estado: 'Activo',
    };
  
    this.salones = [...this.salones, nuevoSalon];
    this.saveSalonesToLocalStorage(this.salones);
    this.requestUpdate();
  
    // Llama a limpiarFormulario después de agregar un nuevo salón
    this.limpiarFormulario();
    this.cerrarAgregarSalon();
  }
  
  limpiarFormulario() {
    this.shadowRoot.getElementById('salon').value = '';
    this.shadowRoot.getElementById('piso').value = '';
  }

  toggleEstado(salon) {
    if (salon.estado === 'Activo') {
      salon.estado = 'Inactivo';
    } else {
      salon.estado = 'Activo';
    }
  
    // Cambia el color del botón
    const button = this.shadowRoot.querySelector(`[data-id="${salon.ID}"]`);
    if (button) {
      button.classList.toggle('btn-activo', salon.estado === 'Activo');
      button.classList.toggle('btn-inactivo', salon.estado === 'Inactivo');
    }
  
    this.saveSalonesToLocalStorage(this.salones);
    this.requestUpdate('salones');
  }
  

  cerrarAgregarSalon() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarSalon`);
    modal.style.display = "none";
    modal.style.background = "none";
  
    // Limpia el formulario al cerrar la ventana modal
    this.limpiarFormulario();
  }

  borrarSalon(id) {
    this.salones = this.salones.filter(salon => salon.ID !== id);
    this.saveSalonesToLocalStorage(this.salones);
    this.requestUpdate('salones');
  }

  abrirActualizarSalon(salonId) {
    const salon = this.salones.find((s) => s.ID === salonId);
  
    if (salon) {
      this.shadowRoot.getElementById('pisoActual').value = salon.piso;
      this.salonIdActual = salonId;
      const modal = this.shadowRoot.querySelector(`#modalActualizarSalon`);
      modal.style.display = "block";
    } else {
      console.error('Salon no encontrado para actualizar.');
    }
  }
  
  actualizarSalon() {
    const pisoActual = this.shadowRoot.getElementById('pisoActual').value;
  
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
