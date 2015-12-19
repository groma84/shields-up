game.gameloop = {
    run: function (options) {
        var now,
            dt = 0,
            last = timestamp(),
            slow = options.slow || 1, // slow motion scaling factor
            step = 1 / (options.fps || 60),
            slowStep = slow * step,
            update = options.update,
            render = options.render;
        //fpsmeter = new FPSMeter(options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '5px' });

        function timestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }

        function frame() {
            //    fpsmeter.tickStart();
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);
            while (dt > slowStep) {
                dt = dt - slowStep;
                update(step);
            }
            render(dt / slow);
            last = now;
            //fpsmeter.tick();
            requestAnimationFrame(frame);
            //requestAnimationFrame(frame, options.canvas);
        }

        requestAnimationFrame(frame);
    }
}

var initialRunner = function () {
    game.renderer.setup({
        xSize: 960,
        ySize: 450,
        backgroundColor: '0x000000'
    });

    game.gameloop.run({
        fps: 30,
        update: function (step) {
            //console.debug("update: " + step)
        },
        render: function (dt) {
            //console.debug("render: " + dt)
            game.renderer.animate(dt);
        },
    });
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

