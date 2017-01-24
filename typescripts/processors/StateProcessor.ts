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

    processState(entityId: number, state: Component.StateState) : void {
         var typeState: Component.TypeState = this.manager.getComponentDataForEntity("State", entityId)
         var entityStaticData =  GameStaticData(typeState.type); 
         var displayableState: Component.DisplayableState = this.manager.getComponentDataForEntity("Displayable", entityId);
         var sprite: Phaser.Sprite = displayableState.spriteReference;

        switch(state.stateName)
        {
            case "stand":
            {
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

    update(deltaTime: number): void {
        this.processStates();
    }
}

export = StateProcessor;