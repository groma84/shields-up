/// <reference path="../../lib/pixi.js.d.ts" />
/// <reference path="../Utils/Vector2.ts" />

module Game {
    export module UI {
        export class Text {
            private _text: string;
            get Text(): string {
                return this._text;
            }
            set Text(text: string) {
                this._text = text;
                this._dirty = true;
            }

            private _fontSize: number;
            get FontSize(): number {
                return this._fontSize;
            }
            set FontSize(fontSize: number) {
                this._fontSize = fontSize;
                this._dirty = true;
            }

            private _position: Utils.Vector2;
            get Position(): Utils.Vector2 {
                return this._position;
            }
            set Position(position: Utils.Vector2) {
                this._position = position;
                this._dirty = true;
            }

            private _dirty: Boolean = false;
            get Dirty(): Boolean {
                return this._dirty;
            }

            private _stage: PIXI.Container;
            private _renderObject: PIXI.Text;
            private _baseStyle = {
                font: 'px Arial', fill: 0xfffb00, align: 'center'
            };

            constructor(text: string, fontSize: number, position: Utils.Vector2) {
                this._stage = Game.Systems.Manager.ActiveRenderSystem.GetMenuContainer();

                this._text = text;
                this._fontSize = fontSize;
                this._position = position;

                this._renderObject = new PIXI.Text(text, {
                    font: fontSize + this._baseStyle.font,
                    fill: this._baseStyle.fill,
                    align: this._baseStyle.align
                });
                this._renderObject.anchor = new PIXI.Point(0.5, 0.5);
                this._renderObject.position = new PIXI.Point(this._position.X, this._position.Y);

                this._stage.addChild(this._renderObject);
            }

            Remove() {
                this._renderObject.destroy();
            }

            Update(dt: number) {
                if (this._dirty) {
                    this._renderObject.text = this._text;
                    this._renderObject.style = {
                        font: this._fontSize + this._baseStyle.font,
                        fill: this._baseStyle.fill,
                        align: this._baseStyle.align
                    };
                    this._renderObject.position.x = this._position.X;
                    this._renderObject.position.y = this._position.Y;
                }
            }

            OnWindowSizeChanged(oldScalingFactor: number, newScalingFactor: number) {
            }
        }
    }
}
