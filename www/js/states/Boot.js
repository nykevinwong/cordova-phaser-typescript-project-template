var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
        }
        Boot.prototype.init = function () {
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
            this.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = false;
            if (this.game.device.desktop) {
            }
            else {
            }
        };
        Boot.prototype.preload = function () {
            var gfxProgressbarPath = 'assets/gfx/progressbar/';
            this.game.load.image('preloaderBackground', gfxProgressbarPath + 'progress_bar_fg.png');
            this.load.image('preloaderBar', gfxProgressbarPath + 'progress_bar_bg.png');
            this.load.image('preloaderText', gfxProgressbarPath + 'loading.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preload');
        };
        Boot.prototype.update = function () {
        };
        Boot.prototype.render = function () {
        };
        return Boot;
    }(Phaser.State));
    return Boot;
});
