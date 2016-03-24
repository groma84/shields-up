/// <reference path="../ECS/Entity.ts" />
/// <reference path="MessageSystem.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/ScoreChangedMessage.ts" />
/// <reference path="../UI/Items.ts" />
/// <reference path="../UI/Text.ts" />

module Game {
    export module Systems {
        export class ScoreChangedListener implements MessageSystem {
            constructor() {
                Messaging.MessageManager.Subscribe(this, Messaging.MessageType.ScoreChanged);
            }

            Receive(message: Messaging.Message) {
                var typed = <Messaging.ScoreChangedMessage>message;
                             
                console.debug("Score of #" + typed.Player.Id + " changed by #" + typed.ScoreChangedByEntity.Id + ". New score: " + typed.NewScore);
                UI.Items.PlayerScore.Text = typed.NewScore.toString();
            }
        }
    }
}