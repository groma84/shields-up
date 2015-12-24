/// <reference path="MessageType.ts" />

module Game {
    export module Messaging {
        export abstract class Message {
            Type: MessageType;

            constructor(type: MessageType) {
                this.Type = type;
            }
        }
    }
}