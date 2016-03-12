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
/// <reference path="../Components/GivesPoints.ts" />

module Game {
    export module Systems {
        export class EnemyFactory implements UpdateSystem {
            private _gameTime: number;
            private _nextSpawnTime: number;
            private _lastSpawnLocationIndex: number = -1;

            private _maximumSpawnSpeedAfterSeconds: number = 120;
            private _minimumSpawnSpeedMultiplier: number = 2;

            private _maximumMovementSpeedDivisor: number = 3; // je kleiner, desto schneller erreichen wir das Maximum
            private _maximumAdditionalSpeed: number = 100;

            constructor() {
                this._gameTime = 0;
                this._nextSpawnTime = 1;
            }

            Run(step: number, entities: ECS.Entity[]) {
                if (this._gameTime > this._nextSpawnTime) {
                    var player = entities.filter((item) => (item.Mask & (Components.Type.Player)) > 0)[0];

                    if (player) {
                        var targetBody = player.GetComponent<Components.RigidBody>(Components.Type.RigidBody);
                        ECS.Manager.AddEntity(this.MakeNewMeteor(new Utils.Vector2(targetBody.X, targetBody.Y)));
                    }

                    // 1. Teil des Terms wird auf minimal n gesetzt, damit die Meteore nicht zu sehr nacheinander kommen
                    // 2. Teil des Terms: muss mindestens 1 sein; maximale Spawngeschwindigkeit wird nach X Sekunden erreicht
                    this._nextSpawnTime += Math.max(0.5, Math.random()) * (Math.max(this._minimumSpawnSpeedMultiplier, (this._maximumSpawnSpeedAfterSeconds - this._gameTime) / 10));
                }

                this._gameTime += step;
            }

            private MakeNewMeteor(target: Utils.Vector2): Game.Components.Component[] {
                var moveSpeed = Math.ceil(Math.random() * 20 + 40) + Math.min(this._maximumAdditionalSpeed, this._gameTime / this._maximumMovementSpeedDivisor), // unsere Meteore werden immer schneller
                    spawnLocationIndex = this.GetRandomSpawnLocationIndexButNotTheSameAsLastTime(),
                    size = new Utils.Vector2(ScreenSettings.Width / 20, ScreenSettings.Width / 20),
                    spawnOffsets = [
                        new Utils.Vector2(-(ScreenSettings.Width / 2 + size.X), -(ScreenSettings.Height / 2 + size.Y)),
                        new Utils.Vector2(-(ScreenSettings.Width / 2 + size.X), 0),
                        new Utils.Vector2(-(ScreenSettings.Width / 2 + size.X), (ScreenSettings.Height / 2 + size.Y)),
                        new Utils.Vector2((ScreenSettings.Width / 2 + size.X), -(ScreenSettings.Height / 2 + size.Y)),
                        new Utils.Vector2((ScreenSettings.Width / 2 + size.X), 0),
                        new Utils.Vector2((ScreenSettings.Width / 2 + size.X), (ScreenSettings.Height / 2 + size.Y)),
                    ],
                    spawnLocation = this.CalculateSpawnPosition(spawnLocationIndex, spawnOffsets),
                    render = new Game.Components.Render(Game.Assets.Definitions.Meteor01, new PIXI.Point(size.X / Game.Assets.Definitions.Meteor01.ImageSize.X, size.Y / Game.Assets.Definitions.Meteor01.ImageSize.Y)),
                    rigidBody = new Game.Components.RigidBody(spawnLocation.X, spawnLocation.Y, size.X, size.Y),
                    collide = new Game.Components.Collide(spawnLocation.X, spawnLocation.Y, size.X * 0.9, size.Y * 0.9),
                    movementVector = new Game.Utils.Vector2(target.X - spawnLocation.X, target.Y - spawnLocation.Y).GetNormalized(),
                    move = new Game.Components.Move(moveSpeed * ScreenSettings.ScalingFactor, movementVector),
                    health = new Game.Components.Health(1),
                    damage = new Game.Components.Damage(1),
                    givesPoints = new Game.Components.GivesPoints(1);

                return [render, rigidBody, move, collide, health, damage, givesPoints];
            }

            private GetRandomSpawnLocationIndexButNotTheSameAsLastTime(): number {
                var maximumPossibleSpawnLocationIndex = 6,
                    generateRandom = () => Math.floor(Math.random() * maximumPossibleSpawnLocationIndex),
                    spawnLocationNumber = generateRandom();

                // wir wollen nicht zweimal den gleichen Index nacheinander
                while (spawnLocationNumber === this._lastSpawnLocationIndex) {
                    spawnLocationNumber = generateRandom()
                }
                this._lastSpawnLocationIndex = spawnLocationNumber;

                return spawnLocationNumber;
            }

            private CalculateSpawnPosition(spawnLocationNumber: number, spawnOffsets: Utils.Vector2[]) {
                var baseOffsetFromPlanet = spawnOffsets[spawnLocationNumber];

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