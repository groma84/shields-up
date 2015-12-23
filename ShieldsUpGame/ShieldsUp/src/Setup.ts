/// <reference path="FiniteStateMachine/Fsm.ts" />
/// <reference path="ECS/Manager.ts" />
/// <reference path="Assets/Sprites.ts" />
/// <reference path="Components/Component.ts" />
/// <reference path="Components/Render.ts" />
/// <reference path="Components/RigidBody.ts" />

module Game {
    export class Setup {
        private _fsm: Game.FiniteStateMachine.Fsm;

        private createBackgroundComponents(): Components.Component[] {
            var rigidBody = new Game.Components.RigidBody(400, 225, 800, 450),
                render = new Game.Components.Render(Game.Assets.Definitions.BackgroundImage01, new PIXI.Point(0.5, 0.5));

            // TODO später: Background-Musik
        
            return [rigidBody, render];
        }

        private startGame(loadedResources) {
            Game.Assets.Sprites.LoadedTextures = loadedResources;

            this._fsm.FirstStart();
        }

        private preloadImages() {
            new Game.Assets.Sprites().LoadAssets((loader, loadedResources) => this.startGame(loadedResources));
        }

        Initialize() {
            this._fsm = new Game.FiniteStateMachine.Fsm();

            // Hintergrundbild mit Musik einfügen
            // TODO: Components body (mit position und size), render (mit Grafik und Skalierung), sound (mit Audio-File, Volume und Loop), movement (mit velocity und direction)
            // TODO: Systems (Rendering, Audio, Physics)
            Game.ECS.Manager.AddEntity(this.createBackgroundComponents());

            this.preloadImages();
        }
    };
}
