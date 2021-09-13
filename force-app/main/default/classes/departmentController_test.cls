@isTest
public with sharing class departmentController_test {
    static testMethod void validate_getdepartmentController(){
        
    }
    
    static testMethod void save_getdepartmentController(){
        List<Onboarding_Steps__c> onboardingController = departmentController.getDepartmentRecord();
        insert onboardingController;
        List<Onboarding_Steps__c> DuplicateRecordItem = [Select Name from Onboarding_Steps__c];
    }    
}