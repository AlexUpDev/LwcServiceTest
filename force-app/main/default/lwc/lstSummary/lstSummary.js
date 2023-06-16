import { LightningElement, wire } from 'lwc';
import LwcChannel from '@salesforce/messageChannel/LwcChannel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LstSummary extends LightningElement {
    battery = 'off';
    engine = 'off';
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.handleSubscribe();
    }

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, LwcChannel, (message) => {
            if (message.battery) {
                this.battery = message.battery;
            }
            if (message.engine) {
                this.engine = this.batteryOn ? message.engine : 'off';
            }
        });
    }

    get batteryOn() {
        return this.battery === 'on';
    }
}