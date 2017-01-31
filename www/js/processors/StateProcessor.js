define(["require", "exports", "settings/GameStaticData", "utils/Utils"], function (require, exports, GameStaticData, Utils) {
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
                                this.manager.removeEntity(entityId + "");
                                sprite.kill();
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
        StateProcessor.prototype.processAircraftState = function (entityStaticData, entityId, state, sprite) {
            var directionState = this.manager.getComponentDataForEntity("Direction", entityId);
            switch (state.stateName) {
                case "fly":
                    {
                        var direction = Utils.Navigation.wrapDirection(Math.round(directionState.direction), entityStaticData.directions);
                        var flyAnimationName = "fly-" + direction;
                        if (sprite.animations.currentAnim.name != flyAnimationName) {
                            this.manager.updateComponentDataForEntity("Animation", entityId, { animationName: flyAnimationName, initialized: false });
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
            switch (entityStaticData.type) {
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
        };
        StateProcessor.prototype.update = function (deltaTime) {
            this.processStates();
        };
        return StateProcessor;
    }());
    return StateProcessor;
});
