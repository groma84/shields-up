game.fsm = StateMachine.create({
    //initial: 'game',
    events: [
      { name: 'play', from: 'menu', to: 'game' },
   //   { name: 'pause', from: 'game', to: 'pause' },
   //   { name: 'resume', from: 'pause', to: 'game' },
      { name: 'abandon', from: 'game', to: 'menu' }
    ],
    callbacks: {
        ongame: function (event, from, to, msg) {
            console.debug("ongame");
        },
        onmenu: function (event, from, to, msg) {
            console.debug("onmenu");
        },
    }
});