/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Health extends Component {
            Health: number;

            constructor(startHealth: number) {
                super(Game.Components.Type.Health);

                this.Health = startHealth;
            }
        }
    }
}
