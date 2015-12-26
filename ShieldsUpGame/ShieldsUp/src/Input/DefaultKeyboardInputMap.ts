/// <reference path="KeyboardInputMapping.ts" />
/// <reference path="Inputs.ts" />

module Game {
    export module Input {
        export class DefaultKeyboardInputMap {
            InputMappings: KeyboardInputMapping[];

            constructor() {
                this.InputMappings = [
                    //new KeyboardInputMapping("w", Inputs.ShieldLeftTop),
                    new KeyboardInputMapping("s", Inputs.ShieldLeftMiddle),
                    new KeyboardInputMapping("x", Inputs.ShieldLeftBottom),
                    new KeyboardInputMapping("i", Inputs.ShieldRightTop),
                    new KeyboardInputMapping("j", Inputs.ShieldRightMiddle),
                    new KeyboardInputMapping("n", Inputs.ShieldRightBottom),
                ];
            }
        }
    }
}