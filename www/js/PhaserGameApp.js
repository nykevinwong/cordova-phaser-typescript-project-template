define(["require", "exports", "states/Boot", "states/PreLoader", "states/Title", "states/MenuTest", "states/Game", "utils/Utils"], function (require, exports, Boot, PreLoader, Title, MenuTest, Game, Utils) {
    "use strict";
    var PhaserGameApp = (function () {
        function PhaserGameApp(app) {
            var screenDims = Utils.ScreenUtils.calculateScreenMetrics(800, 500, Utils.Orientation.LANDSCAPE);
            this.game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.CANVAS, 'stage', { init: this.init, create: this.create }, false, false);
            this.app = app;
        }
        PhaserGameApp.prototype.init = function () {
        };
        PhaserGameApp.prototype.create = function () {
            this.game.state.add('Boot', Boot);
            this.game.state.add('Preload', PreLoader);
            this.game.state.add('Title', Title);
            this.game.state.add('MenuTest', MenuTest);
            this.game.state.add('Game', Game);
            this.game.state.start('Boot');
        };
        PhaserGameApp.prototype.getApp = function () {
            return;
        };
        return PhaserGameApp;
    }());
    return PhaserGameApp;
});
