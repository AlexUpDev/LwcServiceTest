import { LightningElement, wire } from 'lwc';
import LwcChannel from '@salesforce/messageChannel/LwcChannel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LstSummary extends LightningElement {
    battery = 'off';
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.handleSubscribe();
        console.log('B: ' + this.battery);
    }

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, LwcChannel, (message) => {
            this.battery = message.battery;
        });
    }
}