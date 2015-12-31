/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/MakesOthersBounce.ts" />
/// <reference path="../Components/Move.ts" />
/// <reference path="MessageSystem.ts" />
/// <reference path="../Messaging/MessageType.ts" />
/// <reference path="../Messaging/MessageManager.ts" />
/// <reference path="../Messaging/CollisionMessage.ts" />

module Game {
    export module Systems {
        export class BounceListener implements MessageSystem {
            constructor() {
                Messaging.MessageManager.Subscribe(this, Messaging.MessageType.Collision);
            }

            Receive(message: Messaging.Message) {
                var typed = <Messaging.CollisionMessage>message;

                // wir bouncen die Entities, sofern eine MakesOthersBounce-Component vorhanden ist und die jeweils andere Entity noch nicht gebounced wurde
                if ((typed.Entity1.Mask & Game.Components.Type.MakesOthersBounce) && (typed.Entity2.Mask & Game.Components.Type.Move)) {
                    this.Bounce(typed.Entity1, typed.Entity2);
                }

                if ((typed.Entity2.Mask & Game.Components.Type.MakesOthersBounce) && (typed.Entity1.Mask & Game.Components.Type.Move)) {
                    this.Bounce(typed.Entity2, typed.Entity1);
                }
            }

            private Bounce(entityMakesBounce: ECS.Entity, movingEntity: ECS.Entity) {
                var bounce: Components.MakesOthersBounce,
                    move: Components.Move;

                bounce = entityMakesBounce.GetComponent<Components.MakesOthersBounce>(Components.Type.MakesOthersBounce);
                move = movingEntity.GetComponent<Components.Move>(Components.Type.Move);
                if (bounce.AlreadyBouncedEntities.indexOf(movingEntity) === -1) {
                    move.Direction.X = -move.Direction.X;
                    bounce.AlreadyBouncedEntities.push(movingEntity);
                }
            }
        }
    }
}