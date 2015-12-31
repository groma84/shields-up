module Game {
    export module Messaging {
        export enum MessageType {
            Collision = 1,
            HealthChanged = 2,
            LifetimeEnds,
        }
    }
}