/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/Damage.ts" />
/// <reference path="../Components/Health.ts" />
/// <reference path="MessageSystem.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/CollisionMessage.ts" />
/// <reference path="../Messaging/HealthChangedMessage.ts" />

module Game {
    export module Systems {
        export class Damage implements MessageSystem {
            constructor() {
                Messaging.MessageManager.Subscribe(this, Messaging.MessageType.Collision);
            }

            Receive(message: Messaging.Message) {
                var typed = <Messaging.CollisionMessage>message;

                if ((typed.Entity1.Mask & Game.Components.Type.Damage) && (typed.Entity2.Mask & Game.Components.Type.Health)) {
                    if (Game.DebugSettings.ShowDamage) {
                        console.debug("Damage: " + typed.Entity1.Id + " does " + typed.Entity1.GetComponent<Components.Damage>(Game.Components.Type.Damage).DamagePerHit + " damage to " + typed.Entity2.Id);
                    }

                    typed.Entity2.GetComponent<Components.Health>(Game.Components.Type.Health).Health -= typed.Entity1.GetComponent<Components.Damage>(Game.Components.Type.Damage).DamagePerHit;
                    Messaging.MessageManager.Publish(Messaging.MessageType.HealthChanged, new Messaging.HealthChangedMessage(typed.Entity2, typed.Entity2.GetComponent<Components.Health>(Game.Components.Type.Health).Health));
                }

                if ((typed.Entity2.Mask & Game.Components.Type.Damage) && (typed.Entity1.Mask & Game.Components.Type.Health)) {
                    if (Game.DebugSettings.ShowDamage) {
                        console.debug("Damage: " + typed.Entity2.Id + " does " + typed.Entity2.GetComponent<Components.Damage>(Game.Components.Type.Damage).DamagePerHit + " damage to " + typed.Entity1.Id);
                    }

                    typed.Entity1.GetComponent<Components.Health>(Game.Components.Type.Health).Health -= typed.Entity2.GetComponent<Components.Damage>(Game.Components.Type.Damage).DamagePerHit;
                    Messaging.MessageManager.Publish(Messaging.MessageType.HealthChanged, new Messaging.HealthChangedMessage(typed.Entity1, typed.Entity1.GetComponent<Components.Health>(Game.Components.Type.Health).Health));
                }
            }
        }
    }
}