public with sharing class departmentController {
    public departmentController() {
	
    }


    @AuraEnabled(cacheable=true)
    public static List<Onboarding_Steps__c> getDepartmentRecord()
   {
        return new List<Onboarding_Steps__c>([Select Name from Onboarding_Steps__c]);
    }
}