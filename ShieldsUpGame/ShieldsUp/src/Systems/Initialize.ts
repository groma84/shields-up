/// <reference path="Manager.ts" />
/// <reference path="UpdateSystem.ts" />
/// <reference path="RenderSystem.ts" />

module Game {
    export module Systems {
        export class Initialize {
            static All() {
                var options = new Game.Systems.RenderOptions(800, 450);
                var renderSystem = new Game.Systems.Render(options);
                
                
                            
                Game.Systems.Manager.UpdateSystems = [];

                Game.Systems.Manager.RenderSystems = [
                    renderSystem
                ];
            }
        }
    }
}