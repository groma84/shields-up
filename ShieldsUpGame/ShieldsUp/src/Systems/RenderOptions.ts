module Game {
    export module Systems {
        export class RenderOptions {
            XSize: number;
            YSize: number;
            Scale: number;

            constructor(xSize: number, ySize: number, scale: number) {
                this.XSize = xSize;
                this.YSize = ySize;
                this.Scale = scale;
            }
        }
    }
}