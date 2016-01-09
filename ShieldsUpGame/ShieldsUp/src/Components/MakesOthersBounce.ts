/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class MakesOthersBounce extends Component {
            AlreadyBouncedEntities: ECS.Entity[];

            constructor() {
                super(Game.Components.Type.MakesOthersBounce);

                this.AlreadyBouncedEntities = [];
            }


            OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number) {
            }
        }
    }
}
