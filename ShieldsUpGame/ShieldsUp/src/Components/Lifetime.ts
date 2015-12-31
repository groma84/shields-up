/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Lifetime extends Component {
            LifetimeInSeconds: number;

            constructor(lifetimeInSeconds: number) {
                super(Game.Components.Type.Lifetime);

                this.LifetimeInSeconds = lifetimeInSeconds;
            }
        }
    }
}
