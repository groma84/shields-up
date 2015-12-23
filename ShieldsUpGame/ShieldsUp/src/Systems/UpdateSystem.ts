/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Systems {
        export interface UpdateSystem {
            Run: (step: number, entities: Game.ECS.Entity[]) => void;
        }
    }
}