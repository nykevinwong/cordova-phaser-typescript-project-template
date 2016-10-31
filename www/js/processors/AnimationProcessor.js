define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var AnimationProcessor = (function () {
        function AnimationProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.isDirty = true;
        }
        AnimationProcessor.prototype.loadAnimationSet = function () {
            var animationSetStates = this.manager.getComponentsData('AnimationSet');
            var displayables = this.manager.getComponentsData('Displayable');
            var animationLoaded = 0;
            var count = 0;
            for (var entityId in animationSetStates) {
                var animationSetState = animationSetStates[entityId];
                var displayableState = displayables[entityId];
                count++;
                if (animationSetState.loaded) {
                    animationLoaded++;
                    continue;
                }
                var sprite = displayableState.spriteReference;
                var json = GameStaticData(animationSetState.setName);
                if (sprite != null && json != null) {
                    var animations = json.animations;
                    for (var i = 0; i < animations.length; i++) {
                        var animation = animations[i];
                        sprite.animations.add(animation.name, animation.frames, animation.framePerSecond, animation.loop);
                    }
                    sprite.animations.play(json.defaultAnimation);
                    animationSetState.loaded = true;
                    animationLoaded++;
                }
            }
            if (count == animationLoaded) {
                console.log("ALL AnimationProcessor-AnimationSet are INTIALIZED.");
                this.isDirty = false;
            }
        };
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
            if (this.isDirty)
                this.loadAnimationSet();
        };
        return AnimationProcessor;
    }());
    return AnimationProcessor;
});
