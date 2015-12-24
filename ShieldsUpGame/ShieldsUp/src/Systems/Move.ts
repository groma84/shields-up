/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="../Utils/Vector2.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/Move.ts" />
/// <reference path="../Components/RigidBody.ts" />
/// <reference path="../Components/Collide.ts" />

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
                            entity.GetComponent<Components.Move>(Components.Type.Move),
                            entity.GetComponent<Components.RigidBody>(Components.Type.RigidBody),
                            entity.GetComponent<Components.Collide>(Components.Type.Collide)
                        ));
                    }
                });

                entitiesToMove.forEach((entity) => {
                    entity.RigidBody.X += entity.Move.Direction.X * entity.Move.Velocity * step;
                    entity.RigidBody.Y += entity.Move.Direction.Y * entity.Move.Velocity * step;

                    if (entity.Collide) {
                        entity.Collide.X += entity.Move.Direction.X * entity.Move.Velocity * step;
                        entity.Collide.Y += entity.Move.Direction.Y * entity.Move.Velocity * step;
                    }
                });
            }
        }

        class MovedEntity {
            Move: Components.Move;
            RigidBody: Components.RigidBody;
            Collide: Components.Collide;

            constructor(move: Components.Move, rigidBody: Components.RigidBody, collide: Components.Collide) {
                this.Move = move;
                this.RigidBody = rigidBody;
                this.Collide = collide;
            }
        }
    }
}