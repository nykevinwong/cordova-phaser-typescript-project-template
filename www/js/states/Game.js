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
        }
        Game.prototype.preload = function () {
            this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tilesGrs2Crtr', 'assets/tilesets/Grs2Crtr.png');
            this.game.load.image('tilesGrs2Watr', 'assets/tilesets/Grs2Watr.png');
            this.game.load.image('tilesGrass', 'assets/tilesets/Grass.png');
        };
        Game.prototype.init = function () {
            this.manager = new EntityManager();
            this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
            this.game.kineticScrolling.configure({
                kineticMovement: true,
                timeConstantScroll: 325,
                horizontalScroll: true,
                verticalScroll: true,
                horizontalWheel: false,
                verticalWheel: false,
                deltaWheel: 40
            });
        };
        Game.prototype.create = function () {
            this.game.kineticScrolling.start();
            var map = this.game.add.tilemap('level1');
            map.addTilesetImage('Grs2Crtr', 'tilesGrs2Crtr');
            map.addTilesetImage('Grs2Watr', 'tilesGrs2Watr');
            map.addTilesetImage('Grass', 'tilesGrass');
            this.layer = map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
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
