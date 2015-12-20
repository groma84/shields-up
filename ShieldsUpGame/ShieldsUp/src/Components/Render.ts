/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Render extends Component {
            ImageUrl: string;
            Scale: number;

            constructor(imageUrl: string, scale: number) {
                super();

                this.ImageUrl = imageUrl;
                this.Scale = scale;

                this.Mask = Game.Components.Type.Render;
            }
        }
    }
}