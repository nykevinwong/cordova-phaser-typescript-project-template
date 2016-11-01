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
import AnimationSet = require("components/AnimationSet");
import BaseAssemblage = require("assemblages/buildings/Base")
import StarPortAssemblage = require("assemblages/buildings/StarPort")

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
//        var json = this.game.load.json('baseJson', 'assets/buildings/base.json', true);

        this.game.load.spritesheet('base', 'assets/gfx/buildings/base.png', 60, 60);
        this.game.load.spritesheet('starport', 'assets/gfx/buildings/starport.png', 40, 60);
    }

    init() {
        this.manager = new EntityManager()

        // set up entity manager with creatable component list.
        var components: EntityManager.Component[] = [Displayable, Position, DragDrop, Animation, AnimationSet];
        this.manager.addComponents(components);

        var assemblages = [BaseAssemblage,StarPortAssemblage];
        this.manager.addAssemblages(assemblages);

    }

    private base: Phaser.Sprite;

    create() {



        var baseEntityId = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId, { x: 300, y: 400 });

        var baseEntityId2 = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 400 });

        var baseEntityId2 = this.manager.createEntityFromAssemblage('starport');
        this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 200 });

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