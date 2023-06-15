import { LightningElement, wire } from 'lwc';
import LwcChannel from '@salesforce/messageChannel/LwcChannel__c';
import { publish, subscribe, MessageContext } from 'lightning/messageService';

export default class LstInfoSecond extends LightningElement {
    info;
    @wire(MessageContext)
    messageContext;

    handleChange(event){
        this.info = event.detail.value;
    }

    handleClick() {
        let message = { message: this.info };
        publish(this.messageContext, LwcChannel, message);
    }

    connectedCallback() {
        this.handleSubscribe();
    }

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, LwcChannel, (message) => {
            this.info = message.message;
        });
    }
}