/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");

class AnimationProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private isDirty: boolean;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.isDirty = true;
    }


    loadAnimationSet(): void {
        var animationSetStates: Component.AnimationSetState[] = this.manager.getComponentsData('AnimationSet');
        var displayables: Component.DisplayableState[] = this.manager.getComponentsData('Displayable');
        var animationLoaded: number = 0;
        var count : number = 0;

        for (var entityId in animationSetStates) {
            var animationSetState: Component.AnimationSetState = animationSetStates[entityId];
            var displayableState: Component.DisplayableState = displayables[entityId];
            count++;

            if (animationSetState.loaded) {
                animationLoaded++;
                continue;
            }

            var sprite: Phaser.Sprite = displayableState.spriteReference;
                var json =  GameStaticData(animationSetState.setName); // this.game.cache.getJSON(animationSetState.setName);

            if (sprite != null && json != null) {
                var animations = json.animations;

                for (var i = 0; i < animations.length; i++) {
                    var animation = animations[i];
                    sprite.animations.add(animation.name,
                        animation.frames,
                        animation.framePerSecond,
                        animation.loop);
                }

                sprite.animations.play(json.defaultAnimation);
                animationSetState.loaded = true;
                animationLoaded++;
            }
        }

        if(count == animationLoaded)
        {
            console.log("ALL AnimationProcessor-AnimationSet are INTIALIZED.");
            this.isDirty = false;
        }

    }

    createAnimation(): void {
        var animationStates: Component.AnimationState[] = this.manager.getComponentsData('Animation');
        var displayables: Component.DisplayableState[] = this.manager.getComponentsData('Displayable');

        for (var entityId in animationStates) {
            var animationState: Component.AnimationState = animationStates[entityId];
            var displayableState: Component.DisplayableState = displayables[entityId];

            if (animationState.animationName != null) {
                if (displayableState.spriteReference != null) {

                    console.log("AnimationProcessor-AnimationComponent[" + entityId + "," + displayableState.sprite + "]: INITIALZIED. ");
                    console.log(animationState);

                }

            }

        }
    }

    update(deltaTime: number): void {

        if(this.isDirty)
            this.loadAnimationSet();
    }
}

export = AnimationProcessor;