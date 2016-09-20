/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class RenderingProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private sprites: Phaser.Sprite[] =  new Array();

    constructor(manager: EntityManager, game:Phaser.Game)
    {
        this.manager = manager;
        this.game = game;
    }

    createSprite(entityId:number, displayableData) {
        var posData:Component.PositionState = this.manager.getComponentDataForEntity('Position', entityId);
        var anchorData:Component.AnchorState = this.manager.getComponentDataForEntity('Anchor', entityId);

        var sprite = this.game.add.sprite(posData.x, posData.y, displayableData.sprite);
        sprite.anchor.x = anchorData.x;
        sprite.anchor.y = anchorData.y;
        this.sprites[entityId] = sprite;
    }

    update(deltaTime: number): void{
           var displayables = this.manager.getComponentsData('Displayable');
        for (var entityId in displayables) {
            // First create the actual Phaser.Sprite object if it doesn't exist yet.
            if (!this.sprites[entityId]) {
                // plus sign means converting to number.
                this.createSprite(+entityId, displayables[entityId]);
            }
        }
    }

}

export = RenderingProcessor;

