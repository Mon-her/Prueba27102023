import { LightningElement, api, wire } from "lwc";
import { loadScript } from 'lightning/platformResourceLoader';
import JSPDF from '@salesforce/resourceUrl/jsPDFLibrary';
import jsPDF_AutoTable from '@salesforce/resourceUrl/jsPDF_AutoTable';
import getbiblio from "@salesforce/apex/pdfprueba.getbiblio";
import getbiblio2 from "@salesforce/apex/pdfprueba.getbiblio2";
//import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { generarFormato1 } from 'c/pruebapdf';
import { generarFormato2 } from 'c/pruebapdf';

export default class Personales extends LightningElement {
  jsPDFInitialized = false;

  // ID del registro
  @api recordId;

  // Objeto, tabla o entidad 
  @api objectApiName;

  // Consulta a tabla Oportunidad
  @wire(getbiblio, { searchText: "$recordId" })
  prueba;
  error;

  // Consulta a tabla Contacto
  @wire(getbiblio2, { searchText: "$recordId" })
  prueba2;

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
      generarFormato2(doc);
    } else if (Op === 'opcion2') {
      generarFormato1(doc, formData);
    }
  }
}