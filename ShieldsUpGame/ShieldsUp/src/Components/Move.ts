/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Move extends Component {
            Velocity: number;
            Direction: PIXI.Point;

            constructor(velocity: number, direction: PIXI.Point) {
                super();
                
                this.Velocity = velocity;
                this.Direction = direction;

                this.Mask = Game.Components.Type.Move;
            }
        }
    }
}
