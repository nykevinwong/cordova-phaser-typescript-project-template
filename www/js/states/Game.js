var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "components/EntityManager", "processors/SwipeProcessor", "processors/DragDropProcessor", "processors/RenderingProcessor", "processors/TileMapProcessor", "processors/AnimationProcessor", "components/Displayable", "components/Position", "components/DragDrop", "components/Animation", "components/AnimationSet", "assemblages/buildings/Base", "assemblages/buildings/StarPort", "assemblages/buildings/Harvester"], function (require, exports, EntityManager, SwipeProcessor, DragDropProcessor, RenderingProcessor, TileMapProcessor, AnimationProcessor, Displayable, Position, DragDrop, Animation, AnimationSet, BaseAssemblage, StarPortAssemblage, HarvesterAssemblage) {
    "use strict";
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
        }
        Game.prototype.preload = function () {
            this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tilesGrs2Crtr', 'assets/tilesets/Grs2Crtr.png');
            this.game.load.image('tilesGrs2Watr', 'assets/tilesets/Grs2Watr.png');
            this.game.load.image('tilesGrass', 'assets/tilesets/Grass.png');
            this.game.load.spritesheet('base', 'assets/gfx/buildings/base.png', 60, 60);
            this.game.load.spritesheet('starport', 'assets/gfx/buildings/starport.png', 40, 60);
            this.game.load.spritesheet('harvester', 'assets/gfx/buildings/harvester.png', 40, 60);
        };
        Game.prototype.init = function () {
            this.manager = new EntityManager();
            var components = [Displayable, Position, DragDrop, Animation, AnimationSet];
            this.manager.addComponents(components);
            var assemblages = [BaseAssemblage, StarPortAssemblage, HarvesterAssemblage];
            this.manager.addAssemblages(assemblages);
        };
        Game.prototype.create = function () {
            var baseEntityId = this.manager.createEntityFromAssemblage('base');
            this.manager.updateComponentDataForEntity('Position', baseEntityId, { x: 300, y: 400 });
            var baseEntityId2 = this.manager.createEntityFromAssemblage('base');
            this.manager.updateComponentDataForEntity('Position', baseEntityId2, { x: 400, y: 400 });
            var baseEntityId3 = this.manager.createEntityFromAssemblage('starport');
            this.manager.updateComponentDataForEntity('Position', baseEntityId3, { x: 360, y: 200 });
            var baseEntityId4 = this.manager.createEntityFromAssemblage('harvester');
            this.manager.updateComponentDataForEntity('Position', baseEntityId4, { x: 460, y: 200 });
            this.manager.addProcessor(new TileMapProcessor(this.manager, this.game));
            this.manager.addProcessor(new SwipeProcessor(this.manager, this.game, this.game));
            this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
            this.manager.addProcessor(new DragDropProcessor(this.manager, this.game));
            this.manager.addProcessor(new AnimationProcessor(this.manager, this.game));
        };
        Game.prototype.update = function () {
            this.manager.update(this.game.time.elapsedMS);
        };
        Game.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            var displayables = this.manager.getComponentsData('Displayable');
            for (var entityId in displayables) {
            }
        };
        return Game;
    }(Phaser.State));
    return Game;
});
