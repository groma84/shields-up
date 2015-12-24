/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="../Utils/Vector2.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/Move.ts" />
/// <reference path="../Components/RigidBody.ts" />

module Game {
    export module Systems {
        export class Move implements UpdateSystem {
            constructor() {
            }

            Run(step: number, entities: ECS.Entity[]) {
                var entitiesToMove: MovedEntity[] = [];

                entities.forEach((entity) => {
                    if (entity.Mask & (Game.Components.Type.Move || Game.Components.Type.RigidBody)) {
                        entitiesToMove.push(new MovedEntity(
                            <Components.Move>(entity.Components.filter((component) => (component.Mask & Game.Components.Type.Move) > 0)[0]),
                            <Components.RigidBody>(entity.Components.filter((component) => (component.Mask & Game.Components.Type.RigidBody) > 0)[0])
                        ));
                    }
                });

                entitiesToMove.forEach((entity) => {
                    entity.RigidBody.X += entity.Move.Direction.X * entity.Move.Velocity * step;
                    entity.RigidBody.Y += entity.Move.Direction.Y * entity.Move.Velocity * step;
                });
            }
        }

        class MovedEntity {
            Move: Components.Move;
            RigidBody: Components.RigidBody;

            constructor(move: Components.Move, rigidBody: Components.RigidBody) {
                this.Move = move;
                this.RigidBody = rigidBody;
            }
        }
    }
}