define(["require", "exports"], function (require, exports) {
    "use strict";
    var TileMapProcessor = (function () {
        function TileMapProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.isDirty = true;
        }
        TileMapProcessor.prototype.createTileMap = function () {
            var map = this.game.add.tilemap('level1');
            map.addTilesetImage('Grs2Crtr', 'tilesGrs2Crtr');
            map.addTilesetImage('Grs2Watr', 'tilesGrs2Watr');
            map.addTilesetImage('Grass', 'tilesGrass');
            var layer = map.createLayer('Tile Layer 1');
            layer.resizeWorld();
            var group = this.game.add.group();
            group.add(layer);
            console.log("TiledMap created.");
            this.isDirty = false;
        };
        TileMapProcessor.prototype.update = function (deltaTime) {
            if (this.isDirty) {
                this.createTileMap();
            }
        };
        return TileMapProcessor;
    }());
    return TileMapProcessor;
});
