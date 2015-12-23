/// <reference path="GameloopOptions.ts" />

module Game {
    export class Gameloop {
        Run(options: GameloopOptions) {
            var now,
                dt = 0,
                last = timestamp(),
                slow = options.SlowFactor, // slow motion scaling factor
                step = 1 / (options.Fps),
                slowStep = slow * step,
                update = options.UpdateMethod,
                render = options.RenderMethod;

            //fpsmeter = new FPSMeter(options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '5px' });

            function timestamp() {
                return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
            }

            function frame() {
                //    fpsmeter.tickStart();
                now = timestamp();
                dt = dt + Math.min(1, (now - last) / 1000);

                while (dt > slowStep) {
                    dt = dt - slowStep;
                    update(step, Game.ECS.Manager.DefinedEntities);
                }

                render(dt / slow, Game.ECS.Manager.DefinedEntities);
                last = now;

                //fpsmeter.tick();

                requestAnimationFrame(frame);
                //requestAnimationFrame(frame, options.canvas);
            }

            requestAnimationFrame(frame);
        }
    }
}
