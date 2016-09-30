define(["require", "exports"], function (require, exports) {
    "use strict";
    var GlobalConstants = (function () {
        function GlobalConstants() {
            this.DEBUG = false;
            this.game = {
                GAMES_TO_WIN: 2,
                NUMBER_OF_MAPS: 5,
                DURATION: 30000,
            };
            this.inputs = {
                JUMP: 'jump',
                LEFT: 'left',
                DOWN: 'down',
                RIGHT: 'right',
                ACTION1: 'action1',
                ACTION2: 'action2'
            };
            this.gamepad = {
                STICK_UP: 'stickup',
                STICK_RIGHT: 'stickright',
                STICK_DOWN: 'stickdown',
                STICK_LEFT: 'stickleft',
                BUTTON_X: 'button_x',
                BUTTON_Y: 'button_y',
                BUTTON_A: 'button_a'
            };
        }
        return GlobalConstants;
    }());
    var Constants = new GlobalConstants();
    return Constants;
});
