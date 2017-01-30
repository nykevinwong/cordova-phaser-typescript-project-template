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
        StateProcessor.prototype.processBuildingState = function (entityStaticData, entityId, state, sprite) {
            switch (state.stateName) {
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
        StateProcessor.prototype.processState = function (entityId, state) {
            var typeState = this.manager.getComponentDataForEntity("Type", entityId);
            var entityStaticData = GameStaticData(typeState.type);
            var displayableState = this.manager.getComponentDataForEntity("Displayable", entityId);
            var sprite = displayableState.spriteReference;
            switch (state.stateName) {
                case "stand":
                    {
                        if (this.manager.entityHasComponent(entityId, "HealthPoint")) {
                            var hpState = this.manager.getComponentDataForEntity("HealthPoint", entityId);
                            var lifeCode = "healthy";
                            if (hpState.hp > entityStaticData.hitPoints * 0.4) {
                                lifeCode = "healthy";
                                if (sprite.animations.currentAnim.name != "healthy") {
                                    this.manager.updateComponentDataForEntity("Animation", entityId, { animationName: "healthy", initialized: false });
                                }
                            }
                            else if (hpState.hp <= 0) {
                                lifeCode = "dead";
                                return;
                            }
                            else {
                                lifeCode = "damaged";
                                if (sprite.animations.currentAnim.name != "damaged") {
                                    this.manager.updateComponentDataForEntity("Animation", entityId, { animationName: "damaged", initialized: false });
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
        };
        StateProcessor.prototype.update = function (deltaTime) {
            this.processStates();
        };
        return StateProcessor;
    }());
    return StateProcessor;
});
