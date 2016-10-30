import EntityManager=  require("components/EntityManager");
import SwipeProcessor = require("processors/SwipeProcessor");
import DragDropProcessor = require("processors/DragDropProcessor");
import RenderingProcessor = require("processors/RenderingProcessor");
import Displayable = require("components/Displayable");
import Position =  require("components/Position");
import DragDrop =  require("components/DragDrop");

class Game extends Phaser.State {
    private cursors: Phaser.CursorKeys;
    private layer: Phaser.TilemapLayer;
    private manager: EntityManager;
    private clicks: number;
    private swipProcessor : SwipeProcessor;

    constructor() {
        super();
    }

    preload() {


            this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tilesGrs2Crtr', 'assets/tilesets/Grs2Crtr.png');
            this.game.load.image('tilesGrs2Watr', 'assets/tilesets/Grs2Watr.png');
            this.game.load.image('tilesGrass', 'assets/tilesets/Grass.png');      
            this.game.load.spritesheet('base', 'assets/gfx/buildings/base.png', 60, 60);
    }

    init() {
        this.manager = new EntityManager()

                // set up entity manager with creatable component list.
        var components = [Displayable, Position, DragDrop];
        for (var i = components.length - 1; i >= 0; i--) {
                this.manager.addComponent(components[i].name, components[i]);
        }

 
    }
 
    private base: Phaser.Sprite;

    create() {
     

        //  The 'mario' key here is the Loader key given in game.load.tilemap
        var map = this.game.add.tilemap('level1');

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        map.addTilesetImage('Grs2Crtr', 'tilesGrs2Crtr');
        map.addTilesetImage('Grs2Watr', 'tilesGrs2Watr');
        map.addTilesetImage('Grass', 'tilesGrass');

        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        this.layer = map.createLayer('Tile Layer 1');

        //  This resizes the game world to match the layer dimensions
        this.layer.resizeWorld();

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


           var data = [
                {
                    components: ['Position', 'Displayable','DragDrop'],
                    sprite: 'base',
                    x: 300,
                    y: 200
                }
                ];

            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var entity = this.manager.createEntity(d.components);
                this.manager.updateComponentDataForEntity('Displayable', entity, {sprite: d.sprite});
                this.manager.updateComponentDataForEntity('Position', entity, {x: d.x, y: d.y});
            }


        this.swipProcessor = new SwipeProcessor(this.manager, this.game, this.game);
        this.manager.addProcessor(this.swipProcessor);   
        this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));   
        this.manager.addProcessor(new DragDropProcessor(this.manager, this.game));   
        
    }

    update() {
        this.manager.update(this.game.time.elapsedMS);
    }

    render() {


        this.game.debug.cameraInfo(this.game.camera, 32, 32);
       // this.game.debug.spriteInfo(this.base, 400, 32);
    }
}

export = Game;