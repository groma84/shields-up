/// <reference path="../ECS/Entity.ts" />
/// <reference path="../ECS/Manager.ts" />
/// <reference path="MessageSystem.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/HealthChangedMessage.ts" />

module Game {
    export module Systems {
        export class Destroy implements MessageSystem {
            constructor() {
                Messaging.MessageManager.Subscribe(this, Messaging.MessageType.HealthChanged);
            }

            Receive(message: Messaging.Message) {
                var typed = <Messaging.HealthChangedMessage>message;

                if (typed.NewHealth <= 0) {
                    ECS.Manager.RemoveEntity(typed.Entity.Id);
                }
            }
        }
    }
}