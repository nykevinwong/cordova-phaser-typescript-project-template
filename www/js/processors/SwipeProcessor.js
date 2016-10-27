define(["require", "exports", "utils/Swipe"], function (require, exports, Swipe) {
    "use strict";
    var SwipeProcessor = (function () {
        function SwipeProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.swipe = new Swipe(this.game);
        }
        SwipeProcessor.prototype.update = function (deltaTime) {
            var direction = this.swipe.check();
            var speed = 4000 * (1 / deltaTime);
            if (direction !== null) {
                switch (direction.direction) {
                    case this.swipe.DIRECTION_LEFT:
                        this.game.camera.x += speed;
                        break;
                    case this.swipe.DIRECTION_RIGHT:
                        this.game.camera.x -= speed;
                        break;
                    case this.swipe.DIRECTION_UP:
                        this.game.camera.y += speed;
                        break;
                    case this.swipe.DIRECTION_DOWN:
                        this.game.camera.y -= speed;
                        break;
                }
            }
        };
        return SwipeProcessor;
    }());
    return SwipeProcessor;
});
