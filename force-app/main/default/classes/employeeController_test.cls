@isTest
public with sharing class employeeController_test {
    static testMethod void validate_getemployeeController(){
        
    }
    
    static testMethod void save_getemployeeController(){
       String loggedinuser = UserInfo.getUserId();
        String Query = '';
       Set<Id> mentorid = new Set<Id>();
        if(mentorid != null){
           Query  = 'Select Name,Id,Mentor__c from User Where Mentor__c =:mentorid LIMIT 10 ';
        }else{
           Query  = 'Select Name,Id,Mentor__c from User Where Mentor__c =:loggedinuser LIMIT 10'; 
        }        
        List<SObject> sObjectList = Database.query(Query);
    }    
}