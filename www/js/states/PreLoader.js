var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../GlobalEntityManager", "processors/InputProcessor", "components/Input"], function (require, exports, GlobalEntityManager, InputProcessor, Input) {
    "use strict";
    var PreLoader = (function (_super) {
        __extends(PreLoader, _super);
        function PreLoader() {
            _super.call(this);
        }
        PreLoader.prototype.init = function () {
            GlobalEntityManager.addComponent(Input.name, Input);
            GlobalEntityManager.addProcessor(new InputProcessor(this.game));
        };
        PreLoader.prototype.preload = function () {
            var w = this.game.cache.getImage("preloaderText").width;
            var h = this.game.cache.getImage("preloaderText").height;
            var w1 = this.game.cache.getImage("preloaderBackground").width;
            var w2 = this.game.cache.getImage("preloaderBar").width;
            this.background = this.add.sprite(this.world.centerX - w1 / 2, this.world.centerY + 100, 'preloaderBackground');
            this.preloadBar = this.add.sprite(this.world.centerX - w2 / 2, this.world.centerY + 100, 'preloaderBar');
            this.loadingText = this.add.sprite(this.world.centerX - w / 2, this.world.centerY - h / 2, 'preloaderText');
            this.load.setPreloadSprite(this.preloadBar);
            this.game.load.image('gameTitle', 'assets/gfx/title/gametitle.png');
            this.game.load.image('start', 'assets/gfx/title/start.png');
            this.game.load.image('continue', 'assets/gfx/title/continue.png');
            this.game.load.audio('algorithmicMusic', 'assets/sounds/algorithmic-music.ogg');
        };
        PreLoader.prototype.create = function () {
            this.add.tween(this.background)
                .to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
            this.add.tween(this.loadingText)
                .to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
            this.add.tween(this.preloadBar)
                .to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.startGame, this);
        };
        PreLoader.prototype.startGame = function () {
            this.game.state.start('Title');
        };
        return PreLoader;
    }(Phaser.State));
    return PreLoader;
});
