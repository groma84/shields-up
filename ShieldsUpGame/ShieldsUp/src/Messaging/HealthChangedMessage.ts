/// <reference path="Message.ts" />
/// <reference path="MessageType.ts" />
/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Messaging {
        export class HealthChangedMessage extends Message {
            Entity: ECS.Entity;
            NewHealth: number;

            constructor(entity: ECS.Entity, newHealth: number) {
                super(MessageType.HealthChanged);

                this.Entity = entity;
                this.NewHealth = newHealth;
            }
        }
    }
}