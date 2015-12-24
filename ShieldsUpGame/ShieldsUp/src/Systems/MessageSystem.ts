/// <reference path="../Messaging/Message.ts" />

module Game {
    export module Systems {
        export interface MessageSystem {
            Receive: (message: Messaging.Message) => void;
        }
    }
}