/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/Lifetime.ts" />
/// <reference path="UpdateSystem.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/LifetimeEndsMessage.ts" />

module Game {
    export module Systems {
        export class Lifetime implements UpdateSystem {
            constructor() {
            }

            Run(step: number, entities: ECS.Entity[]) {
                var component;

                entities.forEach((entity) => {
                    if (entity.Mask & (Game.Components.Type.Lifetime)) {
                        component = entity.GetComponent<Components.Lifetime>(Game.Components.Type.Lifetime);
                        component.LifetimeInSeconds -= step;

                        if (component.LifetimeInSeconds <= 0) {
                            Messaging.MessageManager.Publish(Messaging.MessageType.LifetimeEnds, new Messaging.LifetimeEndsMessage(entity, component));
                        }
                    }
                });
            }
        }
    }
}