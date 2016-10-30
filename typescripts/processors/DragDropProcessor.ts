/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class DragDropProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private isDirty: boolean;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.isDirty = true;
    }

    enableDrag() {
        var dragDrops: Component.DragDropState[] = this.manager.getComponentsData('DragDrop');
        var displayables: Component.DisplayableState[] = this.manager.getComponentsData('Displayable');
        var entityCount: number = 0;
        var initlizedCount: number = 0;

        for (var entityId in dragDrops) {
            var dragDropState: Component.DragDropState = dragDrops[entityId];
            entityCount++;

            if (dragDropState.initialized) {
                initlizedCount++;
                continue;
            }

            var displayableState: Component.DisplayableState = displayables[entityId];

            var sprite: Phaser.Sprite = displayableState.spriteReference;
            if (sprite != null) {
                if (dragDropState.enable) {
                    sprite.inputEnabled = true;
                    sprite.input.enableDrag();

                    if (dragDropState.enableSnap) {
                        var mapTileWidth = 20;
                        var mapTileHeight = 20;
                        //  Enable snapping. For the atari1 sprite it will snap as its dragged around and on release.
                        //  The snap is set to every 32x32 pixels.
                        var offestX = this.game.camera.x % mapTileWidth;
                        var offestY = this.game.camera.y % mapTileHeight;
                        sprite.input.enableSnap(mapTileWidth, mapTileHeight, true, true, offestX, offestY);

                        if (typeof this.game.kineticScrolling != 'undefined') {

                            sprite.events.onDragStart.add(
                                function (sprite, pointer) {
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
            console.log("ALL DragDropProcessor-DragDropComponents are INITIALIZED.")
        }


    }

    update(deltaTime: number): void {

        if (this.isDirty) {
            this.enableDrag();
        }
    }
}

export = DragDropProcessor;