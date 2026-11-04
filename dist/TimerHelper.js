export class TimerHelper {
    intervalMs = 1000;
    isOneShot = true;
    intervalTimer = null;
    start(inst, onTimeup) {
        if (this.intervalTimer !== null) {
            this.clear();
        }
        this.intervalTimer = setTimeout(async () => {
            if (onTimeup !== undefined) {
                const res = await onTimeup(inst);
                if (!res) {
                    this.clear();
                }
            }
            if (this.isOneShot === true) {
                this.clear();
            }
        }, this.intervalMs);
    }
    clear() {
        clearTimeout(this.intervalTimer);
        this.intervalTimer = null;
    }
}
//# sourceMappingURL=TimerHelper.js.map