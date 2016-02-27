/// <reference path="Type.ts" />
/// <reference path="Component.ts" />
/// <reference path="../Messaging/MessageManager.ts" />

module Game {
    export module Components {
        export class GivesPoints extends Component {
            Points: number;

            constructor(points: number) {
                super(Game.Components.Type.GivesPoints);

                this.Points = points;
            }

            OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number) {
            }
        }
    }
}
