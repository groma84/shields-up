/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../ECS/Manager.ts" />
/// <reference path="../Components/Component.ts" />

module Game {
    export module Systems {
        export class EnemyFactory implements UpdateSystem {
            private _gameTime: number;
            private _nextSpawnTime: number;
            private _spawnLocations = [
                new PIXI.Point(50, 50),
                new PIXI.Point(50, 200),
                new PIXI.Point(50, 350),
                new PIXI.Point(750, 50),
                new PIXI.Point(750, 200),
                new PIXI.Point(750, 350),
            ];

            constructor() {
                this._gameTime = 0;
                this._nextSpawnTime = 1;
            }

            private MakeNewMeteor(spawnLocation: PIXI.Point, target: PIXI.Point): Game.Components.Component[] {
                var render = new Game.Components.Render(Game.Assets.Definitions.Meteor01, new PIXI.Point(1, 1)),
                    rigidBody = new Game.Components.RigidBody(spawnLocation.x, spawnLocation.y, 50, 50),
                    xDiff = target.x - spawnLocation.x,
                    yDiff = target.y - spawnLocation.y,
                    diffBetrag = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)),
                    xNeu = xDiff / diffBetrag,
                    yNeu = yDiff / diffBetrag,
                    move = new Game.Components.Move(5, new PIXI.Point(xNeu, yNeu));

                return [render, rigidBody, move];
            }

            Run(step: number, entities: ECS.Entity[]) {
                if (this._gameTime > this._nextSpawnTime) {
                    var target = entities.filter((item) => (item.Mask & (Components.Type.Player)) > 0)[0];
                    var targetBody = <Components.RigidBody>(target.Components.filter((component) => (component.Mask & Components.Type.RigidBody) > 0)[0]);

                    var spawnLocation = Math.floor(Math.random() * 6);
                    ECS.Manager.AddEntity(this.MakeNewMeteor(this._spawnLocations[spawnLocation], new PIXI.Point(targetBody.X, targetBody.Y)));
                    this._nextSpawnTime += Math.random() * 10;
                }

                this._gameTime += step;
            }
        }
    }
}