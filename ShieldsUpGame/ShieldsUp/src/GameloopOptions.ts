// <reference path="./ECS/Entity.ts" />

module Game {
    export class GameloopOptions {
        SlowFactor: number;
        Fps: number;
        UpdateMethod: (step: number, entities: Game.ECS.Entity[]) => void;
        RenderMethod: (dt: number, entities: Game.ECS.Entity[]) => void;

        constructor(updateMethod: (step: number, entities: Game.ECS.Entity[]) => void, renderMethod: (dt: number, entities: Game.ECS.Entity[]) => void, fps: number = 30, slowFactor: number = 1) {
            this.SlowFactor = slowFactor;
            this.Fps = fps;
            this.UpdateMethod = updateMethod;
            this.RenderMethod = renderMethod;
        }
    }
}