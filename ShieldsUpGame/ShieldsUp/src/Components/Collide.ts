/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Collide extends Component {
            X: number;
            Y: number;
            XSize: number;
            YSize: number;

            constructor(x: number, y: number, xSize: number, ySize: number) {
                super(Game.Components.Type.Collide);

                // hier tun wir uns leichter, wenn wir den Anchor nach LinksOben setzen, statt in die Mitte
                this.X = x - xSize/2;
                this.Y = y - ySize/2;
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
