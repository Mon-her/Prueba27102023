import { LightningElement} from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import JSPDF from '@salesforce/resourceUrl/jsPDFLibrary';

export default class PDFGenerate extends LightningElement {
	jsPDFInitialized = false;

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

	handleGeneratePDF() {
		if (this.jsPDFInitialized) {
			// Make sure to correctly reference the loaded jsPDF library.
			const doc = new window.jspdf.jsPDF();

			// Add content to the PDF.
			doc.text('Hello PDF!', 10, 10);

			// Save the PDF.
			doc.save('generated_pdf.pdf');
		} else {
			console.error('jsPDF library not initialized');
		}
	}
}