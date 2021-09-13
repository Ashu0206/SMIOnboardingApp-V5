import { LightningElement, api } from 'lwc';
import getUser from '@salesforce/apex/AssignedTaskProvider.getUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class OnboardingUpdate extends LightningElement {


    @api recordId;
    @api objectApiName = "User";
    user;
    connectedCallback(){
        this.getUser();
    }
    getUser(){
        getUser({userid: this.recordId})
        .then(result => {
            console.log('Assigned Task==>', result); 
            this.user = result; 
        })
        .catch(error =>{
            console.log('Error==>',error);
        })
    }

    handleSubmit(){
        console.log(' Submit')
        const toast = new ShowToastEvent({
            'title' : 'Updated',
            "message" : 'Record Updated Successfully',
            "variant" : "success",
            
        });
        this.dispatchEvent(toast);

        const passEvent = new CustomEvent('closemodal', {
            detail:{extendModalOpen:false} 
        });
       this.dispatchEvent(passEvent);
    }

    handleSuccess(){
        console.log(' Record Updated')
        const toast1 = new ShowToastEvent({
            'title' : 'Updated',
            "message" : 'Record Updated Successfully',
            "variant" : "success",
            
        });
        this.dispatchEvent(toast1);
    }

    handleError(){
        console.log('error')
        const toast3 = new ShowToastEvent({
            'title' : 'Failed',
            "message" : 'Record Creation Failed',
            "variant" : "error",
            
        });
        this.dispatchEvent(toast3);
    }

}