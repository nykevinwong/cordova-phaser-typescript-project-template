define(["require", "exports"], function (require, exports) {
    "use strict";
    var PositionProcessor = (function () {
        function PositionProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
        }
        PositionProcessor.prototype.update = function (deltaTime) {
            var displayables = this.manager.getComponentsData('Displayable');
            for (var entityId in displayables) {
                var displayableData = displayables[entityId];
                if (displayableData.spriteReference != null) {
                    var sprite = displayableData.spriteReference;
                    var posState = this.manager.getComponentDataForEntity('Position', +entityId);
                    posState.x = sprite.x;
                    posState.y = sprite.y;
                    this.manager.updateComponentDataForEntity('Position', +entityId, posState);
                }
            }
        };
        return PositionProcessor;
    }());
    return PositionProcessor;
});
