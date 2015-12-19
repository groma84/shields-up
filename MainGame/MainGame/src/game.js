var initialRunner = function () {
    game.setup();
};

if (window.attachEvent) {
    window.attachEvent('onload', initialRunner);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function (evt) {
            curronload(evt);
            initialRunner(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = initialRunner;
    }
}
