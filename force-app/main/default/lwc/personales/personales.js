import { LightningElement, api, wire } from "lwc";
import { loadScript } from 'lightning/platformResourceLoader';
import JSPDF from '@salesforce/resourceUrl/jsPDFLibrary';
import jsPDF_AutoTable from '@salesforce/resourceUrl/jsPDF_AutoTable';
import getbiblio from "@salesforce/apex/pdfprueba.getbiblio";
import getbiblio2 from "@salesforce/apex/pdfprueba.getbiblio2";
//import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { generarFormato1, generarFormato2 } from 'c/pruebapdf';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';


export default class Personales extends LightningElement {

  jsPDFInitialized = false;

  // ID del registro
  @api recordId;

  // Objeto, tabla o entidad 
  @api objectApiName;

  //@track temp;

  // Valor que muestra el formulario o lo oculta Valor actual oculto
  mostrarFormulario = false;

  // Valor con el cual buscar en base de datos por lo general el valor del RecordID 
  searchText;

  // Valor del radiobutton
  mostraradio;

  // Extraer información de Account con consulta estandar
  @wire(getRecord, { recordId: '$searchText', fields: [ACCOUNT_NAME_FIELD] })
  // Contiene la informacion extraida
  account;

  // Consulta creada a tabla Oportunidad
  @wire(getbiblio, { searchText: "$searchText" })
  prueba;
  error;

  // Consulta creada a tabla Contacto
  @wire(getbiblio2, { searchText: "$searchText" })
  prueba2;

  //connectedCallback() {
  // Escucha el evento personalizado 'mostrarformulario'
  //     this.template.addEventListener('mostrarformulario', this.mostrar.bind(this));
  //}

  // Metodo para mostrar formulario Valor true visible
  mostrar() {
    this.mostrarFormulario = true;
    // Aquí puedes agregar lógica adicional, como cargar datos, etc.
  }

  // Metodo para ocultar formulario Valor false oculto
  cerrarModal() {
    this.mostrarFormulario = false;
  }

  // Metodo que se dispara al hacer clic en algun boton
  // en este caso para mostrar el campo con el nombre de la cuenta, le pasa el valor del campo 
  // Que necesita mostrar
  mostrarCampo() {
    const temp2 = this.template.querySelector('[data-id="overview1"]').value;
    //this.temp = temp2;
    this.searchText = temp2;
  }

  // Dar valor a el radiobutton con info de la base de datos en este caso entidad Account
  get options() {
    return [
      { label: this.account.data ? this.account.data.fields.Name.value : '', value: this.account.data ? this.account.data.fields.Name.value : '' },
      { label: 'Force', value: 'option2' },
    ];
  }

  // Combobox con opciones (En este caso nombres de bancos)
  get opciones() {
    return [
      { label: 'Opción 1', value: 'opcion1' },
      { label: 'Opción 2', value: 'opcion2' },
    ];
  }

  // Otra manera para definir opciones de una lista o grupo, ya se a radiobutton, combobox o checkbox
  //opciones = [
  //  { label: 'Opción 1', value: 'opcion1' },
  //  { label: 'Opción 2', value: 'opcion2' },
  //];

  // Metodo para mostrar el valor de algun campo, en este caso el nombre de la cuenta Account name
  get accountName() {
    return this.account.data ? this.account.data.fields.Name.value : '';
  }

  // Evento para cambiar el valor del radiobutton, cada que se seleccione uno diferente, 
  // cambia el valor a mostraradio
  handleChangeRadio() {
    //const selectedOption = event.detail.value;
    const selectedOption2 = this.template.querySelector('[data-id="radio1"]').value;
    //this.mostraradio = selectedOption;
    this.mostraradio = selectedOption2;
  }

  // Metodo para mostrar el valor del radiobutton seleccionado
  get radio() {
    return this.mostraradio;
  }

  //handleChange() {
  //  const llenar = this.template.querySelector('[data-id="overview1"]').value;
  //  this.template.
  //    this.searchText = llenar;
  //}

  //Renderizado de librerias
  renderedCallback() {
    if (!this.jsPDFInitialized) {
      this.jsPDFInitialized = true;
      loadScript(this, JSPDF)
      loadScript(this, jsPDF_AutoTable)
        .then(() => {
          console.log('jsPDF library loaded successfully');
        })
        .catch((error) => {
          console.error('Error loading jsPDF library', error);
        });
    }
  }

  //Evento generar pdf cuando da clic el usuario
  handleGeneratePDF() {
    const doc = new window.jspdf.jsPDF();

    // Obtener inputs 
    const inputs = this.template.querySelectorAll('[data-id]');

    // Obtener la opción que elija el usuario (En este caso el banco)
    const Op = this.template.querySelector('[data-id="Op"]').value;

    // Crear un objeto para almacenar los valores de los campos del formulario
    const formData = {};
    inputs.forEach(input => {
      formData[input.dataset.id] = input.value;
    });

    // Crear un PDF personalizado con base en la opción del usuario
    if (Op === 'opcion1') {
      generarFormato1(doc, formData);
    } else if (Op === 'opcion2') {
      generarFormato2(doc, formData);
    }
  }
}