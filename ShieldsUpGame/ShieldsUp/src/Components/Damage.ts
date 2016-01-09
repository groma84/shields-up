/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Damage extends Component {
            DamagePerHit: number;

            constructor(damagePerHit: number) {
                super(Game.Components.Type.Damage);

                this.DamagePerHit = damagePerHit;
            }

            OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number) {
            }
        }
    }
}
