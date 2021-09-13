import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchMentor from '@salesforce/apex/mentorController.searchMentor';
import getManager from '@salesforce/apex/mentorController.getManager';

export default class ManagerHome extends NavigationMixin(LightningElement) {

    @track mentorRecords=[];
    @track errors;
    @api objectApiName = "User";
    @api objectApiRef = "Onboarding_Steps__c";
    @api objectApi = "User_Assigned_Task__c";
    mentorid;
    managerid;
    @track showMentors = true;
    @track showEmployess = false;
    

    @wire(searchMentor)
        wiredRecords({error, data}){
            console.log('Data', data);
            this.mentorRecords =data;
            //this.managerid = this.mentorRecords[0].ManagerId;
            this.errors = error;
        }

        connectedCallback(){
            this.getManager();
        }
    
        getManager(){
            getManager({ })
            .then(result => {
                console.log('managerid==>', result);
                this.managerid = result;
                this.errors = undefined;   
            })
            .catch(error =>{
                console.log('Error',error);
                this.errors = error;
                this.managerid = undefined;
                
            })
        }

    handleEvent(event)
    {
        const eventVal = event.detail;
        console.log('Search Param',eventVal);
        searchMentor({searchParam : eventVal})
        .then(result => {
            console.log('Mentor Record', result);
            this.mentorRecords = result;
            this.errors = undefined;      
        })
        .catch(error =>{
            console.log('Error',error);
            this.errors = error;
            this.mentorRecords = undefined;   
        })
    }


    handleMentorView(event) {
        this.mentorid  = event.detail; 
        this.showEmployess=true;
        this.showMentors = false;       
	}


    handleSuccess(){
        const toast = new ShowToastEvent({
            'title' : 'Created',
            "message" : 'Record Created Successfully',
            "variant" : "success",
            
        });
        this.dispatchEvent(toast);

    }














}