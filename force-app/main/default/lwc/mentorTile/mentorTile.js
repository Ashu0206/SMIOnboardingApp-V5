import { LightningElement, api } from 'lwc';

export default class MentorTile extends LightningElement {

    @api mentorRecord;

    pictureUrl = 'https://loanalexa.com/wp-content/uploads/2016/12/testimonial1.png';

    connectedCallback(){
        console.log('mentor record==>'+this.mentorRecord)
    }

    handleOpenRecord() {
        console.log(this.mentorRecord.Name)
        
        const selectEvent = new CustomEvent('mentorview', {
            detail: this.mentorRecord.Id
        });
        this.dispatchEvent(selectEvent);
    }




}