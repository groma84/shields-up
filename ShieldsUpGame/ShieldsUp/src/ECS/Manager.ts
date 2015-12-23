/// <reference path="Entity.ts" />
/// <reference path="../Components/Component.ts" />

module Game {
    export module ECS {
        export class Manager {
            static Entities: Entity[];
            static get DefinedEntities(): Entity[] {
                return this.Entities.filter((item) => !!item);
            }

            static AddEntity(initialComponents: Components.Component[]): number {
                if (!Manager.Entities) {
                    Manager.Entities = Array.apply(null, Array(255)).map(function () { return null; });
                }

                var firstEmptyEntryIndex: number = Manager.Entities.indexOf(null);
                Manager.Entities[firstEmptyEntryIndex] = new Entity(firstEmptyEntryIndex, initialComponents, Manager.GetMaskFromComponents(initialComponents));

                return firstEmptyEntryIndex;
            }

            static RemoveEntity(entityId: number): void {
                Manager.Entities[entityId] = null;
            }

            static AddComponent(entityId: number, component: Components.Component): void {
                Manager.Entities[entityId].Components.push(component);
                Manager.Entities[entityId].Mask = Manager.Entities[entityId].Mask | component.Mask;
            }

            static RemoveComponent(entityId: number, component: Components.Component): void {
                var index: number = Manager.Entities[entityId].Components.indexOf(component);

                if (index > -1) {
                    Manager.Entities[entityId].Components.splice(index, 1);
                    Manager.Entities[entityId].Mask = Manager.Entities[entityId].Mask ^ component.Mask;
                }
            }

            private static GetMaskFromComponents(components: Components.Component[]): number {
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
