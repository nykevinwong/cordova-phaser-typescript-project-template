/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class AnimationProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
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


    }
}

export = AnimationProcessor;