/// <reference path="Message.ts" />
/// <reference path="MessageType.ts" />
/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Messaging {
        export class PointsChangedMessage extends Message {
            Player: ECS.Entity;
            PointsChangedByEntity: ECS.Entity;
            NewScore: number;

            constructor(player: ECS.Entity, pointsChangedByEntity: ECS.Entity, newScore: number) {
                super(MessageType.PointsChanged);

                this.Player = player;
                this.PointsChangedByEntity = pointsChangedByEntity;
                this.NewScore = newScore;
            }
        }
    }
}