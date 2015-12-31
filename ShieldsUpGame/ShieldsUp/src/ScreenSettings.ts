module Game {
    export class ScreenSettings {
        static DisplayRatio: number;
        static Width: number;
        static Height: number;

        private static _minWidth: number = 640;
        private static _minHeight: number = 360;
        private static _maxWidth: number = 1280;
        private static _maxHeight: number = 720;

        static Calculate() {
            ScreenSettings.Width = Math.min(ScreenSettings._maxWidth, Math.max(window.innerWidth, ScreenSettings._minWidth));
            ScreenSettings.Height = Math.min(ScreenSettings._maxHeight, Math.max(window.innerHeight, ScreenSettings._minHeight));
            ScreenSettings.DisplayRatio = Math.min(ScreenSettings.Width / ScreenSettings._maxWidth, ScreenSettings.Height / ScreenSettings._maxHeight);
        }
    }
}