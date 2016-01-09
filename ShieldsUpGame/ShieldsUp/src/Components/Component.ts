module Game {
    export module Components {
        export abstract class Component {
            Mask: number;
            abstract OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number): void;

            constructor(type: Type) {
                this.Mask = type;
            }
        }
    }
}