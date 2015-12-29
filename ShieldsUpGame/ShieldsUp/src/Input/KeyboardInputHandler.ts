/// <reference path="DefaultKeyboardInputMap.ts" />
/// <reference path="KeyboardInputMapping.ts" />
/// <reference path="Inputs.ts" />

module Game {
    export module Input {
        export class KeyboardInputHandler {
            private _listener: any;

            static ActiveInput: Inputs;

            constructor(inputMap: DefaultKeyboardInputMap) {
                this._listener = new (<any>window).keypress.Listener();

                inputMap.InputMappings.forEach((mapping) => {
                    this._listener.register_combo({
                        "keys": mapping.Key,
                        "on_keydown": () => KeyboardInputHandler.ActiveInput = mapping.Input,
                        "on_keyup": () => KeyboardInputHandler.ActiveInput = undefined
                    });
                })
            }
        }
    }
}