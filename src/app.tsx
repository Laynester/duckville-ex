import { useLayoutEffect } from "react";
import { useApp } from "./hooks";
import { Engine, DisplayMode, Actor, Color } from "excalibur";
import { PlayerActor } from "./engine/actors/player/PlayerActor";

export const App = () => {
    const {} = useApp();

    useLayoutEffect(() => {
        const game = new Engine({
            canvasElementId: "game",
            displayMode: DisplayMode.FillContainer,
        });

        const paddle = new Actor({
            x: 150,
            y: game.drawHeight - 40,
            width: 200,
            height: 20,
            // Let's give it some color with one of the predefined
            // color constants
            color: Color.Chartreuse,
        });

        game.start();
        game.add(paddle);
        game.add(new PlayerActor());

        game.input.pointers.primary.on("move", (evt) => {
            paddle.pos.x = evt.worldPos.x;
        });
    });

    return <canvas id="game">hello bitch</canvas>;
};
