/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class AnimationProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;

    constructor(manager: EntityManager, game: Phaser.Game, target:any) {
        this.manager = manager;
    
      
    }

    update(deltaTime: number): void {


    }
}

export = AnimationProcessor;