module Game {
    export class ScreenSettings {
        static ScalingFactor: number;
        static Width: number;
        static Height: number;

        private static _minWidth: number = 640;
        private static _minHeight: number = 360;
        private static _maxWidth: number = 1280;
        private static _maxHeight: number = 720;

        static Calculate() {
            var aspectRatio = ScreenSettings._maxWidth / ScreenSettings._maxHeight;
            ScreenSettings.Width = Math.min(ScreenSettings._maxWidth, Math.max(window.innerWidth, ScreenSettings._minWidth));
            ScreenSettings.Height = Math.min(ScreenSettings._maxHeight, Math.max(window.innerHeight, ScreenSettings._minHeight));
            ScreenSettings.ScalingFactor = Math.min(ScreenSettings.Width / ScreenSettings._maxWidth, ScreenSettings.Height / ScreenSettings._maxHeight);

            if (ScreenSettings.Width / ScreenSettings.Height > aspectRatio) {
                ScreenSettings.Width = ScreenSettings.Height * aspectRatio;
            }
            else if (ScreenSettings.Width / ScreenSettings.Height < aspectRatio) {
                ScreenSettings.Height = ScreenSettings.Width / aspectRatio;
            }
        }

        static Recalculate() {
            var oldFactor = ScreenSettings.ScalingFactor;

            ScreenSettings.Calculate();

            ECS.Manager.DefinedEntities.forEach(entity => {
                entity.Components.forEach(component => {
                    if (component.OnWindowSizeChanged) {
                        component.OnWindowSizeChanged(oldFactor, ScreenSettings.ScalingFactor);
                    }
                });
            });

            var newOptions = new Systems.RenderOptions(ScreenSettings.Width, ScreenSettings.Height, ScreenSettings.ScalingFactor);
            Game.Systems.Manager.RenderSystems.forEach(renderSystem => {
                if (renderSystem.Resize) {
                    renderSystem.Resize(newOptions);
                }
            });
        }
    }
}