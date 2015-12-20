/// <reference path="Entity.ts" />
/// <reference path="../Components/Component.ts" />

module Game {
    export module ECS {
        export class Manager {
            static Entities: Entity[];

            constructor() {
                if (Manager.Entities === null) {
                    Manager.Entities = Array.apply(null, Array(255)).map(function () { return null; });
                }
            }

            AddEntity(initialComponents: Components.Component[]): number {
                var firstEmptyEntryIndex: number = Manager.Entities.indexOf(null);
                Manager.Entities[firstEmptyEntryIndex] = new Entity(initialComponents, this.GetMaskFromComponents(initialComponents));

                return firstEmptyEntryIndex;
            }

            RemoveEntity(entityId: number): void {
                Manager.Entities[entityId] = null;
            }

            AddComponent(entityId: number, component: Components.Component): void {
                Manager.Entities[entityId].Components.push(component);
                Manager.Entities[entityId].Mask = Manager.Entities[entityId].Mask | component.Mask;
            }

            RemoveComponent(entityId: number, component: Components.Component): void {
                var index: number = Manager.Entities[entityId].Components.indexOf(component);

                if (index > -1) {
                    Manager.Entities[entityId].Components.splice(index, 1);
                    Manager.Entities[entityId].Mask = Manager.Entities[entityId].Mask ^ component.Mask;
                }
            }

            private GetMaskFromComponents(components: Components.Component[]): number {
                var finalMask = 0x0,
                    i;

                for (i = 0; i < components.length; ++i) {
                    finalMask = finalMask | components[i].Mask;
                }

                return finalMask;
            }
        }
    }
}
