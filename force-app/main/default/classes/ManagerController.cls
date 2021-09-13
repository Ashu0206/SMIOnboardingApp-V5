public with sharing class ManagerController {
    
    public class MyException extends Exception {}

    @AuraEnabled
    public static List<Contact> getContacts(){
        try {
            List<Contact> contactList = [select Name from Contact];
            return contactList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}