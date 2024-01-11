import { EventEmitter } from 'excalibur';

export class Communication extends EventEmitter {
    constructor() {
        super();
    }

    public connect(url: string) {
        new WebSocket(url);
    }
}
