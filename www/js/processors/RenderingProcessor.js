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
            var sprite = this.game.add.sprite(posData.x, posData.y, displayableData.sprite);
            sprite.anchor.x = anchorData.x;
            sprite.anchor.y = anchorData.y;
            this.sprites[entityId] = sprite;
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
