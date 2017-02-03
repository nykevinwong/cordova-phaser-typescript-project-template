define(["require", "exports"], function (require, exports) {
    "use strict";
    var DragDropProcessor = (function () {
        function DragDropProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.isDirty = true;
        }
        DragDropProcessor.prototype.enableDrag = function () {
            var dragDrops = this.manager.getComponentsData('DragDrop');
            var displayables = this.manager.getComponentsData('Displayable');
            var entityCount = 0;
            var initlizedCount = 0;
            for (var entityId in dragDrops) {
                var dragDropState = dragDrops[entityId];
                entityCount++;
                if (dragDropState.initialized) {
                    initlizedCount++;
                    continue;
                }
                var displayableState = displayables[entityId];
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
                        }
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
                        this.manager.updateComponentDataForEntity('DragDrop', +entityId, { initialized: true });
                    }
                    console.log("DragDropProcessor-DragDropComponent[" + entityId + "," + displayableState.sprite + "]: INITIALZIED. ");
                    console.log(dragDropState);
                    initlizedCount++;
                }
                else {
                    console.log("DragDropProcessor-DragDropComponent[" + entityId + "]: displayableState sprite reference is NOT AVAIALBLE.");
                    console.log(dragDropState);
                }
            }
            if (entityCount === initlizedCount) {
                this.isDirty = false;
                console.log("ALL DragDropProcessor-DragDropComponents are INITIALIZED.");
            }
        };
        DragDropProcessor.prototype.update = function (deltaTime) {
            if (this.isDirty) {
                this.enableDrag();
            }
        };
        return DragDropProcessor;
    }());
    return DragDropProcessor;
});
