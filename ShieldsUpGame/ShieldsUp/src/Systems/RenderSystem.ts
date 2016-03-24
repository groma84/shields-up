/// <reference path="../ECS/Entity.ts" />
/// <reference path="../../lib/pixi.js.d.ts" />

module Game {
    export module Systems {
        export interface RenderSystem {
            Run: (dt: number, entities: Game.ECS.Entity[]) => void;
            Resize: (options: RenderOptions) => void;
            GetMenuContainer: () => PIXI.Container;
        }
    }
}