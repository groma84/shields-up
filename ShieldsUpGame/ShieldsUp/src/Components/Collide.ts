﻿/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Collide extends Component {
            X: number;
            Y: number;
            XSize: number;
            YSize: number;

            constructor(x: number, y: number, xSize: number, ySize: number) {
                super();

                this.X = x;
                this.Y = y;
                this.XSize = xSize;
                this.YSize = ySize;

                this.Mask = Game.Components.Type.Collide;
            }
        }
    }
}