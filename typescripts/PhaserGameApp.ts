/// <reference path="./definitions/phaser.d.ts" />
import Boot = require("states/Boot");
import PreLoader = require("states/PreLoader");
import Title = require("states/Title");
import MenuTest = require("states/MenuTest");
import Game = require("states/Game");
import Utils = require("utils/Utils");

class PhaserGameApp  {
    private game: Phaser.Game;
    private app: any;

    constructor(app) {
        var screenDims = Utils.ScreenUtils.calculateScreenMetrics(800, 500,
                Utils.Orientation.LANDSCAPE);
        this.game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'content', { init: this.init, create: this.create });
        this.app = app;

    }

    init() {
   //     this.game.stage.backgroundColor = '#0000ff';
    }

    create() {
        this.game.state.add('Boot', Boot);
        this.game.state.add('Preload', PreLoader);
        this.game.state.add('Title', Title);
        this.game.state.add('MenuTest', MenuTest);
        this.game.state.add('Game', Game);

        this.game.state.start('Boot');
    }

    getApp()
    {
        return 
    }

}

export = PhaserGameApp;