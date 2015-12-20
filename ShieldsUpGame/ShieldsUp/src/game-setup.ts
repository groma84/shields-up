/// <reference path="components/Render.ts" />
/// <reference path="components/RigidBody.ts" />

module Game {
    export class Setup {
        private createBackgroundComponents() {
            var rigidBody = new Game.Components.RigidBody(400, 225, 800, 450),
                render = new Game.Components.Render(game.rendered.assets.bg1, 0.5);

            // TODO später: Background-Musik
        
            return [rigidBody, render];
        }

        private startGame() {
        }

        private preloadImages() {
        }

        initialize() {
            // Hintergrundbild mit Musik einfügen
            // TODO: Components body (mit position und size), render (mit Grafik und Skalierung), sound (mit Audio-File, Volume und Loop), movement (mit velocity und direction)
            // TODO: Systems (Rendering, Audio, Physics)

            game.ecs.addEntity(this.createBackgroundComponents());
            game.fsm.firstStart();
        }
    };
}
