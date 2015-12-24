/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class RigidBody extends Component {
            X: number;
            Y: number;
            XSize: number;
            YSize: number;

            constructor(x: number, y: number, xSize: number, ySize: number) {
                super(Game.Components.Type.RigidBody);

                this.X = x;
                this.Y = y;
                this.XSize = xSize;
                this.YSize = ySize;
            }
        }
    }
}
