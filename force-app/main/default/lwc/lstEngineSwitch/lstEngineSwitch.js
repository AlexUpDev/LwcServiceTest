import { LightningElement, wire } from 'lwc';
import LwcChannel from '@salesforce/messageChannel/LwcChannel__c';
import { publish, MessageContext } from 'lightning/messageService'

export default class LstEngineSwitch extends LightningElement {
    @wire(MessageContext)
    messageContext;
   engineOn = false;
    handleClick() {
        this.engineOn = !this.engineOn;
        const engine = this.engineOn ? 'on' : 'off';
        let message = { engine: engine };
        publish(this.messageContext, LwcChannel, message);
    }
}