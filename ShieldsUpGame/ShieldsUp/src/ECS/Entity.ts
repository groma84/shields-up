/// <reference path="../components/Component.ts" />

module Game {
    export module ECS {
        export class Entity {
            Id: number;
            Components: Components.Component[];
            Mask: number;

            constructor(id: number, components: Components.Component[], mask: number) {
                this.Id = id;
                this.Components = components;
                this.Mask = mask;
            }
        }
    }
}