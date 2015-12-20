/// <reference path="../components/Component.ts" />

module Game {
    export module ECS {
        export class Entity {
            Components: Components.Component[];
            Mask: number;

            constructor(components: Components.Component[], mask: number) {
                this.Components = components;
                this.Mask = mask;
            }
        }
    }
}