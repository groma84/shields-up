/// <reference path="Message.ts" />
/// <reference path="MessageType.ts" />
/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Messaging {
        export class CollisionMessage extends Message {
            Entity1: ECS.Entity;
            Entity2: ECS.Entity;

            constructor(entity1: ECS.Entity, entity2: ECS.Entity) {
                super(MessageType.Collision);

                this.Entity1 = entity1;
                this.Entity2 = entity2;
            }
        }
    }
}