/// <reference path="../Utils/Vector2.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../ECS/Manager.ts" />
/// <reference path="../Components/Component.ts" />
/// <reference path="../Components/Render.ts" />
/// <reference path="../Components/RigidBody.ts" />
/// <reference path="../Components/Collide.ts" />
/// <reference path="../Components/Damage.ts" />

module Game {
    export module Systems {
        export class ShieldFactory implements UpdateSystem {
            static _gameTime: number;
            static _nextAllowedSpawnTime: number;
            static _spawnLocations = [
                new Utils.Vector2(50, 50),
                new Utils.Vector2(50, 200),
                new Utils.Vector2(50, 350),
                new Utils.Vector2(750, 50),
                new Utils.Vector2(750, 200),
                new Utils.Vector2(750, 350),
            ];

            constructor() {
                ShieldFactory._gameTime = 0;
                ShieldFactory._nextAllowedSpawnTime = 0;
            }

            static MakeNewShield(spawnLocationNumber: number): void {
                if (ShieldFactory._gameTime >= ShieldFactory._nextAllowedSpawnTime) {
                    var spawnLocation = ShieldFactory._spawnLocations[spawnLocationNumber],
                        size = new Utils.Vector2(10, 30),
                        render = new Game.Components.Render(Game.Assets.Definitions.Shield01, new PIXI.Point(1, 1)),
                        rigidBody = new Game.Components.RigidBody(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                        collide = new Game.Components.Collide(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                        damage = new Game.Components.Damage(1);
                    // TODO: Lifetime-Component, damit der Schild irgendwann auch wieder weggeht

                    ShieldFactory._nextAllowedSpawnTime = (ShieldFactory._gameTime + 1);

                    Game.ECS.Manager.AddEntity([render, rigidBody, collide, damage]);
                }
            }

            Run(step: number, entities: ECS.Entity[]) {
                ShieldFactory._gameTime += step;
            }
        }
    }
}