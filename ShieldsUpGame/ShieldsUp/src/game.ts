// Add IE-specific interfaces to Window
interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}

module Game {
}

(function () {
    var initialRunner = function () {
        new Game.Setup().initialize();
    };

    if (window.attachEvent) {
        window.attachEvent('onload', initialRunner);
    } else {
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
    }
})();