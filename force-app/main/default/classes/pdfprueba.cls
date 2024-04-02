    public with sharing class pdfprueba {
        @AuraEnabled(cacheable=true)
        public static list<Personal__c> getbiblio(Integer searchText){
              //String linkValue = '%' + searchText + '%';
              //String linkValue = '%1212566%';

             // System.debug(linkValue);
            
            // Retorna los datos encontrados en el objeto Personal__c
            return[
               // SELECT Name, Apellido__c, Celular__c FROM Personal__c WHERE Name LIKE :linkValue
               SELECT Name, Nombre_cliente__c, Apellido__c FROM Personal__c WHERE Cedula__c =:searchText
            ]
            ;
            }
    }