/// <reference path="./definitions/phaser.d.ts" />
import Boot = require("states/Boot");
import Preloader = require("states/Preloader");

class PhaserGameApp  {
    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: this.init, create: this.create });

    }

    init() {
   //     this.game.stage.backgroundColor = '#0000ff';
    }

    create() {
        this.game.state.add('Boot', Boot);
        this.game.state.add('Preload', Preloader);
     //   this.game.state.add('Title', Title);
      //  this.game.state.add('Game', Game);

        this.game.state.start('Boot');

    }

}

export = PhaserGameApp;