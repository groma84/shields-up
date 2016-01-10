/// <reference path="../Utils/Vector2.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../ECS/Manager.ts" />
/// <reference path="../Components/Component.ts" />
/// <reference path="../Components/Render.ts" />
/// <reference path="../Components/RigidBody.ts" />
/// <reference path="../Components/Collide.ts" />
/// <reference path="../Components/Move.ts" />
/// <reference path="../Components/Health.ts" />
/// <reference path="../Components/Damage.ts" />

module Game {
    export module Systems {
        export class EnemyFactory implements UpdateSystem {
            private _gameTime: number;
            private _nextSpawnTime: number;
            private _spawnLocations = [
                new Utils.Vector2(50, 50),
                new Utils.Vector2(50, 200),
                new Utils.Vector2(50, 350),
                new Utils.Vector2(750, 50),
                new Utils.Vector2(750, 200),
                new Utils.Vector2(750, 350),
            ];

            constructor() {
                this._gameTime = 0;
                this._nextSpawnTime = 1;
            }

            private MakeNewMeteor(spawnLocation: Utils.Vector2, target: Utils.Vector2): Game.Components.Component[] {
                var size = new Utils.Vector2(ScreenSettings.Width / 20, ScreenSettings.Width / 20),
                    render = new Game.Components.Render(Game.Assets.Definitions.Meteor01, new PIXI.Point(size.X / Game.Assets.Definitions.Meteor01.ImageSize.X, size.Y / Game.Assets.Definitions.Meteor01.ImageSize.Y)),
                    rigidBody = new Game.Components.RigidBody(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                    collide = new Game.Components.Collide(spawnLocation.X, spawnLocation.Y, size.X * 0.9, size.Y * 0.9),
                    movementVector = new Game.Utils.Vector2(target.X - spawnLocation.X, target.Y - spawnLocation.Y).GetNormalized(),
                    move = new Game.Components.Move(Math.ceil(Math.random() * 20 + 40) * ScreenSettings.ScalingFactor, movementVector),
                    health = new Game.Components.Health(1),
                    damage = new Game.Components.Damage(1);

                return [render, rigidBody, move, collide, health, damage];
            }

            Run(step: number, entities: ECS.Entity[]) {
                if (this._gameTime > this._nextSpawnTime) {
                    var target = entities.filter((item) => (item.Mask & (Components.Type.Player)) > 0)[0];

                    if (target) {
                        var targetBody = target.GetComponent<Components.RigidBody>(Components.Type.RigidBody);

                        var spawnLocation = Math.floor(Math.random() * 6);
                        ECS.Manager.AddEntity(this.MakeNewMeteor(this._spawnLocations[spawnLocation], new Utils.Vector2(targetBody.X, targetBody.Y)));
                    }

                    this._nextSpawnTime += Math.random() * 10;
                }

                this._gameTime += step;
            }
        }
    }
}