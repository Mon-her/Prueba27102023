import { LightningElement, api, track, wire} from "lwc";
//import { ShowToastEvent } from "lightning/platformShowToastEvent";
//import { CloseActionScreenEvent } from "lightning/actions";
//import NAME_FIELD from "@salesforce/schema/Personal__c.Name";
import getbiblio from "@salesforce/apex/pdfprueba.getbiblio";

export default class Personales extends LightningElement {

    @track outputText;
    @api recordId;
    @api objectApiName;
    
    searchText;
    @wire(getbiblio, { searchText : "$searchText" })
    prueba;
    error;
    
    // Evento change
    handleInputChange(event) {
      console.log(event);
      //this.searchText = event.target.value;
    }

    // Evento click
    handleclick(event) {
      console.log(event);
      const element = this.template.querySelector('[data-id="overview"]').value;
      this.searchText = element;
    }
}