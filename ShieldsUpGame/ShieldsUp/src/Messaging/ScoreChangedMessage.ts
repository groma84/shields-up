/// <reference path="Message.ts" />
/// <reference path="MessageType.ts" />
/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Messaging {
        export class ScoreChangedMessage extends Message {
            Player: ECS.Entity;
            ScoreChangedByEntity: ECS.Entity;
            NewScore: number;

            constructor(player: ECS.Entity, scoreChangedByEntity: ECS.Entity, newScore: number) {
                super(MessageType.ScoreChanged);

                this.Player = player;
                this.ScoreChangedByEntity = scoreChangedByEntity;
                this.NewScore = newScore;
            }
        }
    }
}