public with sharing class Mentor_Controller {
    public class CustomException extends Exception {}
    @AuraEnabled(Cacheable=true)
    public static List<User> getContacts() {
        List<User> contacts = [select name from User WHERE Profile.Name='Mentor'];
        
        return (contacts);
    }

    @AuraEnabled
    public static User saveContact(User cont){
        insert (cont);

        return (cont);
    }
}