/// <reference path="Message.ts" />
/// <reference path="MessageType.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Lifetime.ts" />

module Game {
    export module Messaging {
        export class LifetimeEndsMessage extends Message {
            Entity: ECS.Entity;
            LifetimeComponent: Components.Lifetime;

            constructor(entity: ECS.Entity, lifetimeComponent: Components.Lifetime) {
                super(MessageType.LifetimeEnds);

                this.Entity = entity;
                this.LifetimeComponent = lifetimeComponent;
            }
        }
    }
}