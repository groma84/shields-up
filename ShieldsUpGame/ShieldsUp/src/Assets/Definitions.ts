/// <reference path="AssetDefinition.ts" />

module Game {
    export module Assets {
        export abstract class Definitions {
            static BackgroundImage01: AssetDefinition = new AssetDefinition("background-image-1", "../assets/sprites/bg1.png"); 
            static Planet: AssetDefinition = new AssetDefinition("planet-1", "../assets/sprites/Blue-Planet-psd85316.png"); 
            static Meteor01: AssetDefinition = new AssetDefinition("meteor-01", "../assets/sprites/meteor-01.png"); 
        }
    }
}