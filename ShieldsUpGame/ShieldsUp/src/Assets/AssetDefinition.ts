/// <reference path="../Utils/Vector2.ts" />

module Game {
    export module Assets {
        export class AssetDefinition {
            Id: string;
            Uri: string;
            ImageSize: Utils.Vector2;

            constructor(id: string, uri: string, imageSize: Utils.Vector2) {
                this.Id = id;
                this.Uri = uri;
                this.ImageSize = imageSize;
            }
        }
    }
}