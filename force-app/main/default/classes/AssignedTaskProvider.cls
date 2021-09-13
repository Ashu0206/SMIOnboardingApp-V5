public without sharing class AssignedTaskProvider {
    @AuraEnabled
    public static List<User_Assigned_Task__c> getTaskList(String userid){
        return [Select id,Name,Duration__c,Due_Date__c,Start_Date__c,Status__c,Assigned_To__c,
                Onboarding_Step__r.Name from User_Assigned_Task__c where Assigned_To__c =:userid];
    }
    @AuraEnabled
    public static List<User_Assigned_Task__c> getMyTaskList(){
        String loggedinuser = UserInfo.getUserId();
        return [Select id,Name,Duration__c,Due_Date__c,Start_Date__c,Status__c,Assigned_To__c,
                Onboarding_Step__r.Name from User_Assigned_Task__c where Assigned_To__c =:loggedinuser];
    }
    
    @AuraEnabled
    public static User getUser(String userid){
        return [Select id,Name,Onboarding_End_Date__c,Status__c from User where id =:userid limit 1];
    }
    @AuraEnabled
    public static String getProfileName(){
        id profileId = userinfo.getProfileId();
		Profile prof = [select Name from profile where id = :profileId];
        return prof.Name;
    }
     @AuraEnabled
    public static void enrollUser(String explorerid,String mentorid,String startdate,String enddate,String welcomeemail){
        String loggedinuser = UserInfo.getUserId();
        User selectedUser = new user();
        selectedUser.Id = explorerid;
        selectedUser.Mentor__c=mentorid;
        selectedUser.ManagerId=loggedinuser;
        selectedUser.Onboarding_Start_Date__c=Date.valueof(startdate);
        selectedUser.Onboarding_End_Date__c = Date.valueof(enddate);
        selectedUser.Welcome_Email__c = boolean.valueof(welcomeemail);
        update selectedUser;
    }
}