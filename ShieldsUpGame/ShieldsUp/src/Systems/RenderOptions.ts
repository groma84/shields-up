module Game {
    export module Systems {
        export class RenderOptions {
            XSize: number;
            YSize: number;
            BackgroundColor: string;

            constructor(xSize: number, ySize: number, backgroundColor: string) {
                this.XSize = xSize;
                this.YSize = ySize;
                this.BackgroundColor = backgroundColor;
            }
        }
    }
}