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

            GetComponent<T extends Components.Component>(mask: Components.Type): T {
                return <T>(this.Components.filter((c) => (c.Mask & mask) > 0)[0]); // ev. performantere Lösung finden? z.B. ein "assoziatives Array mit Typ und Component"
            }
        }
    }
}