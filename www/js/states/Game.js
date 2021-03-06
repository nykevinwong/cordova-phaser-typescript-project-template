var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "components/EntityManager", "processors/SwipeProcessor", "processors/DragDropProcessor", "processors/RenderingProcessor", "processors/TileMapProcessor", "processors/AnimationProcessor", "processors/GroupProcessor", "processors/SelectableProcessor", "processors/StateProcessor", "processors/HealthBarRenderingProcessor", "processors/PositionProcessor", "processors/OrdersProcessor", "components/Displayable", "components/Position", "components/DragDrop", "components/Animation", "components/AnimationSet", "components/Group", "components/Selectable", "components/Type", "components/State", "components/HealthPoint", "components/Direction", "components/Orders", "assemblages/buildings/Base", "assemblages/buildings/StarPort", "assemblages/buildings/Harvester", "assemblages/buildings/Ground-turret", "assemblages/aircraft/Chopper", "assemblages/aircraft/Wraith"], function (require, exports, EntityManager, SwipeProcessor, DragDropProcessor, RenderingProcessor, TileMapProcessor, AnimationProcessor, GroupProcessor, SelectableProcessor, StateProcessor, HealthBarRenderingProcessor, PositionProcessor, OrdersProcessor, Displayable, Position, DragDrop, Animation, AnimationSet, Group, Selectable, Type, State, HealthPoint, Direction, Orders, BaseAssemblage, StarPortAssemblage, HarvesterAssemblage, GroundTurretAssemblage, ChooperAssemblage, WraithAssemblage) {
    "use strict";
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super.call(this) || this;
        }
        Game.prototype.preload = function () {
        };
        Game.prototype.init = function () {
            this.manager = new EntityManager();
            this.game.time.advancedTiming = true;
            var components = [
                Displayable, Position, DragDrop, Animation,
                AnimationSet, Group, Selectable, Type,
                State, HealthPoint, Direction, Orders
            ];
            this.manager.addComponents(components);
            var assemblages = [
                BaseAssemblage, StarPortAssemblage, HarvesterAssemblage, GroundTurretAssemblage,
                ChooperAssemblage, WraithAssemblage
            ];
            this.manager.addAssemblages(assemblages);
        };
        Game.prototype.create = function () {
            var baseEntityId = this.manager.createEntityFromAssemblage('base');
            this.manager.updateComponentDataForEntity('Position', baseEntityId, { x: 300, y: 400 });
            var baseEntityId2 = this.manager.createEntityFromAssemblage('base');
            this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 400 });
            this.manager.updateComponentDataForEntity('HealthPoint', baseEntityId2, { hp: 100 });
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
            var baseEntityId8 = this.manager.createEntityFromAssemblage('wraith');
            this.manager.updateComponentDataForEntity('Position', baseEntityId8, { x: 760, y: 10 });
            var baseEntityId9 = this.manager.createEntityFromAssemblage('chopper');
            this.manager.updateComponentDataForEntity('Position', baseEntityId9, { x: 160, y: 10 });
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
            NumPadAddKey.onDown.add(function () {
                var g = this;
                var hpState = g.manager.getComponentDataForEntity("HealthPoint", g.baseEntityId);
                hpState.hp += 100;
                g.manager.updateComponentDataForEntity("HealthPoint", g.baseEntityId, hpState);
            }, this);
            NumPadSubtractKey.onDown.add(function () {
                var g = this;
                var hpState = g.manager.getComponentDataForEntity("HealthPoint", g.baseEntityId);
                hpState.hp -= 100;
                if (hpState.hp <= 0)
                    hpState.hp = 0;
                g.manager.updateComponentDataForEntity("HealthPoint", g.baseEntityId, hpState);
            }, this);
        };
        Game.prototype.update = function () {
            this.manager.update(this.game.time.elapsedMS);
        };
        Game.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, this.game.height - 250);
            this.game.debug.text('FPS: ' + (this.game.time.fps || '--'), this.game.width - 100, 32, "#00ff00");
            var displayables = this.manager.getComponentsData('Displayable');
            for (var entityId in displayables) {
            }
        };
        return Game;
    }(Phaser.State));
    return Game;
});
