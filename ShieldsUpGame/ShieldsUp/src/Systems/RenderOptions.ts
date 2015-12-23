module Game {
    export module Systems {
        export class RenderOptions {
            XSize: number;
            YSize: number;

            constructor(xSize: number, ySize: number) {
                this.XSize = xSize;
                this.YSize = ySize;
            }
        }
    }
}