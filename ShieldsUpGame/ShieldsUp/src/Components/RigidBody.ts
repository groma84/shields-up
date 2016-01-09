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


            OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number) {
                this.X = (this.X / oldScalingFactor * newScalingFactor);
                this.Y = (this.Y / oldScalingFactor * newScalingFactor);
                this.XSize = (this.XSize / oldScalingFactor * newScalingFactor);
                this.YSize = (this.YSize / oldScalingFactor * newScalingFactor);
            }
        }
    }
}
