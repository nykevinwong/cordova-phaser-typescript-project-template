define(["require", "exports"], function (require, exports) {
    "use strict";
    var SwipeProcessor = (function () {
        function SwipeProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
            this.game.kineticScrolling.configure({
                kineticMovement: false,
                timeConstantScroll: 325,
                horizontalScroll: true,
                verticalScroll: true,
                horizontalWheel: false,
                verticalWheel: false,
                deltaWheel: 40
            });
            this.game.kineticScrolling.start();
        }
        SwipeProcessor.prototype.update = function (deltaTime) {
        };
        return SwipeProcessor;
    }());
    return SwipeProcessor;
});
