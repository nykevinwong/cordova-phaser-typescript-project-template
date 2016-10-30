define(["require", "exports"], function (require, exports) {
    "use strict";
    var DragDropProcessor = (function () {
        function DragDropProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.enableDrag();
        }
        DragDropProcessor.prototype.enableDrag = function () {
            var dragDrops = this.manager.getComponentsData('DragDrop');
            var displayables = this.manager.getComponentsData('Displayable');
            for (var entityId in dragDrops) {
                var displayableState = displayables[entityId];
                var dragDropState = dragDrops[entityId];
                var sprite = displayableState.spriteReference;
                if (sprite != null) {
                    if (dragDropState.enable) {
                        sprite.inputEnabled = true;
                        sprite.input.enableDrag();
                        if (dragDropState.enableSnap) {
                            var mapTileWidth = 20;
                            var mapTileHeight = 20;
                            var offestX = this.game.camera.x % mapTileWidth;
                            var offestY = this.game.camera.y % mapTileHeight;
                            sprite.input.enableSnap(mapTileWidth, mapTileHeight, true, true, offestX, offestY);
                            if (typeof this.game.kineticScrolling != 'undefined') {
                                sprite.events.onDragStart.add(function (sprite, pointer) {
                                    if (typeof this.game.kineticScrolling != 'undefined') {
                                        this.game.kineticScrolling.stop();
                                    }
                                }, this);
                                sprite.events.onDragStop.add(function (sprite, pointer) {
                                    if (typeof this.game.kineticScrolling != 'undefined') {
                                        this.game.kineticScrolling.start();
                                    }
                                }, this);
                            }
                        }
                    }
                }
                else {
                    console.log("DragDropPRocess:enableDrag() - spriteReference is not available - " + entityId);
                }
            }
        };
        DragDropProcessor.prototype.update = function (deltaTime) {
        };
        return DragDropProcessor;
    }());
    return DragDropProcessor;
});
