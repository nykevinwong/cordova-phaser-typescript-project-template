/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");

class AnimationProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private isAnimationSetDirty: boolean;
    private isDitry: boolean;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.isAnimationSetDirty = true;
        this.isDitry = true;
    }


    loadAnimationSet(): void {
        var animationSetStates: Component.AnimationSetState[] = this.manager.getComponentsData('AnimationSet');
        var displayables: Component.DisplayableState[] = this.manager.getComponentsData('Displayable');
        var types: Component.TypeState[] = this.manager.getComponentsData('Type');
        var animationLoaded: number = 0;
        var count : number = 0;

        for (var entityId in animationSetStates) {
            var animationSetState: Component.AnimationSetState = animationSetStates[entityId];
            var displayableState: Component.DisplayableState = displayables[entityId];
            var typeState: Component.TypeState = types[entityId];

            count++;

            if (animationSetState.loaded) {
                animationLoaded++;
                continue;
            }

            var sprite: Phaser.Sprite = displayableState.spriteReference;
            var json =  GameStaticData(typeState.type); // this.game.cache.getJSON(animationSetState.setName);

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
            this.isAnimationSetDirty = false;
        }

    }

    updateAnimation(): void {
        var animationStates: Component.AnimationState[] = this.manager.getComponentsData('Animation');
        var displayables: Component.DisplayableState[] = this.manager.getComponentsData('Displayable');
        var count : number = 0;

        for (var entityId in animationStates) {
            var animationState: Component.AnimationState = animationStates[entityId];

            if (animationState.animationName != null) {
                if(animationState.initialized == null || animationState.initialized == false)
                {
                    var displayableState: Component.DisplayableState = displayables[entityId];

                    if (displayableState.spriteReference != null) {
                        var sprite: Phaser.Sprite = displayableState.spriteReference;
                        sprite.animations.play(animationState.animationName);
                        console.log("AnimationProcessor-AnimationComponent[" + entityId + "," + displayableState.sprite + "]: INITIALZIED. ");
                        count++;
                    }
                    else
                    {
                        console.log("AnimationProcessor-AnimationComponent[" + entityId + "] has no sprite Refernce from Displayable.");
                        console.log(displayableState);
                    }
                    
                    animationState.initialized = true;
                    this.manager.updateComponentDataForEntity("Animation", +entityId, animationState);
                    console.log(animationState);
                }
            }
            else
            {
                console.log("AnimationProcessor-AnimationComponent[" + entityId + "] has no animationName from Animation.");
                console.log(animationState);
                count++; // animationName = null means there's no animation to update.
            }
           
        }
/*
        if(animationStates.length == count)
        {
             console.log("ALL AnimationProcessor-AnimationComponent are COMPLETED Processing.");
             this.isDitry = false;
    } */

    }

    update(deltaTime: number): void {

        if(this.isAnimationSetDirty)
            this.loadAnimationSet();

        if(this.isDitry)
        {
            this.updateAnimation();            
        }
    }
}

export = AnimationProcessor;