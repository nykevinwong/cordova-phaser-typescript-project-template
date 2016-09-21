/// <reference path="../definitions/phaser.d.ts" />
/// <reference path="../components/EntityManager.d.ts" />

import EntityManager=  require("components/EntityManager");
import RenderingProcessor = require("processors/RenderingProcessor");
import SoundProcessor = require("processors/SoundProcessor");
import Displayable = require("components/Displayable");
import Position =  require("components/Position");
import Anchor = require("components/Anchor");
import Sound = require("components/Sound");
import Rope = require("components/Rope");

// how to use entity-system.js => https://entity-system-js.readthedocs.io/en/latest/#entity-system-for-javascript
// entity-system.js API => https://entity-system-js.readthedocs.io/en/latest/api/
// a complete game example using entity-system.js => https://github.com/adngdb/nth
class Title extends Phaser.State {

    private manager: EntityManager;
    private soundProcessor: SoundProcessor;
    private rope;
    constructor() {
        super();
    }

    init() {
       this.manager = new EntityManager()
        // set up entity manager with creatable component list.
        var components = [Displayable, Position, Anchor, Sound, Rope];
        for (var i = components.length - 1; i >= 0; i--) {
                this.manager.addComponent(components[i].name, components[i]);
        }


        this.soundProcessor = new SoundProcessor(this.manager, this.game);
        this.manager.addProcessor(this.soundProcessor);
        this.manager.addProcessor(new RenderingProcessor(this.manager, this.game))
    }

     end() {
            this.soundProcessor.stopAll();
     }
    
    create() {

       // Create ambiance music. 
            var sound = this.manager.createEntity(['Sound']);
            this.manager.updateComponentDataForEntity('Sound', sound, {
                source: 'algorithmicMusic',
                loop: true,
            });


           var data = [
                {
                    sprite: 'gameTitle',
                    x: this.world.centerX,
                    y: this.world.centerY
                }];

            for (var i = 0; i < data.length; i++) {
                var entity = this.manager.createEntity(['Position', 'Displayable','Anchor','Rope']);
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