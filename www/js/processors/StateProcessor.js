define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var StateProcessor = (function () {
        function StateProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
        }
        StateProcessor.prototype.processStates = function () {
            var States = this.manager.getComponentsData('State');
            for (var entityId in States) {
                var state = States[entityId];
                this.processState(+entityId, state);
            }
        };
        StateProcessor.prototype.setStateName = function (entityId, name) {
            this.manager.updateComponentDataForEntity("State", entityId, { stateName: name });
        };
        StateProcessor.prototype.processState = function (entityId, state) {
            var typeState = this.manager.getComponentDataForEntity("State", entityId);
            var entityStaticData = GameStaticData(typeState.type);
            var displayableState = this.manager.getComponentDataForEntity("Displayable", entityId);
            var sprite = displayableState.spriteReference;
            switch (state.stateName) {
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
                        if (sprite.animations.currentAnim.isFinished) {
                            this.setStateName(entityId, "stand");
                            this.manager.updateComponentDataForEntity("Animation", entityId, { animationName: "healthy", initialized: false });
                        }
                        return;
                    }
                case "open":
                    {
                        if (sprite.animations.currentAnim.isFinished) {
                            this.setStateName(entityId, "close");
                            this.manager.updateComponentDataForEntity("Animation", entityId, { animationName: "closing", initialized: false });
                        }
                        return;
                    }
                case "deploy":
                    {
                        if (sprite.animations.currentAnim.isFinished) {
                            this.setStateName(entityId, "stand");
                            this.manager.updateComponentDataForEntity("Animation", entityId, { animationName: "healthy", initialized: false });
                        }
                        return;
                    }
                default:
                    {
                        return;
                    }
            }
        };
        StateProcessor.prototype.update = function (deltaTime) {
            this.processStates();
        };
        return StateProcessor;
    }());
    return StateProcessor;
});
