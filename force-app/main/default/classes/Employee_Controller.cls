public with sharing class Employee_Controller {
    public class CustomException extends Exception {}
    @AuraEnabled(Cacheable=true)
    public static List<User> getContacts() {
        List<User> employee = [select name from User WHERE Profile.Name='Employee'];
        
        return (employee);
    }

    @AuraEnabled
    public static User saveContact(User emp){
        insert (emp);

        return (emp);
    }
}