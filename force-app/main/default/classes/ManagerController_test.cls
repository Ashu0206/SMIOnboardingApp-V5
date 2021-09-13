@isTest
public with sharing class ManagerController_test {
    static testMethod void validate_getManagerController(){
        
    }
    
    static testMethod void save_getManagerController(){
        List<Contact> ContactFeed= ManagerController.getContacts();
        insert ContactFeed;
        List<Contact> contactList = [select Name from Contact];
    }    
}