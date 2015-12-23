/// <reference path="Type.ts" />
/// <reference path="Component.ts" />

module Game {
    export module Components {
        export class Player extends Component {
        
            constructor() {
                super();
                
                this.Mask = Game.Components.Type.Player;
            }
        }
    }
}
