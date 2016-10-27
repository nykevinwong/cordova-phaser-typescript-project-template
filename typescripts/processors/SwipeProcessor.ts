/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
/// <reference path="../definitions/phaser-swipe.d.ts" />
import Swipe = require("utils/Swipe");

class SwipeProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private swipe: Swipe;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.swipe = new Swipe(this.game);
    }

    update(deltaTime: number): void {

        // in update
        var direction = this.swipe.check();
        var speed = 4000 * (1 / deltaTime);

        if (direction !== null) {
            // direction= { x: x, y: y, direction: direction }
            switch (direction.direction) {
                case this.swipe.DIRECTION_LEFT: // do something
                    this.game.camera.x += speed;
                    break;
                case this.swipe.DIRECTION_RIGHT:
                    this.game.camera.x -= speed;
                    break;
                case this.swipe.DIRECTION_UP:
                    this.game.camera.y += speed;
                    break;
                case this.swipe.DIRECTION_DOWN:
                    this.game.camera.y -= speed;
                    break;
            }
        }

    }

}

export = SwipeProcessor;