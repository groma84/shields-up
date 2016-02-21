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
            static _spawnOffsets = [
                new Utils.Vector2(-90, -120),
                new Utils.Vector2(-90, 0),
                new Utils.Vector2(-90, 120),
                new Utils.Vector2(90, -120),
                new Utils.Vector2(90, 0),
                new Utils.Vector2(90, 120),
            ];

            constructor() {
                ShieldFactory._gameTime = 0;
                ShieldFactory._nextAllowedSpawnTime = 0;
            }

            static MakeNewShield(spawnLocationNumber: number): void {
                if (ShieldFactory._gameTime >= ShieldFactory._nextAllowedSpawnTime) {
                    var spawnLocation = ShieldFactory.CalculateSpawnPosition(spawnLocationNumber),
                        size = new Utils.Vector2(ScreenSettings.Width / 120, ScreenSettings.Height / 10),
                        render = new Game.Components.Render(Game.Assets.Definitions.Shield01, new PIXI.Point(size.X / Game.Assets.Definitions.Shield01.ImageSize.X, size.Y / Game.Assets.Definitions.Shield01.ImageSize.Y)),
                        rigidBody = new Game.Components.RigidBody(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                        collide = new Game.Components.Collide(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                        lifetime = new Game.Components.Lifetime(3),
                        makesOthersBounce = new Components.MakesOthersBounce();

                    ShieldFactory._nextAllowedSpawnTime = (ShieldFactory._gameTime + 1.0);

                    Game.ECS.Manager.AddEntity([render, rigidBody, collide, lifetime, makesOthersBounce]);
                }
            }

            Run(step: number, entities: ECS.Entity[]) {
                ShieldFactory._gameTime += step;
            }

            private static CalculateSpawnPosition(spawnLocationNumber: number) {
                var baseOffsetFromPlanet = ShieldFactory._spawnOffsets[spawnLocationNumber];

                var player = Game.ECS.Manager.DefinedEntities.filter((item) => (item.Mask & (Components.Type.Player)) > 0)[0];

                if (player) {
                    var targetBody = player.GetComponent<Components.RigidBody>(Components.Type.RigidBody);

                    // in Y-Richtung beruecksichtigen wir die Groesse des Planeten nicht
                    var y = (targetBody.Y + baseOffsetFromPlanet.Y) * ScreenSettings.ScalingFactor;

                    // in X-Richtung muessen wir erstmal um die Planetenbreite in die richtige Richtung verschieben, und dann unser Offset anwenden
                    var x = (targetBody.X + baseOffsetFromPlanet.X + (baseOffsetFromPlanet.X < 0 ? -(targetBody.XSize / 2) : (targetBody.XSize / 2))) * ScreenSettings.ScalingFactor;

                    return new Utils.Vector2(x, y);
                }

                return baseOffsetFromPlanet; // falls gar kein Player gefunden wurde, ist eh alles egal
            }
        }
    }
}