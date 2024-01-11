import { Actor, Animation, Frame, ImageSource, Sprite } from 'excalibur';

import PData from './Player.json';
import { PlayerPart } from './PlayerPart';

export class PlayerActor extends Actor {
    private _parts: PlayerPart[] = [];

    constructor() {
        super({ x: 50, y: 50 });

        this.load();
    }

    private async load(): Promise<void> {
        await Promise.all(
            PData.parts.map(async (part) => {
                let ppart = new PlayerPart(part, this);

                await ppart.loadMe();

                this._parts.push(ppart);

                this.addChild(ppart);
            })
        );

        this.playAnim('front_idle');
    }

    private async playAnim(key: string) {
        for (let part of this._parts) part.playAnim(key);
    }
}
