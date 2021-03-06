/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");
import Utils =  require("utils/Utils");

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

    processBuildingState(entityStaticData: any, entityId: number, state: Component.StateState, sprite: Phaser.Sprite)
    {
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
                        this.manager.removeEntity(entityId+"");
                        sprite.kill();         
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

    processAircraftState(entityStaticData: any, entityId: number, state: Component.StateState, sprite: Phaser.Sprite)
    {
        var directionState:Component.DirectionState = this.manager.getComponentDataForEntity("Direction", entityId)

        switch(state.stateName)
        {
            case "fly":
            {
                var direction: number = Utils.Navigation.wrapDirection(Math.round(directionState.direction), entityStaticData.directions);
                var flyAnimationName: string = "fly-" + direction;

                 if(sprite.animations.currentAnim.name != flyAnimationName )
                 {
                     this.manager.updateComponentDataForEntity("Animation",entityId, { animationName: flyAnimationName, initialized:false});
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

         switch(entityStaticData.type)
         {
             case "building":
             {
                 this.processBuildingState(entityStaticData, entityId, state, sprite);
                 return;
             }
             case "aircraft":
             {
                 this.processAircraftState(entityStaticData, entityId, state, sprite);
                 return;
             }
             default:
             {
                 return;
             }
         }

    }

    update(deltaTime: number): void {
        this.processStates();
    }
}

export = StateProcessor;