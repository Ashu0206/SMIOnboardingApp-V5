import { LightningElement, api } from 'lwc';

export default class EmployeeT extends LightningElement {


    @api employeeRecord;

    pictureUrl ='https://loanalexa.com/wp-content/uploads/2016/12/testimonial1.png';


    handleDetails(){
        
    }

    handleOpenRecordClick() {
       // alert('inside view details');
        console.log(this.employeeRecord)
        
        const selectEvent = new CustomEvent('employeeview', {
            detail: this.employeeRecord.Id
        });
        this.dispatchEvent(selectEvent);
    }



}