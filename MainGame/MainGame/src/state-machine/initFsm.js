game.fsm = StateMachine.create({
    initial: 'none',
    events: [
      { name: 'firstStart', from: 'none', to: 'game' },
      { name: 'play', from: 'menu', to: 'game' },
   //   { name: 'pause', from: 'game', to: 'pause' },
   //   { name: 'resume', from: 'pause', to: 'game' },
      { name: 'abandon', from: 'game', to: 'menu' }
    ],
    callbacks: {
        ongame: function (event, from, to, msg) {
            console.debug("ongame");

            game.renderer.setup({
                xSize: 800,
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

        },

        onmenu: function (event, from, to, msg) {
            console.debug("onmenu");
        },
    }
});