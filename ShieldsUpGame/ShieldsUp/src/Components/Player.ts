/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Player extends Component {
            Score: number;

            constructor() {
                super(Game.Components.Type.Player);

                this.Score = 0;
            }

            OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number) {
            }
        }
    }
}
