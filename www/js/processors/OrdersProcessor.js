define(["require", "exports", "settings/GameStaticData", "utils/Utils"], function (require, exports, GameStaticData, Utils) {
    "use strict";
    var OrdersProcessor = (function () {
        function OrdersProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
        }
        OrdersProcessor.prototype.processOrders = function () {
            var Orderses = this.manager.getComponentsData('Orders');
            for (var entityId in Orderses) {
                var orders = Orderses[entityId];
                this.processOrder(+entityId, orders);
            }
        };
        OrdersProcessor.prototype.move = function (entityId, entityStaticData, destination) {
            var lastMovementX = 0;
            var lastMovementY = 0;
            var posState = this.manager.getComponentDataForEntity("Position", entityId);
            var directionState = this.manager.getComponentDataForEntity("Direction", entityId);
            var directions = entityStaticData.directions;
            var turnSpeed = entityStaticData.turnSpeed;
            var direction = directionState.direction;
            var speed = entityStaticData.speed;
            var turnSpeedAdjustmentFactor = 1 / 8;
            var speedAdjustmentFactor = 1 / 64;
            var newDirection = Utils.Navigation.findAngle(destination, posState, directions);
            var difference = Utils.Navigation.angleDiff(direction, newDirection, directions);
            var turnAmount = turnSpeed * turnSpeedAdjustmentFactor;
            if (Math.abs(difference) > turnAmount) {
                directionState.direction = Utils.Navigation.wrapDirection(direction + turnAmount * Math.abs(difference) / difference, directions);
                this.manager.updateComponentDataForEntity("Direction", entityId, directionState);
            }
            else {
                var movement = speed * speedAdjustmentFactor;
                var angleRadians = -(Math.round(direction) / directions) * 2 * Math.PI;
                lastMovementX = -(movement * Math.sin(angleRadians));
                lastMovementY = -(movement * Math.cos(angleRadians));
                posState.x = (posState.x + lastMovementX);
                posState.y = (posState.y + lastMovementY);
                this.manager.updateComponentDataForEntity("Position", entityId, posState);
            }
        };
        OrdersProcessor.prototype.processOrder = function (entityId, orders) {
            var typeState = this.manager.getComponentDataForEntity("Type", entityId);
            var entityStaticData = GameStaticData(typeState.type);
            switch (orders.type) {
                case "float":
                    {
                    }
                    return;
                case "move":
                    {
                        var posState = this.manager.getComponentDataForEntity("Position", entityId);
                        var target = { x: 500, y: 300 };
                        var radius = entityStaticData.radius;
                        if (Utils.Navigation.isInSourceRadius(posState, target, radius, 20)) {
                            orders.type = "float";
                        }
                        else {
                            this.move(entityId, entityStaticData, target);
                        }
                    }
                    return;
                default:
                    {
                    }
                    return;
            }
        };
        OrdersProcessor.prototype.update = function (deltaTime) {
            this.processOrders();
        };
        return OrdersProcessor;
    }());
    return OrdersProcessor;
});
