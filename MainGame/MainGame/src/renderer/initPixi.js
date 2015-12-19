game.renderer = {
    setup: function(options) {
        game.renderer.renderer = new PIXI.autoDetectRenderer(options.xSize, options.ySize, { backgroundColor: options.backgroundColor });

        document.body.appendChild(game.renderer.renderer.view);

        game.renderer.stage = new PIXI.Container();
    }
};

