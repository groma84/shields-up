/// <reference path="../lib/pixi.js.d.ts" />
/// <reference path="Utils/Vector2.ts" />
/// <reference path="FiniteStateMachine/Fsm.ts" />
/// <reference path="ECS/Manager.ts" />
/// <reference path="Assets/Sprites.ts" />
/// <reference path="Assets/Definitions.ts" />
/// <reference path="Input/KeyboardInputHandler.ts" />
/// <reference path="Input/DefaultKeyboardInputMap.ts" />
/// <reference path="Components/Component.ts" />
/// <reference path="Components/Render.ts" />
/// <reference path="Components/RigidBody.ts" />
/// <reference path="Components/Player.ts" />
/// <reference path="Components/Collide.ts" />
/// <reference path="Components/Health.ts" />
/// <reference path="ScreenSettings.ts" />

module Game {
    export class Setup {
        private _fsm: Game.FiniteStateMachine.Fsm;
        private _keyboardInputHandler: Game.Input.KeyboardInputHandler;

        private createBackgroundComponents(): Components.Component[] {
            var rigidBody = new Game.Components.RigidBody(ScreenSettings.Width / 2, ScreenSettings.Height / 2, ScreenSettings.Width, ScreenSettings.Height),
                render = new Game.Components.Render(Game.Assets.Definitions.BackgroundImage01, new PIXI.Point(ScreenSettings.Width / Game.Assets.Definitions.BackgroundImage01.ImageSize.X, ScreenSettings.Height / Game.Assets.Definitions.BackgroundImage01.ImageSize.Y));

            // TODO später: Background-Musik
        
            return [rigidBody, render];
        }

        private createPlanet(): Components.Component[] {
            var position = new Utils.Vector2(ScreenSettings.Width / 2, ScreenSettings.Height / 2), // genau in der Mitte
                size = new Utils.Vector2(ScreenSettings.Width / 6, ScreenSettings.Width / 6),
                rigidBody = new Game.Components.RigidBody(position.X, position.Y, size.X, size.Y),
                collide = new Game.Components.Collide(position.X, position.Y, size.X * 0.8, size.Y * 0.8), // ein bisschen kleinere Hitbox als Grafik
                render = new Game.Components.Render(Game.Assets.Definitions.Planet, new PIXI.Point(size.X / Game.Assets.Definitions.Planet.ImageSize.X, size.Y / Game.Assets.Definitions.Planet.ImageSize.Y)),
                health = new Game.Components.Health(1),
                player = new Game.Components.Player();

            return [rigidBody, render, player, collide, health];
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
            this._keyboardInputHandler = new Game.Input.KeyboardInputHandler(new Game.Input.DefaultKeyboardInputMap());

            Game.ScreenSettings.Calculate();
            
            // Hintergrundbild mit Musik einfügen
            // TODO: Components body (mit position und size), render (mit Grafik und Skalierung), sound (mit Audio-File, Volume und Loop), movement (mit velocity und direction)
            // TODO: Systems (Rendering, Audio, Physics)
            Game.ECS.Manager.AddEntity(this.createBackgroundComponents());
            Game.ECS.Manager.AddEntity(this.createPlanet());

            this.preloadImages();
        }
    };
}
