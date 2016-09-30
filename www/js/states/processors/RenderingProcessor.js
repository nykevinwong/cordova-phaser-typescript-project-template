define(["require", "exports"], function (require, exports) {
    "use strict";
    var RenderingProcessor = (function () {
        function RenderingProcessor(manager, game) {
            this.sprites = new Array();
            this.manager = manager;
            this.game = game;
        }
        RenderingProcessor.prototype.createSprite = function (entityId, displayableData) {
            var posData = this.manager.getComponentDataForEntity('Position', entityId);
            var anchorData = this.manager.getComponentDataForEntity('Anchor', entityId);
            if (this.manager.entityHasComponent(entityId, "Rope")) {
                var image = this.game.cache.getImage(displayableData.sprite);
                var ropeData = this.manager.getComponentDataForEntity('Rope', entityId);
                var count = 0;
                var totalPoints = ropeData.pointCount;
                var length = (ropeData.width == 0) ? (image.width / totalPoints) : (ropeData.width / totalPoints);
                var points = [];
                for (var i = 0; i < totalPoints; i++) {
                    points.push(new Phaser.Point(i * length, 0));
                }
                var x = posData.x - image.width * anchorData.x;
                var y = posData.y - image.height * anchorData.y;
                var rope = this.game.add.rope(x, y, displayableData.sprite, null, points);
                rope.updateAnimation = function () {
                    count += 0.4 * (1 / this.game.time.elapsedMS);
                    for (var i = 0; i < this.points.length; i++) {
                        this.points[i].y = Math.sin(i * 0.5 + count) * totalPoints;
                    }
                };
                this.sprites[entityId] = rope;
            }
            else {
                var sprite = this.game.add.sprite(posData.x, posData.y, displayableData.sprite);
                sprite.anchor.x = anchorData.x;
                sprite.anchor.y = anchorData.y;
                this.sprites[entityId] = sprite;
            }
        };
        RenderingProcessor.prototype.update = function (deltaTime) {
            var displayables = this.manager.getComponentsData('Displayable');
            for (var entityId in displayables) {
                if (!this.sprites[entityId]) {
                    this.createSprite(+entityId, displayables[entityId]);
                }
            }
        };
        return RenderingProcessor;
    }());
    return RenderingProcessor;
});
