game.setup = function () {
    console.debug("game.setup");

    // Hintergrundbild mit Musik einfügen
    // TODO: Components body (mit position und size), render (mit Grafik und Skalierung), sound (mit Audio-File, Volume und Loop), movement (mit velocity und direction)
    // TODO: Systems (Rendering, Audio)
    //game.ecs.addEntity();

    game.fsm.firstStart();
};