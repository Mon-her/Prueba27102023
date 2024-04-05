//import { LightningElement } from 'lwc';
//import { loadScript } from 'lightning/platformResourceLoader';
import JSPDF from '@salesforce/resourceUrl/jsPDFLibrary';
import { loadScript } from 'lightning/platformResourceLoader';
//import img from '@salesforce/resourceUrl/imagen2';
import { LightningElement } from 'lwc';

export default class pDFGenerate extends LightningElement {

	renderedCallback() {
		if (!this.jsPDFInitialized) {
			this.jsPDFInitialized = true;
			loadScript(this, JSPDF)
				.then(() => {
					console.log('jsPDF library loaded successfully');
				})
				.catch((error) => {
					console.error('Error loading jsPDF library', error);
				});
		}
	}
	async generarPDF() {
		// Crear una instancia de jsPDF
		const doc = new window.jspdf.jsPDF();

		// Convertir la imagen a base64
		const base64Image = await this.toBase64('https://kinsta.com/es/wp-content/uploads/sites/8/2019/09/jpg-vs-jpeg.jpg');

		// Agregar imagen al PDF
		doc.addImage(base64Image, 'JPEG', 10, 10, 100, 100); // Parámetros: imagen, formato, x, y, ancho, alto

		// Guardar el PDF
		doc.save('documento.pdf');
	}

	async toBase64(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				resolve(canvas.toDataURL('image/jpeg'));
			};
			img.onerror = reject;
			img.src = url;
		});
	}
}
