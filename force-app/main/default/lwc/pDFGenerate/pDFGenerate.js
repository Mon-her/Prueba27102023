//import { LightningElement } from 'lwc';
//import { loadScript } from 'lightning/platformResourceLoader';
//import JSPDF from '@salesforce/resourceUrl/jsPDFLibrary';
//import { loadScript } from 'lightning/platformResourceLoader';
//import img from '@salesforce/resourceUrl/imagen2';
import { LightningElement, api } from 'lwc';
//import clase from './personales.js';


export default class pDFGenerate extends LightningElement {
	@api recordId;
    @api objectId;

	generarPDF() {
		this.dispatchEvent(new CustomEvent('mostrarformulario'));
	}
}
