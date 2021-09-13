import { LightningElement, api,track } from 'lwc';
import getMyTaskList from '@salesforce/apex/AssignedTaskProvider.getMyTaskList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AssignedTask extends LightningElement {

    @track assignedTask=[];
    @track isModalOpen = false;
    @track show=false;
    @track task;
    @track taskrecid;

    connectedCallback(){
        this.getMyTaskList();
    }

    getMyTaskList(){
        getMyTaskList({})
        .then(result => {
            this.assignedTask = result; 
            console.log('all Assigned Task==>'+JSON.stringify(this.assignedTask)); 
            this.show = true;

        })
        .catch(error =>{
            console.log('Error==>',error);
        })
    }

    handleSuccess(){
        const toast = new ShowToastEvent({
            'title' : 'Created',
            "message" : 'Record Updated Successfully',
            "variant" : "success",
            
        });
        this.dispatchEvent(toast);
        this.getMyTaskList();
        this.closeModal();

    }

    showTaskDetail(event){
         this.taskrecid = event.target.value;
         this.isModalOpen = true;
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

}