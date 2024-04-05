public with sharing class pdfprueba {
  @AuraEnabled(cacheable=true)
  //public static list<Personal__c> getbiblio(String searchText){
  public static list<Opportunity> getbiblio(Id searchText) {
    //String linkValue = '%' + searchText + '%';
    //String linkValue = '%1212566%';

    System.debug(searchText);

    // Retorna los datos encontrados en el objeto Personal__c
    return [
      // SELECT Name, Apellido__c, Celular__c FROM Personal__c WHERE Name LIKE :linkValue
      //SELECT Name, Nombre_cliente__c, Apellido__c FROM Personal__c WHERE Name LIKE:linkValue

      SELECT Name, StageName, Description, Type
      FROM Opportunity
      WHERE AccountId = :searchText
    ];
  }
  @AuraEnabled(cacheable=true)
  public static list<Contact> getbiblio2(Id searchText) {
    //String linkValue = '%' + searchText + '%';
    //String linkValue = '%1212566%';

    System.debug(searchText);

    // Retorna los datos encontrados en el objeto Personal__c
    return [
      // SELECT Name, Apellido__c, Celular__c FROM Personal__c WHERE Name LIKE :linkValue
      //SELECT Name, Nombre_cliente__c, Apellido__c FROM Personal__c WHERE Name LIKE:linkValue

      SELECT Name, FirstName, LastName, Birthdate, Email
      FROM Contact
      WHERE AccountId = :searchText
    ];
  }
}
