export class BroadcastChannelHelper {
    channel = `defaultChannel`;
    onNotify;
    receiveEventArg;
    bc;
    started = false;
    Start() {
        if (this.started)
            return false;
        this.bc = new BroadcastChannel(this.channel);
        this.bc.onmessage = this.onMessage;
        this.started = true;
        return true;
    }
    Stop() {
        if (this.started) {
            this.bc.close();
        }
        this.started = false;
    }
    notifyBool(onoff) {
        if (this.started) {
            this.bc.postMessage(`${onoff}`);
        }
    }
    get receivedBool() {
        if (this.receiveEventArg === undefined)
            return null;
        if (this.receiveEventArg.data === undefined)
            return null;
        return this.receiveEventArg.data === `true` ? true : false;
    }
    onMessage = (ev) => {
        console.log(ev);
        this.receiveEventArg = ev;
        if (this.onNotify !== undefined) {
            this.onNotify(this);
        }
    };
}
//# sourceMappingURL=BroadcastChannelHelper.js.map