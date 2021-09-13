import {LightningElement,track} from 'lwc';
import enrollUser from '@salesforce/apex/AssignedTaskProvider.enrollUser';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomLookupExample extends LightningElement {
@track explorerid;
@track mentorid;

    handleExplorerSelection(event){
        console.log("the selected explorer id is"+event.detail);
        this.explorerid = event.detail;
    }
    handleMentorSelection(event){
        console.log("the selected mentor id is"+event.detail);
        this.mentorid = event.detail;
    }

    enrollUser(){
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (isInputsCorrect) {
        const startdate = this.template.querySelector('.startdate').value;
        const enddate = this.template.querySelector('.enddate').value;
        const welcomeemail = this.template.querySelector('.welcomeemail').checked;
        console.log(startdate+'---'+enddate+'---'+welcomeemail);

         enrollUser({explorerid: this.explorerid,mentorid:this.mentorid,startdate:startdate,enddate:enddate,welcomeemail:welcomeemail})
        .then(result => {
            console.log('user updated==>', result);
            const toast = new ShowToastEvent({
                'title' : 'Updated',
                "message" : 'Record Updated Successfully',
                "variant" : "success",
                
            });
            this.dispatchEvent(toast); 
            window.location.reload();
        })
        .catch(error =>{
            console.log('Error==>',error);
        })
        }
    }    
}