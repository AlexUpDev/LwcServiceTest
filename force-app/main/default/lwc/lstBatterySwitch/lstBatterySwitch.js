import { LightningElement, wire } from 'lwc';
import LwcChannel from '@salesforce/messageChannel/LwcChannel__c';
import { publish, MessageContext } from 'lightning/messageService'

export default class LstBatterySwitch extends LightningElement {
    @wire(MessageContext)
    messageContext;
    batteryOn = false;
    handleClick() {
        this.batteryOn = !this.batteryOn;
        const battery = this.batteryOn ? 'on' : 'off';
        let message = { battery: battery };
        publish(this.messageContext, LwcChannel, message);
    }
}