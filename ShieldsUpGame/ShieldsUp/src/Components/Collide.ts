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
        }
    }
}
