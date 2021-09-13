import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, track, wire, api } from 'lwc';
import searchEmployee from '@salesforce/apex/employeeController.searchEmployee';
import getProfileName from '@salesforce/apex/AssignedTaskProvider.getProfileName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MentorHome extends NavigationMixin(LightningElement) {

    
    @track employeeRecords;
    @track errors;
    userid;
    profileName;
    @api mentorid;
    @track showAssignedTask=false;
    @track isModalOpen = false;
    @track showaddstep = false;

        connectedCallback(){
            this.searchEmployee();
            this.getProfileName();
        }

        searchEmployee(){
            searchEmployee({
                mentorid : this.mentorid
            })
            .then(result => {
                console.log('Employee Record', result);
                this.employeeRecords = result;
                this.errors = undefined;   
            })
            .catch(error =>{
                console.log('Error',error);
                this.errors = error;
                this.employeeRecords = undefined;
                
            })
        }
    
        getProfileName(){
            getProfileName({})
            .then(result => {
                console.log('profileName ==>', result); 
                this.profileName = result; 
                if( this.profileName == 'Mentor'){
                    this.showaddstep= true;
                }
            })
            .catch(error =>{
                console.log('Error==>',error);
            })
        }    

    handleEvent(event){
        const eventVal = event.detail;
        console.log('Search Param',eventVal);
        searchEmployee({
            searchParam : eventVal
        })
        .then(result => {

            console.log('Employee Record', result);
            this.employeeRecords = result;
            this.errors = undefined;   
        })
        .catch(error =>{

            console.log('Error',error);
            this.errors = error;
            this.employeeRecords = undefined;
            
        })
    }

     handleEmployeeView(event) {
		this.userid = event.detail;
        console.log('employeeId==>'+this.userid);
        this.showAssignedTask = true;
	}

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
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