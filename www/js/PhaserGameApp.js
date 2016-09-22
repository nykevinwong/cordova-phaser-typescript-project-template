define(["require", "exports", "states/Boot", "states/PreLoader", "states/Title", "utils/Utils"], function (require, exports, Boot, PreLoader, Title, Utils) {
    "use strict";
    var PhaserGameApp = (function () {
        function PhaserGameApp() {
            var screenDims = Utils.ScreenUtils.calculateScreenMetrics(800, 500, Utils.Orientation.LANDSCAPE);
            this.game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'content', { init: this.init, create: this.create });
        }
        PhaserGameApp.prototype.init = function () {
        };
        PhaserGameApp.prototype.create = function () {
            this.game.state.add('Boot', Boot);
            this.game.state.add('Preload', PreLoader);
            this.game.state.add('Title', Title);
            this.game.state.start('Boot');
        };
        return PhaserGameApp;
    }());
    return PhaserGameApp;
});
