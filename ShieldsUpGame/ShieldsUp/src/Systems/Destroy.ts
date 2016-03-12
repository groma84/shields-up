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
                    this.DestroyEntity(typed.Entity);
                }
            }

            DestroyEntity(entity: ECS.Entity): void {
                var givesPoints = entity.GetComponent<Components.GivesPoints>(Components.Type.GivesPoints);
                var player = ECS.Manager.DefinedEntities.filter((item) => (item.Mask & (Components.Type.Player)) > 0)[0];

                if (player && givesPoints) {
                    var typedPlayer = player.GetComponent<Components.Player>(Components.Type.Player);
                    typedPlayer.Score += givesPoints.Points;

                    Messaging.MessageManager.Publish(Messaging.MessageType.ScoreChanged, new Messaging.ScoreChangedMessage(player, entity, typedPlayer.Score));
                }

                ECS.Manager.RemoveEntity(entity.Id);
            }
        }
    }
}