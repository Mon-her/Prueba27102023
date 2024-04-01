import { LightningElement, api, wire } from 'lwc'; //Wire adapter to fetch record data 
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
//import OBJECT from '@salesforce/schema/Personal__c';
import NAME from '@salesforce/schema/Personal__c.Name';
//import getbiblio from "@salesforce/apex/pdfprueba.getbiblio";
 
export default class Padre extends LightningElement {
    /* Id of record to display. */
    
    @api prueba2;
    @api recordId;
 
    /* Expose schema objects/fields to the template. */
    //object = OBJECT;
    //searchText = "1212312";
    //@wire(getbiblio, { searchText : "$searchText" })
   // prueba2;

    // Evento change
    handleInputChange(event) {
        const searchTextAux = event.target.value;
        if(searchTextAux.length >= 2 || searchTextAux === "") {
            this.searchText = searchTextAux;
        }
    }

    /* Load Account.Name for custom rendering */
    @wire(getRecord, { recordId: '$recordId', fields: [NAME] })
    record; //result resides on record.data
 
    /** Get the Account.Name value. */
    get nameValue() {
        return this.record.data ? getFieldValue(this.record.data, NAME) : '';
    }
}
