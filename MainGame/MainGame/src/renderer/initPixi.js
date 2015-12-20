game.renderer = {
    setup: function (options) {
        game.renderer.renderer = new PIXI.autoDetectRenderer(options.xSize, options.ySize, { backgroundColor: options.backgroundColor });

        document.body.appendChild(game.renderer.renderer.view);

        game.renderer.stage = new PIXI.Container();
    },

    loadAssets: function (callback) {
        var i = 0,
            assets = game.rendered.assetDefinitions,
            loader = PIXI.loader;

        for (i = 0; i < assets.length; ++i) {
            loader.add(assets[i].id, assets[i].url);

            // TODO: wir benötigen irgendwie eine Liste der Ids, um in den Components nicht mit den Strings zu arbeiten - vielleicht geht das ja schon so
            game.renderer.assets[assets[i].id] = assets[i].id;
        }

        loader.once('complete', callback);
        loader.load();
    }
};

