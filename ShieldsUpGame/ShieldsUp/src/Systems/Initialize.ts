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
                // UpdateSystems
                var enemyFactory = new Game.Systems.EnemyFactory(),
                    move = new Game.Systems.Move(),
                    collisionAabb = new Game.Systems.CollisionAabb();

                Game.Systems.Manager.UpdateSystems = [
                    enemyFactory,
                    move,
                    collisionAabb
                ];

                // RenderSystems
                var options = new Game.Systems.RenderOptions(800, 450);
                var renderSystem = new Game.Systems.Render(options);

                Game.Systems.Manager.RenderSystems = [
                    renderSystem
                ];

                // MessageSystems
                var damageSystem = new Game.Systems.Damage();
                var destroySystem = new Game.Systems.Destroy();
            }
        }
    }
}