define(["require", "exports", "states/Boot"], function (require, exports, Boot) {
    "use strict";
    var PhaserGameApp = (function () {
        function PhaserGameApp() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: this.init, create: this.create });
        }
        PhaserGameApp.prototype.init = function () {
        };
        PhaserGameApp.prototype.create = function () {
            this.game.state.add('Boot', Boot);
            this.game.state.start('Boot');
            this.game.state.add('Boot', Boot);
            this.game.state.add('Preload', Preloader);
            this.game.state.add('Title', Title);
            this.game.state.add('Game', Game);
        };
        return PhaserGameApp;
    }());
    return PhaserGameApp;
});
