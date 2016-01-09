/// <reference path="Setup.ts" />

// Add IE-specific interfaces to Window
interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}

module Game {
}

(function () {
    var initialRunner = function () {
        new Game.Setup().Initialize();
    };

    if (window.attachEvent) {
        window.attachEvent('onload', initialRunner);
        window.attachEvent('onresize', function () {
            Game.ScreenSettings.Recalculate()
        });
    }
    else {
        if (window.onload) {
            var curronload = window.onload;
            var newonload = function (evt) {
                curronload(evt);
                initialRunner();
            };
            window.onload = newonload;
        } else {
            window.onload = initialRunner;
        }

        window.onresize = function (event) {
            Game.ScreenSettings.Recalculate();
        };
    }
})();