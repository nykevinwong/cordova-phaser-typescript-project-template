var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "utils/Utils"], function (require, exports, Utils) {
    "use strict";
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.init = function () {
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
            this.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = false;
            var screenDims = Utils.ScreenUtils.screenMetrics;
            if (this.game.device.desktop) {
                console.log("DESKTOP");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {
                console.log("MOBILE");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.forceOrientation(true, false);
            }
            console.log(screenDims);
        };
        Boot.prototype.preload = function () {
            var gfxProgressbarPath = 'assets/gfx/progressbar/';
            this.game.load.image('preloaderBackground', gfxProgressbarPath + 'progress_bar_fg.png');
            this.load.image('preloaderBar', gfxProgressbarPath + 'progress_bar_bg.png');
            this.load.image('preloaderText', gfxProgressbarPath + 'loading.png');
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = '#ffffff';
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
