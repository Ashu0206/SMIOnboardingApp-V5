import { LightningElement,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getTaskList from '@salesforce/apex/AssignedTaskProvider.getTaskList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getProfileName from '@salesforce/apex/AssignedTaskProvider.getProfileName';

export default class AssignedTaskList extends NavigationMixin(LightningElement) {
    @track assignedTask=[];
    userid;
    profileName;
    showOnboardingActions = false;
    @track isModalOpen = false;
    @track extendModalOpen = false;
    @track closeModalOpen = false;
    @api objectApiName = "User_Assigned_Task__c";

    @api get empuserid() {
        return this.userid;
    }
    set empuserid(value) {
        this.userid = value;
        this.getTaskList();
    }
    connectedCallback(){
        this.getTaskList();
        this.getProfileName();
    }

    getProfileName(){
        getProfileName({})
        .then(result => {
            console.log('profileName ==>', result); 
            this.profileName = result; 
            if( this.profileName == 'Manager'){
                this.showOnboardingActions= true;
            }
        })
        .catch(error =>{
            console.log('Error==>',error);
        })
    }

    @api
    getTaskList(){
        getTaskList({userid: this.userid})
        .then(result => {
            console.log('Assigned Task==>', result); 
            this.assignedTask = result; 
        })
        .catch(error =>{
            console.log('Error==>',error);
        })
    }

    showTaskDetail(event){
        const recid = event.target.value;
        this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: recid,
				objectApiName: 'User_Assigned_Task__c',
				actionName: 'view',
			},
		});
    }
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    openExtendModal() {
        // to open modal set isModalOpen tarck value as true
        this.extendModalOpen = true;
    }

    @api
    closeExtendModal() {
        // to close modal set isModalOpen tarck value as false
        this.extendModalOpen = false;
    }
    openCloseModal() {
        // to open modal set isModalOpen tarck value as true
        this.closeModalOpen = true;
    }

    @api
    closeClosedModal() {
        // to close modal set isModalOpen tarck value as false
        this.closeModalOpen = false;
    }
    submitDetails() {
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
        this.getTaskList();
        this.closeModal();
    }
}