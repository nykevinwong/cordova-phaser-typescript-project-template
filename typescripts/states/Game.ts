import EntityManager = require("components/EntityManager");
import SwipeProcessor = require("processors/SwipeProcessor");
import DragDropProcessor = require("processors/DragDropProcessor");
import RenderingProcessor = require("processors/RenderingProcessor");
import TileMapProcessor = require("processors/TileMapProcessor");
import AnimationProcessor = require("processors/AnimationProcessor");
import GroupProcessor = require("processors/GroupProcessor");
import Displayable = require("components/Displayable");
import Position = require("components/Position");
import DragDrop = require("components/DragDrop");
import Animation = require("components/Animation");
import AnimationSet = require("components/AnimationSet");
import Group = require("components/Group");
import BaseAssemblage = require("assemblages/buildings/Base")
import StarPortAssemblage = require("assemblages/buildings/StarPort")
import HarvesterAssemblage = require("assemblages/buildings/Harvester")

class Game extends Phaser.State {
    private manager: EntityManager;

    constructor() {
        super();
    }

    preload() {
    }

    init() {
        this.manager = new EntityManager()

        // set up entity manager with creatable component list.
        var components: EntityManager.Component[] = [Displayable, Position, DragDrop, Animation, AnimationSet, Group];
        this.manager.addComponents(components);

        // assemblages is a pre-setup template used to create game entities.
        var assemblages = [BaseAssemblage, StarPortAssemblage , HarvesterAssemblage];
        this.manager.addAssemblages(assemblages);

    }

    private base: Phaser.Sprite;

    create() {



        var baseEntityId = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId, { x: 300, y: 400 });

        var baseEntityId2 = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 400 });

        var baseEntityId3 = this.manager.createEntityFromAssemblage('starport');
        this.manager.updateComponentDataForEntity('Position', baseEntityId3, { x: 360, y: 200 });

        var baseEntityId4 = this.manager.createEntityFromAssemblage('harvester');
        this.manager.updateComponentDataForEntity('Position', baseEntityId4, { x: 460, y: 200 });

 //       this.manager.addProcessor(new TileMapProcessor(this.manager, this.game));
        this.manager.addProcessor(new SwipeProcessor(this.manager, this.game, this.game));
        this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
        this.manager.addProcessor(new DragDropProcessor(this.manager, this.game));
        this.manager.addProcessor(new AnimationProcessor(this.manager, this.game));
        this.manager.addProcessor(new GroupProcessor(this.manager, this.game));
        

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