define(["require", "exports", "settings/GameStaticData", "utils/HealthBar"], function (require, exports, GameStaticData, HealthBar) {
    "use strict";
    var HealthBarRenderingProcessor = (function () {
        function HealthBarRenderingProcessor(manager, game) {
            this.healthBars = new Array();
            this.manager = manager;
            this.game = game;
        }
        HealthBarRenderingProcessor.prototype.update = function (deltaTime) {
            if (this.healthBars != null) {
                for (var key in this.healthBars) {
                    var bar = this.healthBars[key];
                    bar.kill();
                }
                this.healthBars = [];
            }
            var selectableStates = this.manager.getComponentsData('Selectable');
            for (var entityId in selectableStates) {
                var selectableState = selectableStates[entityId];
                if (selectableState.selected == true &&
                    this.manager.entityHasComponent(+entityId, 'HealthPoint')) {
                    var healthPointState = this.manager.getComponentDataForEntity('HealthPoint', +entityId);
                    var posState = this.manager.getComponentDataForEntity('Position', +entityId);
                    var typeState = this.manager.getComponentDataForEntity('Type', +entityId);
                    var json = GameStaticData(typeState.type);
                    var currentPrecentage = healthPointState.hp / json.hitPoints;
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
                        x: posState.x - this.game.camera.x - this.game.world.x + json.pixelWidth / 2,
                        y: posState.y - this.game.camera.y - this.game.world.y
                    };
                    var bar = new HealthBar(this.game, barConfig);
                    this.healthBars.push(bar);
                    break;
                }
            }
        };
        return HealthBarRenderingProcessor;
    }());
    return HealthBarRenderingProcessor;
});
