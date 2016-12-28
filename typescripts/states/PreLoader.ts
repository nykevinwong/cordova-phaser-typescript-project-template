/// <reference path="../definitions/phaser.d.ts" />
import GlobalEntityManager = require("../GlobalEntityManager")
import InputProcessor = require("processors/InputProcessor");
import Input = require("components/Input");

class PreLoader extends Phaser.State {

    private background: Phaser.Sprite;
    private preloadBar: Phaser.Sprite;
    private loadingText: Phaser.Sprite;

    constructor() {
        super();
    }

    init() {
        GlobalEntityManager.addComponent(Input.name, Input);
        GlobalEntityManager.addProcessor(new InputProcessor(this.game));
    }

    preload() {
        var w = this.game.cache.getImage("preloaderText").width;
        var h = this.game.cache.getImage("preloaderText").height;

        var w1 = this.game.cache.getImage("preloaderBackground").width;
        var w2 = this.game.cache.getImage("preloaderBar").width;

        this.background = this.add.sprite(this.world.centerX - w1 / 2, this.world.centerY + 100, 'preloaderBackground');
        this.preloadBar = this.add.sprite(this.world.centerX - w2 / 2, this.world.centerY + 100, 'preloaderBar');
        this.loadingText = this.add.sprite(this.world.centerX - w / 2, this.world.centerY - h / 2, 'preloaderText');

        this.load.setPreloadSprite(this.preloadBar);

        // load all resources here
        this.game.load.image('gameTitle', 'assets/gfx/title/gametitle.png');
        this.game.load.image('start', 'assets/gfx/title/start.png');
        this.game.load.image('continue', 'assets/gfx/title/continue.png');


        //    this.game.load.audio('algorithmicMusic','assets/sounds/algorithmic-music.ogg');

        this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilesGrs2Crtr', 'assets/tilesets/Grs2Crtr.png');
        this.game.load.image('tilesGrs2Watr', 'assets/tilesets/Grs2Watr.png');
        this.game.load.image('tilesGrass', 'assets/tilesets/Grass.png');
        //        var json = this.game.load.json('baseJson', 'assets/buildings/base.json', true);

        this.game.load.spritesheet('base', 'assets/gfx/buildings/base.png', 60, 60);
        this.game.load.spritesheet('starport', 'assets/gfx/buildings/starport.png', 40, 60);
        this.game.load.spritesheet('harvester', 'assets/gfx/buildings/harvester.png', 40, 60);
        this.game.load.spritesheet('ground-turret', 'assets/gfx/buildings/ground-turret.png', 38, 32);


    }

    create() {
        // Animate away.
        this.add.tween(this.background)
            .to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
        this.add.tween(this.loadingText)
            .to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
        this.add.tween(this.preloadBar)
            .to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true)
            .onComplete.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('Title');
    }
}

export = PreLoader;