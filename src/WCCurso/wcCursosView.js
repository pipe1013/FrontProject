import { LitElement, html } from 'lit-element';
import stylesScss from './wcCursosStyle';

class CursosViews extends LitElement {
  constructor() {
    super();
    this.cursos = [
      { ID: 1,
         PROFESOR: 'Juan Pérez', 
         CAPACIDAD: '30', 
         JORNADA: 'Mañana',
          SALON: '101' },
      { ID: 2, 
        PROFESOR: 'Ana López',
        CAPACIDAD: '30',
          JORNADA: 'Tarde', 
          SALON: '201' }
    ];
    this.cursoIdActual = null; 
  }
  saveCursosToLocalStorage(cursos) {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }

  static get styles() {
    return [stylesScss];
  }
  abrirAgregarCurso() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarCurso`);
    modal.style.display = "block";
    modal.style.background = "rgb(0,0,0,0.7)";

  }

  cerrarAgregarCurso() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarCurso`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  abrirActualizar(cursoId) {
    const curso = this.cursos.find((c) => c.ID === cursoId);
  
    if (curso) {
      this.shadowRoot.getElementById('profesorActual').value = curso.PROFESOR;
      this.shadowRoot.getElementById('capacidadActual').value = curso.CAPACIDAD;
      this.shadowRoot.getElementById('jornadaActual').value = curso.JORNADA;
      this.shadowRoot.getElementById('salonActual').value = curso.SALON;

      this.cursoIdActual = cursoId;
      const modal = this.shadowRoot.querySelector(`#modalActualizarCurso`);
      modal.style.display = "block";
    } else {
      console.error('Curso no encontrado para actualizar.');
    }
  }
  
  cerrarActualizar() {
    const modal = this.shadowRoot.querySelector(`#modalActualizarCurso`);
    modal.style.display = "none";
    modal.style.background = "none";
  }
  

  render() {
    return html`
      <div>
        <h1>Lista de Cursos</h1>
        <button style="float: left; font-size: 18px;"  @click=${(e)=>this.abrirAgregarCurso()}>Nuevo Curso</button>
        <div class="modal" id="modalAgregarCurso" style="display: none;">
        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" @click=${(e)=>this.cerrarAgregarCurso()}>
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="d-flex flex-column">
                <label for="profesor">Profesor:</label>
                <input class=" p-2 border-10 border-1" id="profesor" name="profesor" placeholder="profesor">
              </div>
              <div class="d-flex flex-column">
                <label for="capacidad">Capacidad:</label>
                <input class=" p-2 border-10 border-1" id="capacidad" name="capacidad" placeholder="capacidad">
              </div>
              <div class="d-flex flex-column">
                <label for="jornada">Jornada:</label>
                <input class=" p-2 border-10 border-1" id="jornada" name="jornada" placeholder="jornada">
              </div>
              <div class="d-flex flex-column">
              <label for="salon">Salon:</label>
              <input class=" p-2 border-10 border-1" id="salon" name="salon" placeholder="salon">
            </div>
            </div>
            <div class="d-flex justify-content-center aling-items-center m-3">
              <button class="bg-icon text-white p-2 border-10" @click=${(e)=>this.agregarCurso()}>Agregar</buttton>
            </div>
          </div>
        </div>
      </div>
      
        <table id="cursos-list">
          <tr>
            ${Object.keys(this.cursos[0]).map(attr => html`
              <th>${attr}</th>
            `)}
            <th>Acciones</th>
          </tr>
          ${this.cursos.map(curso => html`
            <tr>
              ${Object.values(curso).map(val => html`
                <td>${val}</td>
              `)}
              <td>
                <button @click="${() => this.borrarCurso(curso.ID)}">Borrar</button>
                <button @click="${() => this.abrirActualizar(curso.ID)}">Actualizar</button>

                
      <div class="modal" id="modalActualizarCurso" style="display: none;">
      <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" @click=${(e) => this.cerrarActualizar()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-column">
              <label for="profesor">Profesor:</label>
              <input class="p-2 border-10 border-1" id="profesorActual" name="profesorActual" placeholder="profesor">
            </div>
            <div class="d-flex flex-column">
              <label for="capacidad">Capacidad:</label>
              <input class="p-2 border-10 border-1" id="capacidadActual" name="capacidadActual" placeholder="capacidad">
            </div>
            <div class="d-flex flex-column">
              <label for="jornada">Jornada:</label>
              <input class="p-2 border-10 border-1" id="jornadaActual" name="jornadaActual" placeholder="jornada">
            </div>
            <div class="d-flex flex-column">
              <label for="salon">Salon:</label>
              <input class="p-2 border-10 border-1" id="salonActual" name="salonActual" placeholder="salon">
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center m-3">
            <button class="bg-icon text-white p-2 border-10" @click=${(e) => this.actualizarCurso()}>Actualizar</button>
          </div>
        </div>
      </div>
    </div>
              </td>
            </tr>
          `)}
        </table>
      </div>
    `;
  }
  limpiarFormulario() {
    this.shadowRoot.getElementById('profesor').value = '';
    this.shadowRoot.getElementById('capacidad').value = '';
    this.shadowRoot.getElementById('jornada').value = '';
    this.shadowRoot.getElementById('salon').value = '';
  }
  
  agregarCurso() {
    
    const profesor = this.shadowRoot.getElementById('profesor').value;
    const capacidad = this.shadowRoot.getElementById('capacidad').value;
    const jornada = this.shadowRoot.getElementById('jornada').value;
    const salon = this.shadowRoot.getElementById('salon').value;

    const nuevoCurso = {
      ID: this.cursos.length + 1, 
      PROFESOR: profesor,
      CAPACIDAD: capacidad,
      JORNADA: jornada,
      SALON: salon, 
    };
    this.cursos = [...this.cursos, nuevoCurso];
      this.saveCursosToLocalStorage(this.cursos);
      this.requestUpdate('cursos');
      this.limpiarFormulario();

      this.cerrarAgregarCurso();
  }

  actualizarCurso() {
   
    const profesorActual = this.shadowRoot.getElementById('profesorActual').value;
    const capacidadActual = this.shadowRoot.getElementById('capacidadActual').value;
    const jornadaActual = this.shadowRoot.getElementById('jornadaActual').value;
    const salonActual = this.shadowRoot.getElementById('salonActual').value;
  

    if (this.cursoIdActual !== null) {
     
      const indiceCurso = this.cursos.findIndex((curso) => curso.ID === this.cursoIdActual);
  
      if (indiceCurso !== -1) {

        this.cursos[indiceCurso].PROFESOR = profesorActual;
        this.cursos[indiceCurso].CAPACIDAD = capacidadActual;
        this.cursos[indiceCurso].JORNADA = jornadaActual;
        this.cursos[indiceCurso].SALON = salonActual;
  
        this.cerrarActualizar();
  
        this.saveCursosToLocalStorage(this.cursos);
        this.cursoIdActual = null;
        this.requestUpdate('cursos');
      } else {
        console.error('Curso no encontrado para actualizar.');
      }
    } else {
      console.error('No se ha seleccionado un curso para actualizar.');
    }
  }
  
  
  borrarCurso(id) {
    this.cursos = this.cursos.filter(curso => curso.ID !== id);
    this.requestUpdate('cursos');
  }
}

customElements.define('cursos-views', CursosViews);
