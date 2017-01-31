import EntityManager = require("components/EntityManager");

// processors
import SwipeProcessor = require("processors/SwipeProcessor");
import DragDropProcessor = require("processors/DragDropProcessor");
import RenderingProcessor = require("processors/RenderingProcessor");
import TileMapProcessor = require("processors/TileMapProcessor");
import AnimationProcessor = require("processors/AnimationProcessor");
import GroupProcessor = require("processors/GroupProcessor");
import SelectableProcessor = require("processors/SelectableProcessor");
import StateProcessor = require("processors/StateProcessor");
import HealthBarRenderingProcessor = require("processors/HealthBarRenderingProcessor");
import PositionProcessor = require("processors/PositionProcessor");
import OrdersProcessor = require("processors/OrdersProcessor");

// components
import Displayable = require("components/Displayable");
import Position = require("components/Position");
import DragDrop = require("components/DragDrop");
import Animation = require("components/Animation");
import AnimationSet = require("components/AnimationSet");
import Group = require("components/Group");
import Selectable = require("components/Selectable");
import Type = require("components/Type");
import State = require("components/State");
import HealthPoint = require("components/HealthPoint");
import Direction = require("components/Direction");
import Orders  = require("components/Orders");

// buildings
import BaseAssemblage = require("assemblages/buildings/Base")
import StarPortAssemblage = require("assemblages/buildings/StarPort")
import HarvesterAssemblage = require("assemblages/buildings/Harvester")
import GroundTurretAssemblage = require("assemblages/buildings/Ground-turret")

// aircraft
import ChooperAssemblage = require("assemblages/aircraft/Chopper")
import WraithAssemblage = require("assemblages/aircraft/Wraith")

class Game extends Phaser.State {
    private manager: EntityManager;

    constructor() {
        super();
    }

    preload() {
    }

    init() {
        this.manager = new EntityManager()

        this.game.time.advancedTiming = true; // enable FPS
        // set up entity manager with creatable component list.
        var components: EntityManager.Component[] = [
            Displayable, Position, DragDrop, Animation, 
            AnimationSet, Group, Selectable, Type, 
            State, HealthPoint, Direction, Orders];
        this.manager.addComponents(components);

        // assemblages is a pre-setup template used to create game entities.
        var assemblages = [
        BaseAssemblage, StarPortAssemblage , HarvesterAssemblage, GroundTurretAssemblage,
        ChooperAssemblage, WraithAssemblage];
        this.manager.addAssemblages(assemblages);

    }

    private base: Phaser.Sprite;

    create() {



        var baseEntityId = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId, { x: 300, y: 400 });

        var baseEntityId2 = this.manager.createEntityFromAssemblage('base');
        this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 400 });
        this.manager.updateComponentDataForEntity('HealthPoint', baseEntityId2, { hp:100 });

        var baseEntityId3 = this.manager.createEntityFromAssemblage('starport');
        this.manager.updateComponentDataForEntity('Position', baseEntityId3, { x: 360, y: 200 });

        var baseEntityId4 = this.manager.createEntityFromAssemblage('harvester');
        this.manager.updateComponentDataForEntity('Position', baseEntityId4, { x: 460, y: 200 });

        var baseEntityId5 = this.manager.createEntityFromAssemblage('ground-turret');
        this.manager.updateComponentDataForEntity('Position', baseEntityId5, { x: 560, y: 200 });

        var baseEntityId6 = this.manager.createEntityFromAssemblage('chopper');
        this.manager.updateComponentDataForEntity('Position', baseEntityId6, { x: 160, y: 300 });

        var baseEntityId7 = this.manager.createEntityFromAssemblage('wraith');
        this.manager.updateComponentDataForEntity('Position', baseEntityId7, { x: 260, y: 150 });

        this.manager.addProcessor(new TileMapProcessor(this.manager, this.game));
        this.manager.addProcessor(new SwipeProcessor(this.manager, this.game, this.game));
        this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
        this.manager.addProcessor(new HealthBarRenderingProcessor(this.manager, this.game));
        this.manager.addProcessor(new DragDropProcessor(this.manager, this.game));
        this.manager.addProcessor(new AnimationProcessor(this.manager, this.game));
        this.manager.addProcessor(new StateProcessor(this.manager, this.game));
        this.manager.addProcessor(new GroupProcessor(this.manager, this.game));
        this.manager.addProcessor(new SelectableProcessor(this.manager, this.game));
        this.manager.addProcessor(new OrdersProcessor(this.manager, this.game));
        this.manager.addProcessor(new PositionProcessor(this.manager, this.game));
        
        var NumPadAddKey = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ADD);
        var NumPadSubtractKey = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_SUBTRACT);
        this.baseEntityId = baseEntityId;
        
        NumPadAddKey.onDown.add(function()
        {
            var g :Game = this;
            var hpState: Component.HealthPointState =  g.manager.getComponentDataForEntity("HealthPoint", g.baseEntityId);
            hpState.hp +=100;
            
            g.manager.updateComponentDataForEntity("HealthPoint", g.baseEntityId, hpState);

        }, this); 

        NumPadSubtractKey.onDown.add(function()
        {
            var g :Game = this;
            var hpState: Component.HealthPointState =  g.manager.getComponentDataForEntity("HealthPoint", g.baseEntityId);
            
            hpState.hp -=100;
            if(hpState.hp<=0) hpState.hp = 0;

            g.manager.updateComponentDataForEntity("HealthPoint", g.baseEntityId, hpState);

        }, this); 

    }

    update() {
        this.manager.update(this.game.time.elapsedMS);
    }

    render() {

        this.game.debug.cameraInfo(this.game.camera, 32, this.game.height-250);
        this.game.debug.text('FPS: ' + (this.game.time.fps || '--'), this.game.width-100, 32, "#00ff00"); 

         var displayables = this.manager.getComponentsData('Displayable');
        for (var entityId in displayables) {
        // this.game.debug.spriteInfo(this.base, 400, 32);
        }
    }
}

export = Game;