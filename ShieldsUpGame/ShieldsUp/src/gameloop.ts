module Game {
    export class Gameloop {
        Run(options) {
            var now,
                dt = 0,
                last = timestamp(),
                slow = options.slow || 1, // slow motion scaling factor
                step = 1 / (options.fps || 60),
                slowStep = slow * step,
                update = options.update,
                render = options.render;
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
                    update(step);
                }
                render(dt / slow);
                last = now;
                //fpsmeter.tick();
                requestAnimationFrame(frame);
                //requestAnimationFrame(frame, options.canvas);
            }

            requestAnimationFrame(frame);
        }
    }
}
