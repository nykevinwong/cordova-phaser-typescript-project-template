/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
/// <reference path="../definitions/phaser-swipe.d.ts" />

class SwipeProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private kineticScrolling:any;

    constructor(manager: EntityManager, game: Phaser.Game, target:any) {
        this.manager = manager;
        this.game = game;
        this.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        this.kineticScrolling.configure({
            kineticMovement: false,
            timeConstantScroll: 325, //really mimic iOS
            horizontalScroll: true,
            verticalScroll: true,
            horizontalWheel: false,
            verticalWheel: false,
            deltaWheel: 40,
            taget: target
        });

        this.startKineticScrolling();
      
    }

    startKineticScrolling()
    {
        this.kineticScrolling.start();
    }

    stopKineticScrolling()
    {
        this.kineticScrolling.stop();
    }

    update(deltaTime: number): void {


    }
}

export = SwipeProcessor;