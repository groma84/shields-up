/// <reference path="../Systems/MessageSystem.ts" />
/// <reference path="MessageType.ts" />
/// <reference path="Message.ts" />

module Game {
    export module Messaging {
        export class MessageManager {
            private static _subs = {};

            static Subscribe(system: Systems.MessageSystem, messageType: MessageType) {
                var oldSubs = this._subs[messageType] || [];

                this._subs[messageType] = oldSubs.concat(system);
            }

            static Publish(messageType: MessageType, message: Message) {
                if (this._subs[messageType]) {
                    this._subs[messageType].forEach((sub) => sub.Receive(message)); 
                }
            }
        }
    }
}