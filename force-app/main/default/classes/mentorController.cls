public without sharing class mentorController {
    public mentorController() {
    }
    
    @AuraEnabled
    public static string getManager(){
    	String loggedinuser = UserInfo.getUserId();
        return loggedinuser;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<User> searchMentor(String searchParam){
        String loggedinuser = UserInfo.getUserId();
        String Query = '';
        Set<Id> mentorid = new Set<Id>();
        List<User> sObjectList = new List<User>();
        List<User> mentorList = new List<User>();
        Query  = 'Select Name, Id,Mentor__c from User where ManagerId =:loggedinuser LIMIT 10'; 
        sObjectList= Database.query(Query);
        for(User u : sObjectList){
        	mentorid.add(u.Mentor__c);
        }
        mentorList  = [Select Name, Id,Mentor__c,ManagerId from User where id in:mentorid LIMIT 10]; 
        if(sObjectList.size()==0){
            sObjectList=[Select Name,Id,Mentor__c from User where isActive=true and Mentor__c != null limit 10 ];
        	for(User u : sObjectList){
              mentorid.add(u.Mentor__c);
           }
           mentorList  = [Select Name, Id,Mentor__c,ManagerId from User where id in:mentorid LIMIT 10]; 
        }   
        return mentorList;
    }

}