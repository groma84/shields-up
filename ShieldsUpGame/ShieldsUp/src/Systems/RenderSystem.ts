/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Systems {
        export interface RenderSystem {
            Run: (dt: number, entities: Game.ECS.Entity[]) => void;
        }
    }
}