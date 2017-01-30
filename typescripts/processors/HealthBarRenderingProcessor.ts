/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");
import HealthBar = require("utils/HealthBar");

class HealthBarRenderingProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private healthBars: HealthBar[] = new Array();

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
    }

    update(deltaTime: number): void {

         if(this.healthBars!=null)
         {
             for(var key in this.healthBars)
             {
                 var bar : HealthBar = this.healthBars[key];
                 bar.kill();
             }

             this.healthBars = [];
         }

         var selectableStates: Component.SelectableState[] = this.manager.getComponentsData('Selectable');

            for (var entityId in selectableStates) {
                var selectableState: Component.SelectableState = selectableStates[entityId];

                if (selectableState.selected == true &&
                    this.manager.entityHasComponent(+entityId, 'HealthPoint')) {
                    var healthPointState: Component.HealthPointState = this.manager.getComponentDataForEntity('HealthPoint', +entityId);
                    var posState: Component.PositionState = this.manager.getComponentDataForEntity('Position', +entityId);
                    var typeState: Component.TypeState = this.manager.getComponentDataForEntity('Type', + entityId);
                    var json  = GameStaticData(typeState.type);
                    var currentPrecentage : number = healthPointState.hp / json.hitPoints;

                    var barConfig = {
                        bg: {
                            color: '#EE0000'
                        },
                        bar: {
                            color: '#00EE00'
                        },
                        percent: currentPrecentage,
                        width: json.pixelWidth,
                        height: 6,
                        x: posState.x - this.game.camera.x - this.game.world.x+ json.pixelWidth/2 , 
                        y: posState.y - this.game.camera.y - this.game.world.y};

                        // ToDO: HealthBar Performance can be improved. background box can be a hollow box.
                    var bar: HealthBar = new HealthBar(this.game, barConfig);
                    this.healthBars.push(bar);
                    break;
                }
            }

    }
}

export = HealthBarRenderingProcessor;