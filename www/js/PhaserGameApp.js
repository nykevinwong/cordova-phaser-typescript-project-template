define(["require", "exports", "states/Boot", "states/Preloader", "states/Title"], function (require, exports, Boot, Preloader, Title) {
    "use strict";
    var PhaserGameApp = (function () {
        function PhaserGameApp() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: this.init, create: this.create });
        }
        PhaserGameApp.prototype.init = function () {
        };
        PhaserGameApp.prototype.create = function () {
            this.game.state.add('Boot', Boot);
            this.game.state.add('Preload', Preloader);
            this.game.state.add('Title', Title);
            this.game.state.start('Boot');
        };
        return PhaserGameApp;
    }());
    return PhaserGameApp;
});
