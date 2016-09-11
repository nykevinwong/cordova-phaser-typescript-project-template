/// <reference path="../definitions/phaser.d.ts" />

class PreLoader extends Phaser.State {

    private background: Phaser.Sprite;
    private preloadBar: Phaser.Sprite;
    private loadingText: Phaser.Sprite;

    constructor() {
        super();
    }


   preload () {
            var w = this.game.cache.getImage("preloaderText").width;
            var h = this.game.cache.getImage("preloaderText").height;

            var w1 = this.game.cache.getImage("preloaderBackground").width;
            var w2 = this.game.cache.getImage("preloaderBar").width;

            this.background = this.add.sprite(this.world.centerX - w1/2, this.world.centerY + 100, 'preloaderBackground');
            this.preloadBar = this.add.sprite(this.world.centerX - w2/2, this.world.centerY + 100, 'preloaderBar');
            this.loadingText = this.add.sprite(this.world.centerX - w/2, this.world.centerY - h/2, 'preloaderText');

            this.load.setPreloadSprite(this.preloadBar);


             // load all resources here
            this.game.load.image('gameTitle', 'assets/gfx/title/gametitle.png');


   }
 
   create() {
  // Animate away.
            this.add.tween(this.background)
                .to({alpha: 0}, 800, Phaser.Easing.Linear.None, true);
            this.add.tween(this.loadingText)
                .to({alpha: 0}, 800, Phaser.Easing.Linear.None, true);
            this.add.tween(this.preloadBar)
                .to({alpha: 0}, 800, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.startGame, this);
   }

   startGame() {
           this.game.state.start('Title');
   }
}
 
export = PreLoader;