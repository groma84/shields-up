module Game {
    export module Components {
        export abstract class Component {
            Mask: number;

            constructor(type: Type) {
                this.Mask = type;
            }
        }
    }
}