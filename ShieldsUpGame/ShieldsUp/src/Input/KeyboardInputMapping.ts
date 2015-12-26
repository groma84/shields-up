/// <reference path="Inputs.ts" />

module Game {
    export module Input {
        export class KeyboardInputMapping {
            Key: string;
            Input: Inputs;

            constructor(key: string, input: Inputs) {
                this.Key = key;
                this.Input = input;
            }
        }
    }
}