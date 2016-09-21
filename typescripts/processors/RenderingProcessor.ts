/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class RenderingProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private sprites: (Phaser.Sprite|Phaser.Rope)[] =  new Array();
    
    constructor(manager: EntityManager, game:Phaser.Game)
    {
        this.manager = manager;
        this.game = game;
    }

    createSprite(entityId:number, displayableData) {
        var posData:Component.PositionState = this.manager.getComponentDataForEntity('Position', entityId);
        var anchorData:Component.AnchorState = this.manager.getComponentDataForEntity('Anchor', entityId);

        if(this.manager.entityHasComponent(entityId, "Rope"))
        {
            var image: Phaser.Image = this.game.cache.getImage(displayableData.sprite);    
            var ropeData:Component.RopeState = this.manager.getComponentDataForEntity('Rope', entityId);
            var count = 0;
            var totalPoints = ropeData.pointCount;
            var length = (ropeData.width==0) ? (image.width / totalPoints) : (ropeData.width / totalPoints);
            var points: Phaser.Point[] = [];

            for (var i = 0; i < totalPoints; i++)
            {
                points.push(new Phaser.Point(i * length, 0));
            }

            var x = posData.x - image.width * anchorData.x;
            var y = posData.y - image.height * anchorData.y;
            var rope = this.game.add.rope(x, y, displayableData.sprite, null, points);  

            

            rope.updateAnimation = function() {
                count += 0.1;

                for (var i = 0; i < this.points.length; i++)
                {
                    this.points[i].y = Math.sin(i * 0.5 + count) * totalPoints;
                }
            };

            this.sprites[entityId] = rope;

        }
        else
        {

        var sprite: Phaser.Sprite = this.game.add.sprite(posData.x, posData.y, displayableData.sprite);
        sprite.anchor.x = anchorData.x;
        sprite.anchor.y = anchorData.y;
        this.sprites[entityId] = sprite;

        }
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

