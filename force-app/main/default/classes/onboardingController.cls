public with sharing class onboardingController {
    public onboardingController() {

    }

  
    @AuraEnabled(cacheable=true)
    public static List<User> updateSingleRecord()
   {
        return new List<User>([Select Id, Name from User]);
    }

}