/// <reference path="../definitions/phaser.d.ts" />
/// <reference path="../components/EntityManager.d.ts" />

import Displayable = require("components/Displayable");
import Position =  require("components/Position");
import EntityManager=  require("components/EntityManager");
import RenderingProcessor = require("processors/RenderingProcessor");

// how to use entity-system.js => https://entity-system-js.readthedocs.io/en/latest/#entity-system-for-javascript
// entity-system.js API => https://entity-system-js.readthedocs.io/en/latest/api/
// a complete game example using entity-system.js => https://github.com/adngdb/nth
class Title extends Phaser.State {

    private manager: EntityManager = new EntityManager();

    constructor() {
        super();
    }

    init() {
        // set up entity manager with creatable component list.
        var components = [Displayable, Position];
        for (var i = components.length - 1; i >= 0; i--) {
                this.manager.addComponent(components[i].name, components[i]);
        }

        this.manager.addProcessor(new RenderingProcessor(this.manager, this.game))

    }
    
    create() {
         // Create all background sprites.
            var backgroundSprites = [
                'gameTitle',
            ];

            var data = [
                {
                    sprite: 'gameTitle',
                    x: this.world.centerX,
                    y: this.world.centerY
                }];

            for (var i = 0; i < data.length; i++) {
                var entity = this.manager.createEntity(['Position', 'Displayable']);
                var d = data[i];
                this.manager.updateComponentDataForEntity('Displayable', entity, {sprite: d.sprite});
                this.manager.updateComponentDataForEntity('Position', entity, {x: d.x, y: d.y});
            }
    }

    update (){
          this.manager.update(this.game.time.elapsed);
    }

}
 
export = Title;