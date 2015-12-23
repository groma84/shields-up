/// <reference path="Manager.ts" />
/// <reference path="UpdateSystem.ts" />
/// <reference path="RenderSystem.ts" />
/// <reference path="EnemyFactory.ts" />
/// <reference path="Move.ts" />
/// <reference path="Render.ts" />

module Game {
    export module Systems {
        export class Initialize {
            static All() {
                var enemyFactory = new Game.Systems.EnemyFactory(),
                    move = new Game.Systems.Move();

                Game.Systems.Manager.UpdateSystems = [
                    enemyFactory,
                    move
                ];

                var options = new Game.Systems.RenderOptions(800, 450);
                var renderSystem = new Game.Systems.Render(options);

                Game.Systems.Manager.RenderSystems = [
                    renderSystem
                ];
            }
        }
    }
}