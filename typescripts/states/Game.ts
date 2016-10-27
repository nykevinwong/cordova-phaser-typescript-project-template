import EntityManager=  require("components/EntityManager");
import SwipeProcessor = require("processors/SwipeProcessor");

class Game extends Phaser.State {
    private cursors: Phaser.CursorKeys;
    private layer: Phaser.TilemapLayer;
    private manager: EntityManager;

    constructor() {
        super();
    }

    preload() {

        this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilesGrs2Crtr', 'assets/tilesets/Grs2Crtr.png');
        this.game.load.image('tilesGrs2Watr', 'assets/tilesets/Grs2Watr.png');
        this.game.load.image('tilesGrass', 'assets/tilesets/Grass.png');
    }

    init() {
        this.manager = new EntityManager()
        this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        this.game.kineticScrolling.configure({
            kineticMovement: true,
            timeConstantScroll: 325, //really mimic iOS
            horizontalScroll: true,
            verticalScroll: true,
            horizontalWheel: false,
            verticalWheel: false,
            deltaWheel: 40
        });
       // this.manager.addProcessor(new SwipeProcessor(this.manager, this.game));
    }

    create() {
         this.game.kineticScrolling.start();

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
    }

    update() {
        this.manager.update(this.game.time.elapsedMS);
    }


    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

}

export = Game;