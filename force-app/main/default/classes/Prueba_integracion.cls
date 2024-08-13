public with sharing class Prueba_integracion {
  public static void call_org() {
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:Prueba_llamar/services/data/v59.0/query/?q=SELECT+Id,Name+FROM+Account');
    req.setMethod('GET');
    Http http = new Http();
    HTTPResponse res = http.send(req);
    System.debug(res.getBody());
  }
}
