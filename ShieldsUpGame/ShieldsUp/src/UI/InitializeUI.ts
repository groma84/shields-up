/// <reference path="Text.ts" />

module Game {
    export module UI {
        export class InitializeUI {
            static All() {
                Game.UI.Items.PlayerScore = new Text("0", 36, new Utils.Vector2((ScreenSettings.Width / 2), 30));
            }
        }
    }
}