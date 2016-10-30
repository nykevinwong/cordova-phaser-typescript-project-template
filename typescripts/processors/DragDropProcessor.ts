/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class DragDropProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.enableDrag();
    }

    enableDrag() {
        var dragDrops = this.manager.getComponentsData('DragDrop');
        var displayables = this.manager.getComponentsData('Displayable');

        for (var entityId in dragDrops) {
            var displayableState: Component.DisplayableState = displayables[entityId];
            var dragDropState: Component.DragDropState = dragDrops[entityId];

            var sprite = displayableState.spriteReference;
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
                }
            }
            else {
                console.log("DragDropPRocess:enableDrag() - spriteReference is not available - " + entityId);
            }

        }


    }

    update(deltaTime: number): void {
    }
}

export = DragDropProcessor;