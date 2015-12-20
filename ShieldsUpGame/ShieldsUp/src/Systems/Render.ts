/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="RenderOptions.ts" />


module Game {
    export module Systems {
        export class Render {
            private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
            private _stage;

            constructor(options: RenderOptions) {

                this._renderer = PIXI.autoDetectRenderer(options.XSize, options.YSize);

                game.renderer.renderer = new PIXI.autoDetectRenderer(options.xSize, options.ySize, { backgroundColor: options.backgroundColor });

                document.body.appendChild(game.renderer.renderer.view);

                game.renderer.stage = new PIXI.Container();
            }
        }
    }
}