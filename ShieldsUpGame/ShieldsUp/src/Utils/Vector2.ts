module Game {
    export module Utils {
        export class Vector2 {
            X: number;
            Y: number;
            Betrag: number;

            constructor(x: number, y: number) {
                this.X = x;
                this.Y = y;

                this.Betrag = Math.sqrt(x * x + y * y);
            }

            GetNormalized(): Vector2 {
                return new Vector2(this.X / this.Betrag, this.Y / this.Betrag);
            }
        }
    }
}