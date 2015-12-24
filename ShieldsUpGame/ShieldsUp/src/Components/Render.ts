/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="Type.ts" />
/// <reference path="Component.ts" />
/// <reference path="../Assets/AssetDefinition.ts" />

module Game {
    export module Components {
        export class Render extends Component {
            Id: string;
            ImageUrl: string;
            Scale: PIXI.Point;

            constructor(assetDefinition: Assets.AssetDefinition, scale: PIXI.Point) {
                super(Game.Components.Type.Render);

                this.ImageUrl = assetDefinition.Uri;
                this.Id = assetDefinition.Id;

                this.Scale = scale;
            }
        }
    }
}