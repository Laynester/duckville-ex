import { Actor, Animation, ImageSource } from 'excalibur';

interface IPlayerPart {
    name: string;
    anims: {
        name: string;
        frames: string[];
    }[];
}
export class PlayerPart extends Actor {
    private _part: IPlayerPart;
    private _animations: Map<string, Animation> = new Map();
    private _actor: Actor;

    constructor(part: IPlayerPart, actor: Actor) {
        super();
        this._part = part;
        this._actor = actor;
    }

    public async loadMe(): Promise<void> {
        this._animations = new Map<string, Animation>();

        await Promise.all(
            this._part.anims.map(async (anim) => {
                let frames = [];

                await Promise.all(
                    anim.frames.map(async (frame) => {
                        const body = new ImageSource(
                            `./assets/images/char/${frame}`
                        );

                        await body.load();
                        const sprite = body.toSprite();

                        frames.push({
                            graphic: sprite,
                            duration: 500,
                        });
                    })
                );

                this._animations.set(
                    anim.name,
                    new Animation({
                        frames: frames,
                    })
                );
            })
        );
    }

    public playAnim(key: string) {
        if (!this._animations.get(key)) return;

        let animation = this._animations.get(key);

        animation.goToFrame(0);

        animation.reset();

        this.graphics.use(animation);
    }
}
