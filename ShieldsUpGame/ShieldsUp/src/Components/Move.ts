/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="../Utils/Vector2.ts" />
/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Move extends Component {
            Velocity: number;
            Direction: Utils.Vector2;

            constructor(velocity: number, direction: Utils.Vector2) {
                super();
                
                this.Velocity = velocity;
                this.Direction = direction;

                this.Mask = Game.Components.Type.Move;
            }
        }
    }
}
