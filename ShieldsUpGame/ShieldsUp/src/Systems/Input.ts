/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Input/KeyboardInputHandler.ts" />
/// <reference path="../Input/Inputs.ts" />
/// <reference path="ShieldFactory.ts" />

module Game {
    export module Systems {
        export class Input implements UpdateSystem {
            constructor() {
            }

            Run(step: number, entities: ECS.Entity[]) {
                if (Game.Input.KeyboardInputHandler.ActiveInput !== undefined) {
                    var spawnLocation: number = -1;
                    switch (Game.Input.KeyboardInputHandler.ActiveInput) {
                        case Game.Input.Inputs.ShieldLeftTop:
                            spawnLocation = Game.Input.Inputs.ShieldLeftTop;
                            break;

                        case Game.Input.Inputs.ShieldLeftMiddle:
                            spawnLocation = Game.Input.Inputs.ShieldLeftMiddle;
                            break;

                        case Game.Input.Inputs.ShieldLeftBottom:
                            spawnLocation = Game.Input.Inputs.ShieldLeftBottom;
                            break;

                        case Game.Input.Inputs.ShieldRightTop:
                            spawnLocation = Game.Input.Inputs.ShieldRightTop;
                            break;

                        case Game.Input.Inputs.ShieldRightMiddle:
                            spawnLocation = Game.Input.Inputs.ShieldRightMiddle;
                            break;

                        case Game.Input.Inputs.ShieldRightBottom:
                            spawnLocation = Game.Input.Inputs.ShieldRightBottom;
                            break;
                    }

                    // Trigger new Shield-Spawn in Shield-Factory
                    Systems.ShieldFactory.MakeNewShield(spawnLocation);
                }
            }
        }
    }
}