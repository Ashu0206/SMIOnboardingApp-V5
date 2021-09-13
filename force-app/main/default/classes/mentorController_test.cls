@isTest
public with sharing class mentorController_test {
    static testMethod void validate_getmentorController(){
        
    }
    
    static testMethod void save_getmentorController(){
        List<User> sObjectList = new List<User>();
        insert sObjectList;
        Set<Id> mentorid = new Set<Id>();
        List<User> mentorList = new List<User>();
        insert mentorList;
        mentorList  = [Select Name, Id,Mentor__c,ManagerId from User where id in:mentorid LIMIT 10]; 
        if(sObjectList.size()==0){
            sObjectList=[Select Name,Id,Mentor__c from User where isActive=true and Mentor__c != null limit 10 ];
        	for(User u : sObjectList){
              mentorid.add(u.Mentor__c);
           }
    }    
}
}