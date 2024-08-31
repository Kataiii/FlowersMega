export class Debouncer {
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    public debounce(fn: Function, ms: number) {
        return (...args: any[]) => {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(() => fn(...args), ms);
        };
    }
}
