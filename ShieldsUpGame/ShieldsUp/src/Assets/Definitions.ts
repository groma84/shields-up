/// <reference path="AssetDefinition.ts" />
/// <reference path="../Utils/Vector2.ts" />

module Game {
    export module Assets {
        export abstract class Definitions {
            // Neue Sprites auch in Sprites.ts eintragen!
            static BackgroundImage01: AssetDefinition = new AssetDefinition("background-image-1", "../assets/sprites/bg1.png", new Utils.Vector2(1600, 900)); 
            static Planet: AssetDefinition = new AssetDefinition("planet-1", "../assets/sprites/Blue-Planet-psd85316.png", new Utils.Vector2(400, 393)); 
            static Meteor01: AssetDefinition = new AssetDefinition("meteor-01", "../assets/sprites/meteor-01.png", new Utils.Vector2(50, 50)); 
            static Shield01: AssetDefinition = new AssetDefinition("shield-01", "../assets/sprites/shield-01.png", new Utils.Vector2(10, 30)); 
        }
    }
}