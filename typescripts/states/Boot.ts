/// <reference path="../definitions/phaser.d.ts" />

class Boot extends Phaser.State {

    constructor() {
        super();
    }

    init() {
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

            // //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
            this.input.maxPointers = 1;

            // //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.game.stage.disableVisibilityChange = false;

            if (this.game.device.desktop)
            {
                 //  If you have any desktop specific settings, they can go in here
                 //this.scale.pageAlignHorizontally = true;
            }
            else
            {
                 //  Same goes for mobile settings.
                 //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
                 //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                 //this.scale.minWidth = 480;
                 //this.scale.minHeight = 260;
                 //this.scale.maxWidth = 1024;
                 //this.scale.maxHeight = 768;
                 //this.scale.forceLandscape = true;
                 //this.scale.pageAlignHorizontally = true;
                 //this.scale.setScreenSize(true);
            }
    }

   preload () {
            var gfxProgressbarPath = 'assets/gfx/progressbar/';
            this.game.load.image('preloaderBackground', gfxProgressbarPath + 'progress_bar_fg.png');
            this.load.image('preloaderBar', gfxProgressbarPath + 'progress_bar_bg.png');
            this.load.image('preloaderText', gfxProgressbarPath + 'loading.png');
   }
 
   create() {
            this.game.stage.backgroundColor = '#ffffff'
            this.game.state.start('Preload');
   }

   update() {

   }

   render() {

   }
}
 
export = Boot;