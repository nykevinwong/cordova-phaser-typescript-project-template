var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "components/EntityManager", "processors/SwipeProcessor", "processors/DragDropProcessor", "processors/RenderingProcessor", "components/Displayable", "components/Position", "components/DragDrop"], function (require, exports, EntityManager, SwipeProcessor, DragDropProcessor, RenderingProcessor, Displayable, Position, DragDrop) {
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
        };
        Game.prototype.init = function () {
            this.manager = new EntityManager();
            var components = [Displayable, Position, DragDrop];
            for (var i = components.length - 1; i >= 0; i--) {
                this.manager.addComponent(components[i].name, components[i]);
            }
        };
        Game.prototype.create = function () {
            var map = this.game.add.tilemap('level1');
            map.addTilesetImage('Grs2Crtr', 'tilesGrs2Crtr');
            map.addTilesetImage('Grs2Watr', 'tilesGrs2Watr');
            map.addTilesetImage('Grass', 'tilesGrass');
            this.layer = map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            var data = [
                {
                    components: ['Position', 'Displayable', 'DragDrop'],
                    sprite: 'base',
                    x: 300,
                    y: 200
                }
            ];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var entity = this.manager.createEntity(d.components);
                this.manager.updateComponentDataForEntity('Displayable', entity, { sprite: d.sprite });
                this.manager.updateComponentDataForEntity('Position', entity, { x: d.x, y: d.y });
            }
            this.swipProcessor = new SwipeProcessor(this.manager, this.game, this.game);
            this.manager.addProcessor(this.swipProcessor);
            this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
            this.manager.addProcessor(new DragDropProcessor(this.manager, this.game));
        };
        Game.prototype.update = function () {
            this.manager.update(this.game.time.elapsedMS);
        };
        Game.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        };
        return Game;
    }(Phaser.State));
    return Game;
});
