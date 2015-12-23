/// <reference path="UpdateSystem.ts" />
/// <reference path="RenderSystem.ts" />

module Game {
    export module Systems {
        export class Manager {
            static UpdateSystems: Game.Systems.UpdateSystem[];
            static RenderSystems: Game.Systems.RenderSystem[];
        }
    }
}

