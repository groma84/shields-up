/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/Lifetime.ts" />
/// <reference path="MessageSystem.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/LifetimeEndsMessage.ts" />

module Game {
    export module Systems {
        export class LifetimeListener implements MessageSystem {
            constructor() {
                Messaging.MessageManager.Subscribe(this, Messaging.MessageType.LifetimeEnds);
            }

            Receive(message: Messaging.Message) {
                var typed = <Messaging.LifetimeEndsMessage>message;

                // vorerst einfach entfernen
                ECS.Manager.RemoveEntity(typed.Entity.Id);
            }
        }
    }
}