import { LightningElement, api, track, wire } from "lwc";
import { loadScript } from 'lightning/platformResourceLoader';
import JSPDF from '@salesforce/resourceUrl/jsPDFLibrary';
//import autoTableResource from '@salesforce/resourceUrl/jspdf_autotable';
import jsPDF_AutoTable from '@salesforce/resourceUrl/jsPDF_AutoTable';
import getbiblio from "@salesforce/apex/pdfprueba.getbiblio";
import getbiblio2 from "@salesforce/apex/pdfprueba.getbiblio2";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Personales extends LightningElement {
  jsPDFInitialized = false;
  @api recordId;
  @api objectApiName;
  @track outputText;

  @track nombre = '';
  @track apellido = '';

  searchText;
  @wire(getbiblio, { searchText: "$recordId" })
  prueba;
  error;

  @wire(getbiblio2, { searchText: "$recordId" })
  prueba2;

  //searchText;


  renderedCallback() {

    //if (!this.jsPdfInitialized) {
    // Promise.all([
    //    loadScript(this, jsPDF),
    //    loadScript(this, jsPDF_AutoTable)
    // ])
    // .then(() => {
    //     this.jsPdfInitialized = true;
    // })
    // .catch(error => {
    //     console.error('Error al cargar jsPDF y jspdf-autotable', error);
    // });
    //}

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

  // Evento change
  handleInputChange(event) {
    console.log(event);
    const { name, value } = event.target;
    this[name] = value;
  }

  // Evento click
  handleclick(event) {
    console.log(event);
    const element = this.template.querySelector('[data-id="overview"]').value;
    this.searchText = element;
    this.outputText = element;
  }

  handleGeneratePDF() {
    //if (this.jsPdfInitialized) {

    const doc = new window.jspdf.jsPDF();
    //const doc = new window.jspdf.jsPDF();
    //const inputs = this.template.querySelectorAll('lightning-input');
    const inputs = this.template.querySelectorAll('[data-id]');

    // Crear un objeto para almacenar los valores de los campos
    const formData = {};
    inputs.forEach(input => {
      formData[input.dataset.id] = input.value;
    });

    //const x = 10;
    //const y = 10;
    //const width = 80;
    //const height = 10;

    // Dibujar el cuadro
    //doc.rect(x, y, width, height);

    // Insertar texto dentro del cuadro
    //const texto = 'Texto dentro del cuadro';
    //const fontSize = 12;
    //const textWidth = doc.getTextWidth(texto);
    //const textX = x + (width - textWidth) / 2; // Centrar horizontalmente el texto dentro del cuadro
    //const textY = y + (height - fontSize) / 2 + fontSize / 3; // Centrar verticalmente el texto dentro del cuadro
    // doc.text(texto, textX, textY);

    //doc.text(formData.N, 10, 20);

    // Configurar título del PDF
    //doc.setFont('helvetica'); // Tipo de fuente
    //doc.setFontSize(12); // Tamaño de fuente en puntos
    //doc.setTextColor(255, 0, 0); // Color del texto en RGB (rojo)
    //doc.setFontSize(22);
    //doc.text('Datos del Usuario', 10, 10);
    // Definir los márgenes para mover la tabla en la dirección X
    const margins = { top: 5, bottom: 5, left: 5 };
    // Configuración para centrar el texto en las celdas de la tabla
    const options = {

      headStyles: { fillColor: [51, 122, 183], textColor: 253 },
      bodyStyles: { textColor: [255, 255, 255], fontSize: 25 },
      //Alinear texto al centro de manera horizontal
      styles: { halign: 'center' },
      columnStyles: {
        0: { // Índice de la columna donde se aplicará el estilo (segunda columna)
          fillColor: [41, 128, 186] // Cambiar el color de fondo de la segunda columna
        }
      }

    };
    // Configurar datos de la tabla Nombre
    const tableTitulo = [
      ['FORMATO DE CREDITO'],
    ];
    doc.autoTable({
      startY: 5,
      //startX: 100,
      //head: tableTitulo,
      body: tableTitulo,
      ...options,
      tableWidth: 200,
      margin: margins,
    });

    // Configurar datos de la tabla Nombre
    const tableData = [
      ['Nombre de cuenta',
        'Nombre oportunidad',
        'Rating',
        'Cuenta padre',
        'Telefono',
        'Numero cuenta',
      ],
      [formData.overview,
      formData.N,
      formData.overview1,
      formData.overview2,
      formData.overview3,
      formData.overview4
      ],
      //['Dirección', direccion]
    ];

    // Configurar datos de la tabla Edad
    const tableData_n = [
      ['Stage oportunidad',
        'Tipo oportunidad',
        'Descripción',
        'Apellido contacto',
        'Email',
        'Nombre Contacto',
        'Cumpleaños',
        'Primer nombre',
      ],
      //['Nombre', formData.N],
      [formData.O,
      formData.S,
      formData.T,
      formData.Ap,
      formData.E,
      formData.No,
      formData.B,
      formData.P
      ],
      //['Dirección', direccion]
    ];

    // Agregar tabla al PDF Nombre
    doc.autoTable({
      //startY: 130,
      head: tableData.slice(0, 1),
      body: tableData.slice(1),
      tableWidth: 200,
      margin: margins
      //columnStyles: {
      //  0: { cellWidth: 20 }, // Ancho de la primera columna en puntos
      // 1: { cellWidth: 'auto' }, // Ancho de la segunda columna ajustado automáticamente al contenido
      // 2: { cellWidth: 'wrap' } // Ancho de la tercera columna con contenido que se envuelve

      //columnStyles: {
      // 0: { fillColor: [255, 0, 0] }, // Estilo para la primera columna
      //  1: { fontStyle: 'italic' } // Estilo para la segunda columna
      //}
    });

    // Agregar tabla al PDF Edad
    doc.autoTable({
      //startY: 80,
      head: tableData_n.slice(0, 1),
      body: tableData_n.slice(1),
      tableWidth: 200,
      margin: margins,
      columnWidth: [30, 'auto', 'wrap']

      //columnStyles: {
      // 0: { fillColor: [255, 0, 0] }, // Estilo para la primera columna
      //  1: { fontStyle: 'italic' } // Estilo para la segunda columna
      //}
    });

    doc.save('formulario.pdf');

    // Mostrar mensaje de éxito
    ShowToastEvent('Éxito', 'Se ha generado el PDF con éxito', 'success');

    //} else {
    //console.error('jsPDF library not initialized');
    //}




    //if (this.jsPdfInitialized) {

    //const doc = new window.jspdf.jsPDF();
    //const inputs = this.template.querySelectorAll('lightning-input');
    //const inputs = this.template.querySelectorAll('[data-id]');

    // Crear un objeto para almacenar los valores de los campos
    // const formData = {};
    // inputs.forEach(input => {
    //   formData[input.dataset.id] = input.value;
    //});

    //doc.setFontSize(22);
    // doc.text('Formato de Crédito', 10, 10);
    //doc.text(formData.N, 10, 20);

    // Obtener los datos del formulario
    // const nombre = 'Nombre';
    // const edad = 'Edad';
    //const direccion = 'Dirección';

    // Configurar opciones de la tabla
    // const tableData = [
    //    [nombre, edad, direccion],
    //     ['John Doe', '30', '123 Street'],
    //    ['Jane Doe', '25', '456 Avenue']
    //];

    //doc.autoTable({
    //     startY: 30,
    //    head: [['Nombre', 'Edad', 'Dirección']],
    //    body: tableData,
    //});


  }

  // Llamar a un método para generar el PDF con los datos del formulario
  // this.generarPDFConDatos(formData);

  // Crear datos para la tabla
  //const userData = [
  //  { campo: 'Nombre', valor: 'formData.N' },
  //  { campo: 'Apellido', valor: 'formData.O' },
  //];

  // doc.autoTable(['campo', 'valor'], userData.map(row => [row.campo, row.valor]), options);


  // Agregar la tabla al PDF
  //doc.autoTable(['campo', 'valor'], userData.map(row => [row.campo, row.valor]), options);

  //const clienteData = [['Cliente', 'formData.N'], ['Email', 'formData.O']];
  //doc.autoTable({
  //  startY: 40,
  //  head: [['Campo', 'Valor']],
  // body: clienteData,
  //});



  // doc.text(formData, 10, 10);
  //doc.text('Nombre: ' + formData.N, 10, 20);
  //doc.text(formData.N, 10, 30);
  //doc.text(formData.O, 10, 40);

  // this.generarPDFConContenido(formData);

  // Add content to the PDF.
  //doc.text('Hello PDF!', 10, 10);
  //doc.text(this.outputText, 10, 10);
  //doc.text(this.searchText);

  // Save the PDF.
  //doc.save('generated_pdf.pdf');
}