public without sharing class employeeController {
    public employeeController() {
    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> searchEmployee(String mentorid){
        String loggedinuser = UserInfo.getUserId();
        String Query = '';
       
        if(mentorid != null){
           Query  = 'Select Name,Id,Mentor__c from User Where Mentor__c =:mentorid LIMIT 10 ';
        }else{
           Query  = 'Select Name,Id,Mentor__c from User Where Mentor__c =:loggedinuser LIMIT 10'; 
        }
        
        List<SObject> sObjectList = Database.query(Query);
        return sObjectList;
    }

}