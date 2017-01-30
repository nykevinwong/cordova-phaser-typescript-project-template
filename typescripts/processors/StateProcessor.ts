/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");

class StateProcessor implements EntityManager.Processor {
    private manager: EntityManager;
    private game: Phaser.Game;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
    }

    processStates(): void {
        var States: Component.StateState[] = this.manager.getComponentsData('State');

        for (var entityId in States) {
            var state: Component.StateState = States[entityId];
            this.processState(+entityId, state);
        }
        
    }

    setStateName(entityId: number, name: string)
    {
        this.manager.updateComponentDataForEntity("State", entityId, { stateName: name});
    }

    processBuildingState(entityStaticData: any, entityId, state: Component.StateState, sprite: Phaser.Sprite)
    {
        switch(state.stateName)
        {
            case "teleport":
            {
                return;
            }
            case "close":
            {
                if(sprite.animations.currentAnim.isFinished)
                {
                    this.setStateName(entityId, "stand");
                    this.manager.updateComponentDataForEntity("Animation",entityId, { animationName: "healthy", initialized:false});
                }
                return;                
            }
            case "open":
            {
                if(sprite.animations.currentAnim.isFinished)
                {
                    this.setStateName(entityId, "close");
                    this.manager.updateComponentDataForEntity("Animation",entityId, { animationName: "closing", initialized:false});
                }
                return;
            }
            case "deploy":
            {
                if(sprite.animations.currentAnim.isFinished)
                {
                    this.setStateName(entityId, "stand");
                    this.manager.updateComponentDataForEntity("Animation",entityId, { animationName: "healthy", initialized:false});
                }
                return;                
            }
            default:
            {
                // do nothing
             return;
            }
        }

    }

    processState(entityId: number, state: Component.StateState) : void {
         var typeState: Component.TypeState = this.manager.getComponentDataForEntity("Type", entityId)
         var entityStaticData =  GameStaticData(typeState.type); 
         var displayableState: Component.DisplayableState = this.manager.getComponentDataForEntity("Displayable", entityId);
         var sprite: Phaser.Sprite = displayableState.spriteReference;

        switch(state.stateName)
        {
            case "stand":
            {
                if(this.manager.entityHasComponent(entityId, "HealthPoint"))
                {

                 var hpState: Component.HealthPointState = this.manager.getComponentDataForEntity("HealthPoint", entityId);
                 var lifeCode: String = "healthy";

                    if (hpState.hp > entityStaticData.hitPoints * 0.4){
                        lifeCode = "healthy";

                        if(sprite.animations.currentAnim.name != "healthy" )
                        {
                            this.manager.updateComponentDataForEntity("Animation",entityId, { animationName: "healthy", initialized:false});
                        }

                    } else if (hpState.hp <= 0){
                        lifeCode = "dead";
                        // this.game.remove(this);
                        return;                
                    } else {
                        lifeCode = "damaged";

                        if(sprite.animations.currentAnim.name != "damaged" )
                        {
                            this.manager.updateComponentDataForEntity("Animation",entityId, { animationName: "damaged", initialized:false});
                        }
                    }
                }

                return;
            }
            default:
            {
                this.processBuildingState(entityStaticData, entityId, state, sprite);
                return;
            }
        }



    }

    update(deltaTime: number): void {
        this.processStates();
    }
}

export = StateProcessor;