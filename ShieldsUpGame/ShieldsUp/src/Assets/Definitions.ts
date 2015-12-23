/// <reference path="AssetDefinition.ts" />

module Game {
    export module Assets {
        export abstract class Definitions {
            static BackgroundImage01: AssetDefinition = new AssetDefinition("background-image-1", "../assets/sprites/bg1.png"); 
        }
    }
}