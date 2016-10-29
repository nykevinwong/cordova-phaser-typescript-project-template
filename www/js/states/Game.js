var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "components/EntityManager"], function (require, exports, EntityManager) {
    "use strict";
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
            this.rectVisible = false;
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
        };
        Game.prototype.create = function () {
            var map = this.game.add.tilemap('level1');
            map.addTilesetImage('Grs2Crtr', 'tilesGrs2Crtr');
            map.addTilesetImage('Grs2Watr', 'tilesGrs2Watr');
            map.addTilesetImage('Grass', 'tilesGrass');
            this.layer = map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            this.base = this.game.add.sprite(300, 200, 'base');
            this.base.inputEnabled = true;
            this.base.input.enableDrag();
            var offestX = this.game.camera.x % 20;
            var offestY = this.game.camera.y % 20;
            this.base.input.enableSnap(20, 20, true, true, offestX, offestY);
            this.rect = new Phaser.Rectangle(0, 0, 60, 60);
            var game = this.game;
            this.base.events.onDragStart.add(function (sprite, pointer) {
                this.rectVisible = true;
            }, this);
            this.base.events.onDragStop.add(function (sprite, pointer) {
            }, this);
            this.game.input.onDown.add(function () {
                this.rectVisible = false;
            }, this);
            this.base.animations.add('walk', [0, 1, 2, 3], 10, true);
            this.base.animations.play('walk');
        };
        Game.prototype.update = function () {
            this.manager.update(this.game.time.elapsedMS);
        };
        Game.prototype.render = function () {
            this.rect.x = this.base.x;
            this.rect.y = this.base.y;
            if (this.rectVisible == true)
                this.game.debug.geom(this.rect, '#00ff00', false);
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteInfo(this.base, 400, 32);
        };
        return Game;
    }(Phaser.State));
    return Game;
});
