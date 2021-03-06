/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import GameStaticData = require("settings/GameStaticData");
import Utils =  require("utils/Utils");

class OrdersProcessor implements EntityManager.Processor {
    private manager: EntityManager;
    private game: Phaser.Game;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;

        this.init();
    }

    init(): void {
        this.game.input.onDown.add(function (){

            var selectableStates: Component.SelectableState[] = this.manager.getComponentsData('Selectable');

            for (var entityId in selectableStates) {
                var selectableState: Component.SelectableState = selectableStates[entityId];

                // enable for one selection only
                if (selectableState.selected &&
                    this.manager.entityHasComponent(+entityId, 'Orders')) {
                    var orders: Component.OrdersState = this.manager.getComponentDataForEntity("Orders",+entityId);      
                    orders.type = "move";
                    var x1 = this.game.input.x;
                    var y1 = this.game.input.y;
                    orders.target = {x: x1, y: y1};
                    this.manager.updateComponentDataForEntity("Orders",entityId, orders);
                }
            }

        },this);
    }

    processOrders(): void {
        var Orderses: Component.OrdersState[] = this.manager.getComponentsData('Orders');

        for (var entityId in Orderses) {
            var orders: Component.OrdersState = Orderses[entityId];
            this.processOrder(+entityId, orders);
        }
        
    }

    move(entityId:number,  entityStaticData, destination): void{
        var lastMovementX: number  = 0;
        var lastMovementY: number  = 0;
        var posState : Component.PositionState = this.manager.getComponentDataForEntity("Position",entityId);
        var directionState : Component.DirectionState = this.manager.getComponentDataForEntity("Direction",entityId);
        var directions: number  = entityStaticData.directions;
        var turnSpeed: number  =  entityStaticData.turnSpeed;
        var direction: number  = directionState.direction;
        var speed: number  = entityStaticData.speed;
        var turnSpeedAdjustmentFactor: number = 1/8;
        var speedAdjustmentFactor: number  = 1/64;

            // Find out where we need to turn to get to destination
			var newDirection: number = Utils.Navigation.findAngle(destination,posState,directions);
			// Calculate difference between new direction and current direction
			var difference = Utils.Navigation.angleDiff(direction,newDirection,directions);
			// Calculate amount that aircraft can turn per animation cycle
			var turnAmount = turnSpeed*turnSpeedAdjustmentFactor;
			if (Math.abs(difference)>turnAmount){
				directionState.direction = Utils.Navigation.wrapDirection(direction+turnAmount*Math.abs(difference)/difference,directions);
                this.manager.updateComponentDataForEntity("Direction",entityId, directionState);
			} else {
				var movement = speed*speedAdjustmentFactor;
				var angleRadians = -(Math.round(direction)/directions)*2*Math.PI ;               
				lastMovementX = - (movement*Math.sin(angleRadians));
				lastMovementY = - (movement*Math.cos(angleRadians));            
				posState.x = (posState.x +lastMovementX);
				posState.y = (posState.y +lastMovementY);
                this.manager.updateComponentDataForEntity("Position", entityId, posState);
			}
            
    }



    processOrder(entityId: number, orders: Component.OrdersState): void {
        var typeState: Component.TypeState = this.manager.getComponentDataForEntity("Type", entityId);
        var entityStaticData = GameStaticData(typeState.type); 

        switch(orders.type)
        {
            case "float":
            {
                // do nothing
            } return;
            case "move":
            {
                var posState : Component.PositionState = this.manager.getComponentDataForEntity("Position",entityId);
                var target =  orders.target;
                var radius:number = entityStaticData.radius;
                
                if(Utils.Navigation.isInSourceRadius(posState, target, radius ,20 ) ) 
                {
                    orders.type = "float";
                    orders.target = null;
                } 
                else 
                {
                    this.move(entityId,entityStaticData,  target);
                }

            } return;
            default:
            {

            } return;
        }

    }

 

    update(deltaTime: number): void {
        this.processOrders();
    }
}

export = OrdersProcessor;