define(["require", "exports"], function (require, exports) {
    "use strict";
    var AnimationProcessor = (function () {
        function AnimationProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
        }
        AnimationProcessor.prototype.createAnimation = function () {
            var animationStates = this.manager.getComponentsData('Animation');
            var displayables = this.manager.getComponentsData('Displayable');
            for (var entityId in animationStates) {
                var animationState = animationStates[entityId];
                var displayableState = displayables[entityId];
                if (animationState.animationName != null) {
                    if (displayableState.spriteReference != null) {
                        console.log("AnimationProcessor-AnimationComponent[" + entityId + "," + displayableState.sprite + "]: INITIALZIED. ");
                        console.log(animationState);
                    }
                }
            }
        };
        AnimationProcessor.prototype.update = function (deltaTime) {
        };
        return AnimationProcessor;
    }());
    return AnimationProcessor;
});
