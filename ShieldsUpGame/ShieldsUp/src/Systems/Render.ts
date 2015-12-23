﻿/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="RenderOptions.ts" />
/// <reference path="../ECS/Entity.ts" />

module Game {
    export module Systems {
        export class Render implements RenderSystem {
            private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
            private _stage: PIXI.Container;

            private _knownEntityIdsOld: number[];
            private _renderedObjects: PIXI.DisplayObject[];

            constructor(options: RenderOptions) {
                this._renderer = PIXI.autoDetectRenderer(options.XSize, options.YSize);
                this._stage = new PIXI.Container();

                this._knownEntityIdsOld = [];
                this._renderedObjects = [];

                document.body.appendChild(this._renderer.view);
            }

            Run(dt: number, entities: ECS.Entity[]) {
                // TODO: Komponenten suchen an den Entities, und ggf. zur Stage hinzufügen
                var knownEntityIds: number[] = [];
                var renderComponents: Components.Render[] = [];
                var rigidBodyComponents: Components.RigidBody[] = [];


                entities.forEach((entity) => {
                    if (entity && (entity.Mask & (Game.Components.Type.Render | Game.Components.Type.RigidBody))) {
                        knownEntityIds.push(entity.Id);
                        renderComponents[entity.Id] = <Components.Render>(entity.Components.filter((component) => (component.Mask & Game.Components.Type.Render) > 0)[0]); // wir brauchen immer nur die erste, gibt ja eh nur eine.
                        rigidBodyComponents[entity.Id] = <Components.RigidBody>(entity.Components.filter((component) => (component.Mask & Game.Components.Type.RigidBody) > 0)[0]); // wir brauchen immer nur die erste, gibt ja eh nur eine.
                    }
                });

                var inNewButNotOld = knownEntityIds.filter((entityId) => this._knownEntityIdsOld.indexOf(entityId) === -1);
                var inOldButNotNew = this._knownEntityIdsOld.filter((entityId) => knownEntityIds.indexOf(entityId) === -1);

                // alte entfernen
                inOldButNotNew.forEach(entityId => {
                    this._stage.removeChild(this._renderedObjects[entityId]);
                    delete this._renderedObjects[entityId];
                });

                // neue hinzufügen
                inNewButNotOld.forEach(entityId => {
                    var sprite = new PIXI.Sprite(Game.Assets.Sprites.LoadedTextures[renderComponents[entityId].Id].texture);
                    sprite.anchor = new PIXI.Point(0.5, 0.5);

                    this._stage.addChild(sprite);
                    this._renderedObjects[entityId] = sprite;
                });

                for (var i = 0; i < this._renderedObjects.length; ++i) {
                    if (this._renderedObjects[i]) {
                        this._renderedObjects[i].scale = renderComponents[i].Scale;
                        this._renderedObjects[i].x = rigidBodyComponents[i].X;
                        this._renderedObjects[i].y = rigidBodyComponents[i].Y;
                    }
                }

                this._knownEntityIdsOld = knownEntityIds;
                this._renderer.render(this._stage);
            }
        }
    }
}