/// <reference path="Text.ts" />

module Game {
    export module UI {
        export class Items {
            static PlayerScore: Text;

            static UpdateAll(dt: number) {
                Items.PlayerScore.Update(dt);
            }
        }
    }
}