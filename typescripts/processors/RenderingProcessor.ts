/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class RenderingProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    
    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
    }

    createSprite(entityId: number, displayableData: Component.DisplayableState) {
        var posData: Component.PositionState = this.manager.getComponentDataForEntity('Position', entityId);
        var anchorData: Component.AnchorState = null;
        var tempSprite: Phaser.Sprite | Phaser.Rope;

        if (this.manager.entityHasComponent(entityId, "Anchor")) {
            anchorData = this.manager.getComponentDataForEntity('Anchor', entityId);
        }

        if (this.manager.entityHasComponent(entityId, "Rope")) {
            var image: Phaser.Image = this.game.cache.getImage(displayableData.sprite);
            var ropeData: Component.RopeState = this.manager.getComponentDataForEntity('Rope', entityId);
            var count = 0;
            var totalPoints = ropeData.pointCount;
            var length = (ropeData.width == 0) ? (image.width / totalPoints) : (ropeData.width / totalPoints);
            var points: Phaser.Point[] = [];

            for (var i = 0; i < totalPoints; i++) {
                points.push(new Phaser.Point(i * length, 0));
            }

            var x = posData.x;
            var y = posData.y;

            if (anchorData != null) {
                x = x - image.width * anchorData.x;
                y = y - image.height * anchorData.y;
            }
    
            var rope: Phaser.Rope = this.game.add.rope(x, y, displayableData.sprite, null, points);

            rope.updateAnimation = function () {
                count += 0.4 * (1 / this.game.time.elapsedMS);

                for (var i = 0; i < this.points.length; i++) {
                    this.points[i].y = Math.sin(i * 0.5 + count) * totalPoints;
                }
            };

            tempSprite = rope;
            console.log("RenderingProcessor-RopeComponent[" + entityId + "," + displayableData.sprite + "]: INITIALZIED. ");
        }
        else {

            var sprite: Phaser.Sprite = this.game.add.sprite(posData.x, posData.y, displayableData.sprite);

            if (anchorData != null) {
                sprite.anchor.x = anchorData.x;
                sprite.anchor.y = anchorData.y;
            }

            tempSprite = sprite;
            console.log("RenderingProcessor-SpriteComponent[" + entityId + "," + displayableData.sprite + "]: INITIALZIED. ");

        }

        this.manager.updateComponentDataForEntity('Displayable', entityId, { spriteReference: tempSprite });
        console.log(tempSprite)
    }

    update(deltaTime: number): void {
        var displayables = this.manager.getComponentsData('Displayable');
        for (var entityId in displayables) {
            var displayableData = displayables[entityId];
            // First create the actual Phaser.Sprite object if it doesn't exist yet.
            if (displayableData.spriteReference == null) {
                // plus sign means converting to number.
                this.createSprite(+entityId, displayableData);
            }

        }

    }

}

export = RenderingProcessor;

