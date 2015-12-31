/// <reference path="../Utils/Vector2.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../ECS/Manager.ts" />
/// <reference path="../Components/Component.ts" />
/// <reference path="../Components/Render.ts" />
/// <reference path="../Components/RigidBody.ts" />
/// <reference path="../Components/Collide.ts" />
/// <reference path="../Components/Lifetime.ts" />
/// <reference path="../Components/MakesOthersBounce.ts" />

module Game {
    export module Systems {
        export class ShieldFactory implements UpdateSystem {
            static _gameTime: number;
            static _nextAllowedSpawnTime: number;
            static _spawnLocations = [
                new Utils.Vector2(350, 120),
                new Utils.Vector2(350, 200),
                new Utils.Vector2(350, 280),
                new Utils.Vector2(550, 120),
                new Utils.Vector2(550, 200),
                new Utils.Vector2(550, 280),
            ];

            constructor() {
                ShieldFactory._gameTime = 0;
                ShieldFactory._nextAllowedSpawnTime = 0;
            }

            static MakeNewShield(spawnLocationNumber: number): void {
                if (ShieldFactory._gameTime >= ShieldFactory._nextAllowedSpawnTime) {
                    var spawnLocation = ShieldFactory._spawnLocations[spawnLocationNumber],
                        size = new Utils.Vector2(ScreenSettings.Width / 120, ScreenSettings.Width / 40),
                        render = new Game.Components.Render(Game.Assets.Definitions.Shield01, new PIXI.Point(size.X / Game.Assets.Definitions.Shield01.ImageSize.X, size.Y / Game.Assets.Definitions.Shield01.ImageSize.Y)),
                        rigidBody = new Game.Components.RigidBody(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                        collide = new Game.Components.Collide(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                        lifetime = new Game.Components.Lifetime(3),
                        makesOthersBounce = new Components.MakesOthersBounce();

                    ShieldFactory._nextAllowedSpawnTime = (ShieldFactory._gameTime + 1);

                    Game.ECS.Manager.AddEntity([render, rigidBody, collide, lifetime, makesOthersBounce]);
                }
            }

            Run(step: number, entities: ECS.Entity[]) {
                ShieldFactory._gameTime += step;
            }
        }
    }
}