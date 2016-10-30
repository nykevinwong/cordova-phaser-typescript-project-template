/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class TileMapProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private isDirty: boolean;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.isDirty = true;
    }

    createTileMap() {
        //  The 'level1' key here is the Loader key given in game.load.tilemap
        var map = this.game.add.tilemap('level1');

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        map.addTilesetImage('Grs2Crtr', 'tilesGrs2Crtr');
        map.addTilesetImage('Grs2Watr', 'tilesGrs2Watr');
        map.addTilesetImage('Grass', 'tilesGrass');

        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        var layer = map.createLayer('Tile Layer 1');

        //  This resizes the game world to match the layer dimensions
        layer.resizeWorld();

        console.log("TiledMap created.");
        this.isDirty = false;
    }

    update(deltaTime: number): void {
        if(this.isDirty)
        {
            this.createTileMap();
        }

    }
}

export = TileMapProcessor;