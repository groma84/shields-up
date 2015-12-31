/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="RenderOptions.ts" />
/// <reference path="../ECS/Entity.ts" />
/// <reference path="../Assets/Sprites.ts" />
/// <reference path="../Components/Type.ts" />
/// <reference path="../Components/Render.ts" />
/// <reference path="../Components/RigidBody.ts" />

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
                var knownEntityIds: number[] = [];
                var renderComponents: Components.Render[] = [];
                var rigidBodyComponents: Components.RigidBody[] = [];

                entities.forEach((entity) => {
                    if (entity && (entity.Mask & (Game.Components.Type.Render || Game.Components.Type.RigidBody))) {
                        knownEntityIds.push(entity.Id);
                        renderComponents[entity.Id] = entity.GetComponent<Components.Render>(Components.Type.Render);
                        rigidBodyComponents[entity.Id] = entity.GetComponent<Components.RigidBody>(Components.Type.RigidBody);
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
                        this._renderedObjects[i].scale = new PIXI.Point(renderComponents[i].Scale.x * ScreenSettings.DisplayRatio, renderComponents[i].Scale.y * ScreenSettings.DisplayRatio);
                        this._renderedObjects[i].x = rigidBodyComponents[i].X * ScreenSettings.DisplayRatio;
                        this._renderedObjects[i].y = rigidBodyComponents[i].Y * ScreenSettings.DisplayRatio;
                    }
                }

                this._knownEntityIdsOld = knownEntityIds;
                this._renderer.render(this._stage);
            }
        }
    }
}