/// <reference path="Manager.ts" />
/// <reference path="UpdateSystem.ts" />
/// <reference path="RenderSystem.ts" />
/// <reference path="MessageSystem.ts" />

/// <reference path="EnemyFactory.ts" />
/// <reference path="ShieldFactory.ts" />

/// <reference path="CollisionAabb.ts" />
/// <reference path="Input.ts" />
/// <reference path="Lifetime.ts" />
/// <reference path="Move.ts" />

/// <reference path="Render.ts" />

/// <reference path="BounceListener.ts" />
/// <reference path="Damage.ts" />
/// <reference path="Destroy.ts" />
/// <reference path="LifetimeListener.ts" />


module Game {
    export module Systems {
        export class Initialize {
            static All() {
                // UpdateSystems
                var enemyFactory = new Game.Systems.EnemyFactory(),
                    shieldFactory = new Game.Systems.ShieldFactory(),
                    collisionAabb = new Game.Systems.CollisionAabb(),
                    input = new Game.Systems.Input(),
                    lifetime = new Game.Systems.Lifetime(),
                    move = new Game.Systems.Move()
                    ;

                // werden zuerst ausgefuehrt, und zwar in der Reihenfolge, in der sie im Array stecken
                Game.Systems.Manager.UpdateSystems = [
                    input,
                    enemyFactory,
                    shieldFactory,
                    lifetime,
                    move,
                    collisionAabb,
                ];

                // RenderSystems, die nach den UpdateSystems ausgefuehrt werden
                var options = new Game.Systems.RenderOptions(800, 450);
                var renderSystem = new Game.Systems.Render(options);

                Game.Systems.Manager.RenderSystems = [
                    renderSystem
                ];

                // MessageSystems, die sich dann selbst beim MessageManager registrieren
                var bounceListener = new Game.Systems.BounceListener();
                var damageSystem = new Game.Systems.Damage();
                var destroySystem = new Game.Systems.Destroy();
                var lifetimeListenerSystem = new Game.Systems.LifetimeListener();
            }
        }
    }
}