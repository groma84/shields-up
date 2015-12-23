/// <reference path="AssetDefinition.ts" />
/// <reference path="Definitions.ts" />

module Game {
    export module Assets {
        export class Sprites {
            private _definitions: AssetDefinition[] = [
                Definitions.BackgroundImage01,
                Definitions.Planet,
                Definitions.Meteor01,
            ];

            static LoadedTextures: PIXI.Texture[]

            LoadAssets(callback: (loader, resources) => void): void {
                var i = 0,
                    loader = PIXI.loader;

                this._definitions.forEach((asset) => {
                    loader.add(asset.Id, asset.Uri);
                });

                loader.once('complete', callback);
                loader.load();
            }
        }
    }
}