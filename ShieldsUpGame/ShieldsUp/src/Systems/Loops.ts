/// <reference path="Manager.ts" />
/// <reference path="UpdateSystem.ts" />
/// <reference path="RenderSystem.ts" />
/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Systems {
        export class Loops {
            static Update: (step: number, entities: Game.ECS.Entity[]) => void = (step, entities) => {
                Game.Systems.Manager.UpdateSystems.forEach(system => system.Run(step, entities));
            }

            static Render: (dt: number, entities: Game.ECS.Entity[]) => void = (dt, entities) => {
                Game.Systems.Manager.RenderSystems.forEach(system => system.Run(dt, entities));
            }
        }
    }
}