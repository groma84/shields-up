/// <reference path="UpdateSystem.ts" />
/// <reference path="RenderSystem.ts" />

module Game {
    export module Systems {
        export class Manager {
            static UpdateSystems: Game.Systems.UpdateSystem[];
            static RenderSystems: Game.Systems.RenderSystem[];

            private static _activeRenderSystem: Game.Systems.RenderSystem;
            static get ActiveRenderSystem(): Game.Systems.RenderSystem {
                return Manager._activeRenderSystem;
            }
            static set ActiveRenderSystem(activeRenderSystem: Game.Systems.RenderSystem) {
                Manager._activeRenderSystem = activeRenderSystem;
            }
        }
    }
}

