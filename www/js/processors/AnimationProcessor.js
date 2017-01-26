define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var AnimationProcessor = (function () {
        function AnimationProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.isAnimationSetDirty = true;
            this.isDitry = true;
        }
        AnimationProcessor.prototype.loadAnimationSet = function () {
            var animationSetStates = this.manager.getComponentsData('AnimationSet');
            var displayables = this.manager.getComponentsData('Displayable');
            var types = this.manager.getComponentsData('Type');
            var animationLoaded = 0;
            var count = 0;
            for (var entityId in animationSetStates) {
                var animationSetState = animationSetStates[entityId];
                var displayableState = displayables[entityId];
                var typeState = types[entityId];
                count++;
                if (animationSetState.loaded) {
                    animationLoaded++;
                    continue;
                }
                var sprite = displayableState.spriteReference;
                var json = GameStaticData(typeState.type);
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
                this.isAnimationSetDirty = false;
            }
        };
        AnimationProcessor.prototype.updateAnimation = function () {
            var animationStates = this.manager.getComponentsData('Animation');
            var displayables = this.manager.getComponentsData('Displayable');
            var count = 0;
            for (var entityId in animationStates) {
                var animationState = animationStates[entityId];
                if (animationState.animationName != null) {
                    if (animationState.initialized == null || animationState.initialized == false) {
                        var displayableState = displayables[entityId];
                        if (displayableState.spriteReference != null) {
                            var sprite = displayableState.spriteReference;
                            sprite.animations.play(animationState.animationName);
                            console.log("AnimationProcessor-AnimationComponent[" + entityId + "," + displayableState.sprite + "]: INITIALZIED. ");
                            count++;
                        }
                        else {
                            console.log("AnimationProcessor-AnimationComponent[" + entityId + "] has no sprite Refernce from Displayable.");
                            console.log(displayableState);
                        }
                        animationState.initialized = true;
                        this.manager.updateComponentDataForEntity("Animation", +entityId, animationState);
                        console.log(animationState);
                    }
                }
                else {
                    console.log("AnimationProcessor-AnimationComponent[" + entityId + "] has no animationName from Animation.");
                    console.log(animationState);
                    count++;
                }
            }
        };
        AnimationProcessor.prototype.update = function (deltaTime) {
            if (this.isAnimationSetDirty)
                this.loadAnimationSet();
            if (this.isDitry) {
                this.updateAnimation();
            }
        };
        return AnimationProcessor;
    }());
    return AnimationProcessor;
});
