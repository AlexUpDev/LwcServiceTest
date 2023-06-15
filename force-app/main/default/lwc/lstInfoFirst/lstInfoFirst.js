import { LightningElement, wire } from 'lwc';
import LwcChannel from '@salesforce/messageChannel/LwcChannel__c';
import {publish, subscribe, MessageContext } from 'lightning/messageService'

export default class LstInfoFirst extends LightningElement {
    @wire(MessageContext)
    messageContext;
    info;
Ś
    handleChange(event){
        this.info = event.detail.value;
    }

    handleClick() {
        let message = { message: this.info, battery: 'on' };
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