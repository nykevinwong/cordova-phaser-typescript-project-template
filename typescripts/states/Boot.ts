/// <reference path="../definitions/phaser.d.ts" />
import Utils = require("utils/Utils");

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

            var screenDims = Utils.ScreenUtils.screenMetrics;

            if (this.game.device.desktop) {
                console.log("DESKTOP");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {
                console.log("MOBILE");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.forceOrientation(true, false);
            }

            console.log(screenDims);
    }

   preload () {
            var gfxProgressbarPath = 'assets/gfx/progressbar/';
            this.game.load.image('preloaderBackground', gfxProgressbarPath + 'progress_bar_fg.png');
            this.load.image('preloaderBar', gfxProgressbarPath + 'progress_bar_bg.png');
            this.load.image('preloaderText', gfxProgressbarPath + 'loading.png');
   }
 
   create() {
            this.game.stage.backgroundColor = '#ffffff';
            this.game.stage.smoothed = false; // make it crystal clear pixel
            this.game.state.start('Preload');
   }

   update() {

   }

   render() {

   }
}
 
export = Boot;