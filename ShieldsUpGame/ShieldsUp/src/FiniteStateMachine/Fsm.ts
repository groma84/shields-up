declare var StateMachine;

module Game {
    export module FiniteStateMachine {
        export class Fsm {
            private _stateMachine;

            FirstStart() {
                this._stateMachine.firstStart();
            }

            constructor() {
                this._stateMachine = StateMachine.create({
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

                            Game.Systems.Initialize.All();
                            Game.UI.InitializeUI.All();

                            new Game.Gameloop().Run(new Game.GameloopOptions(Game.Systems.Loops.Update, Game.Systems.Loops.Render, 30));
                        },

                        onmenu: function (event, from, to, msg) {
                            console.debug("onmenu");
                        },
                    }
                });
            }
        }
    }
}