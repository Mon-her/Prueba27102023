import { LightningElement, api, wire, track } from "lwc";
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
  // @api recordId;
  // Objeto, tabla o entidad 
  @api objectApiName;

  @track temp;
  mostrarFormulario = false;
  searchText;
  mostraradio;
  //connectedCallback() {
  // Escucha el evento personalizado 'mostrarformulario'
  //     this.template.addEventListener('mostrarformulario', this.mostrar.bind(this));
  //}

  mostrar() {
    this.mostrarFormulario = true;
    // Aquí puedes agregar lógica adicional, como cargar datos, etc.
  }
  cerrarModal() {
    this.mostrarFormulario = false;
  }

  cuenta = {};

  @wire(getRecord, { recordId: '$searchText', fields: [ACCOUNT_NAME_FIELD] })
  account;

   

  value = '';

  get options() {
    return [
      { label: this.account.data ? this.account.data.fields.Name.value : '' , value: this.account.data ? this.account.data.fields.Name.value : '' },
      { label: 'Force', value: 'option2' },
    ];
  }
  get accountName() {
    return this.account.data ? this.account.data.fields.Name.value : '';
  }

  handleChange() {
    const llenar = this.template.querySelector('[data-id="overview1"]').value;
    this.template.
      this.searchText = llenar;
  }


  radioOptions = [];

  // Consulta a tabla Oportunidad
  @wire(getbiblio, { searchText: "$searchText" })
  prueba;
  error;

  // Consulta a tabla Contacto
  @wire(getbiblio2, { searchText: "$searchText" })
  prueba2;


  mostrarCampo() {
    const temp2 = this.template.querySelector('[data-id="overview1"]').value;
    this.temp = temp2;
    this.searchText = temp2;
  }
  // Combobox con opciones (En este caso nombres de bancos)
  opciones = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
  ];

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



  

  handleChangeRadio(event) {
    //const selectedOption = event.detail.value;
    const selectedOption2 = this.template.querySelector('[data-id="radio1"]').value;
    //this.mostraradio = selectedOption;
    this.mostraradio = selectedOption2;
  }

  get radio() {
    return this.mostraradio;
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