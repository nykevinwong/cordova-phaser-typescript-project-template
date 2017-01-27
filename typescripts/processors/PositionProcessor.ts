/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");

class PositionProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
    }


    update(deltaTime: number): void {
         var displayables = this.manager.getComponentsData('Displayable');
        for (var entityId in displayables) {
            var displayableData = displayables[entityId];
            // First create the actual Phaser.Sprite object if it doesn't exist yet.            
            if (displayableData.spriteReference != null) {
                var sprite: Phaser.Sprite = displayableData.spriteReference;
                var posState : Component.PositionState = this.manager.getComponentDataForEntity('Position', +entityId);

                posState.x = sprite.x;
                posState.y = sprite.y;

                this.manager.updateComponentDataForEntity('Position', +entityId, posState);
            }

        }
    }
}

export = PositionProcessor;