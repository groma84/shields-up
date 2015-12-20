game.setup = function () {
    var createBackgroundComponents = function () {
        var rigidBody = new game.components.RigidBody(400, 225, 800, 450),
            render = new game.components.Render(game.rendered.assets.bg1, 0.5);

        // TODO später: Background-Musik
        
        return [rigidBody, render];
    };


    var startGame = function () {

    };

    var preloadImages = function () {

    };

    console.debug("game.setup");

    // Hintergrundbild mit Musik einfügen
    // TODO: Components body (mit position und size), render (mit Grafik und Skalierung), sound (mit Audio-File, Volume und Loop), movement (mit velocity und direction)
    // TODO: Systems (Rendering, Audio, Physics)

    game.ecs.addEntity(createBackgroundComponents());

    game.fsm.firstStart();
};