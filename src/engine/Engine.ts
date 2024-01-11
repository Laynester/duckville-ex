import { EventEmitter } from 'excalibur';
import { Communication } from './communication';

export class Engine extends EventEmitter {
    public static _instance: Engine;

    private _communication: Communication;

    constructor() {
        super();

        this._communication = new Communication();

        this.loadConfig();
    }

    private async loadConfig(): Promise<void> {
        let res = await fetch('./config.json');

        if (!res.ok) return;

        let data = await res.json();

        if (!data) return;

        this._communication.connect(data['socket']);
    }

    public static get Instance() {
        return this._instance || (this._instance = new Engine());
    }
}
