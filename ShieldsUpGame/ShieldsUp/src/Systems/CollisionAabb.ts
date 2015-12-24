/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/RigidBody.ts" />

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
                                // TODO: Message auslösen, "ec1 kollidert mit ec2"
                                console.debug(rect1.Entity.Id + " kollidiert mit " + rect2.Entity.Id);
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