import EntityManager = require("components/EntityManager");
import SwipeProcessor = require("processors/SwipeProcessor");
import DragDropProcessor = require("processors/DragDropProcessor");
import RenderingProcessor = require("processors/RenderingProcessor");
import TileMapProcessor = require("processors/TileMapProcessor");
import AnimationProcessor = require("processors/AnimationProcessor");
import Displayable = require("components/Displayable");
import Position = require("components/Position");
import DragDrop = require("components/DragDrop");
import Animation = require("components/Animation");
import AnimationDataSet = require("components/AnimationDataSet");
import BaseAssemblag = require("assemblages/buildings/base")

class Game extends Phaser.State {
    private manager: EntityManager;

    constructor() {
        super();
    }

    preload() {
        this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilesGrs2Crtr', 'assets/tilesets/Grs2Crtr.png');
        this.game.load.image('tilesGrs2Watr', 'assets/tilesets/Grs2Watr.png');
        this.game.load.image('tilesGrass', 'assets/tilesets/Grass.png');
        var baseJson = this.game.load.json('base', 'assets/buildings/json');

        this.game.load.spritesheet('base', 'assets/gfx/buildings/base.png', 60, 60);
    }

    init() {
        this.manager = new EntityManager()

        // set up entity manager with creatable component list.
        var components: EntityManager.Component[] = [Displayable, Position, DragDrop, Animation, AnimationDataSet];
        this.manager.addComponents(components);

        var assemblages = [BaseAssemblag];
        this.manager.addAssemblages(assemblages);

    }

    private base: Phaser.Sprite;

    create() {


        /*
             this.base = this.game.add.sprite(300, 200, 'base');
        
             this.base.inputEnabled = true;
             this.base.input.enableDrag();
        
            //  Enable snapping. For the atari1 sprite it will snap as its dragged around and on release.
            //  The snap is set to every 32x32 pixels.
            var offestX = this.game.camera.x % 20;
            var offestY = this.game.camera.y % 20;
             this.base.input.enableSnap(20, 20, true, true, offestX, offestY);
        
             this.base.events.onDragStart.add(
                 function(sprite, pointer) { 
                 this.swipProcessor.stopKineticScrolling();
                 sprite.tint = 0x00ffff;
                 },this);
        
             this.base.events.onDragStop.add(function(sprite, pointer) { 
                 this.swipProcessor.startKineticScrolling();
             },this);
        
        
             this.game.input.onDown.add(function() {
                 this.sprite.tint = 0xffffff; // remove the tint effect
             } , { state: this, sprite: this.base } );
        
            //  Here we add a new animation called 'walk'
            //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
            this.base.animations.add('walk',[0,1,2,3],10, true);
            //this.base.animations.add('damaged',[4],10, true);
        
            //  And this starts the animation playing by using its key ("walk")
            //  30 is the frame rate (30fps)
            //  true means it will loop when it finishes
              this.base.animations.play('walk');   
        */


        var baseEntityId = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId, { x: 300, y: 400 });

        var baseEntityId2 = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 400 });

        this.manager.addProcessor(new TileMapProcessor(this.manager, this.game));
        this.manager.addProcessor(new SwipeProcessor(this.manager, this.game, this.game));
        this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
        this.manager.addProcessor(new DragDropProcessor(this.manager, this.game));
        this.manager.addProcessor(new AnimationProcessor(this.manager, this.game));

    }

    update() {
        this.manager.update(this.game.time.elapsedMS);
    }

    render() {


        this.game.debug.cameraInfo(this.game.camera, 32, 32);

         var displayables = this.manager.getComponentsData('Displayable');
        for (var entityId in displayables) {
        // this.game.debug.spriteInfo(this.base, 400, 32);
        }
    }
}

export = Game;