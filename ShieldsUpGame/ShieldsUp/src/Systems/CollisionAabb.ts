/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/RigidBody.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/CollisionMessage.ts" />

module Game {
    export module Systems {
        export class CollisionAabb implements UpdateSystem {
            constructor() {
            }

            // Axis-aligned Bounding Box
            Run(step: number, entities: ECS.Entity[]) {
                var entitiesToCollide: CollisionEntity[] = [],
                    workedEntityIds: number[] = [];

                entities.forEach((entity) => {
                    if (entity.Mask & (Game.Components.Type.Collide)) {
                        entitiesToCollide.push(new CollisionEntity(
                            <Components.Collide>(entity.Components.filter((component) => (component.Mask & Game.Components.Type.Collide) > 0)[0]),
                            entity
                        ));
                    }
                });

                // alles mit allem mal prüfen (Broad Phase sparen wir uns hier erstmal)
                entitiesToCollide.forEach((rect1) => {
                    entitiesToCollide.forEach((rect2) => {
                        if (rect1.Entity.Id !== rect2.Entity.Id && workedEntityIds.indexOf(rect2.Entity.Id) === -1) {
                            if (rect1.Collide.X < rect2.Collide.X + rect2.Collide.XSize &&
                                rect1.Collide.X + rect1.Collide.XSize > rect2.Collide.X &&
                                rect1.Collide.Y < rect2.Collide.Y + rect2.Collide.YSize &&
                                rect1.Collide.Y + rect1.Collide.YSize > rect2.Collide.Y) {

                                // Kollision
                                Messaging.MessageManager.Publish(Messaging.MessageType.Collision, new Messaging.CollisionMessage(rect1.Entity, rect2.Entity));
                            }
                        }
                    });

                    workedEntityIds.push(rect1.Entity.Id);
                });
            }
        }

        class CollisionEntity {
            Collide: Components.Collide;
            Entity: ECS.Entity;

            constructor(collide: Components.Collide, entity: ECS.Entity) {
                this.Collide = collide;
                this.Entity = entity;
            }
        }
    }
}