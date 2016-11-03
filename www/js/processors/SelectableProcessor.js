define(["require", "exports", "assemblages/buildings/Base", "assemblages/buildings/StarPort", "assemblages/buildings/Harvester"], function (require, exports, BaseAssemblage, StarPortAssemblage, HarvesterAssemblage) {
    "use strict";
    var SelectableProcessor = (function () {
        function SelectableProcessor(manager, game) {
            this.manager = manager;
            this.game = game;
            this.isDitry = true;
        }
        SelectableProcessor.prototype.createSelectableEventHandler = function () {
            var selectableStates = this.manager.getComponentsData('Selectable');
            for (var entityId in selectableStates) {
                var selectableState = selectableStates[entityId];
                if (this.manager.entityHasComponent(+entityId, 'Displayable')) {
                    var displayableState = this.manager.getComponentDataForEntity('Displayable', +entityId);
                    var sprite = displayableState.spriteReference;
                    sprite.events.onInputDown.add(function () {
                        var state = this.state;
                        state.selected = !state.selected;
                        this.sprite.tint = 0xffff00;
                    }, { state: selectableState, sprite: sprite });
                }
            }
            this.game.input.onDown.add(function () {
                var selectableStates = this.getComponentsData('Selectable');
                for (var entityId in selectableStates) {
                    var selectableState = selectableStates[entityId];
                    selectableState.selected = false;
                    if (this.entityHasComponent(+entityId, 'Displayable')) {
                        var displayableState = this.getComponentDataForEntity('Displayable', +entityId);
                        var sprite = displayableState.spriteReference;
                        sprite.tint = 0xffffff;
                    }
                }
            }, this.manager);
            this.isDitry = false;
        };
        SelectableProcessor.prototype.getDescription = function (name) {
            var assemblages = [BaseAssemblage, StarPortAssemblage, HarvesterAssemblage];
            for (var key in assemblages) {
                var assemblage = assemblages[key];
                if (assemblage.name == name) {
                    return assemblage.description;
                }
            }
            return "";
        };
        SelectableProcessor.prototype.update = function (deltaTime) {
            if (this.isDitry) {
                this.text = this.game.add.text(300, 32, "", {
                    font: "12px Arial",
                    fill: "#FFFFE0",
                    align: "left",
                    backgroundColor: 'rgba(0,0,0,0.8)'
                });
                this.text.lineSpacing = 1;
                this.createSelectableEventHandler();
            }
            else {
                var selectableStates = this.manager.getComponentsData('Selectable');
                for (var entityId in selectableStates) {
                    var selectableState = selectableStates[entityId];
                    if (selectableState.selected &&
                        this.manager.entityHasComponent(+entityId, 'Type')) {
                        var typeState = this.manager.getComponentDataForEntity('Type', +entityId);
                        var description = this.getDescription(typeState.type);
                        this.text.setText(description);
                        break;
                    }
                }
            }
        };
        return SelectableProcessor;
    }());
    return SelectableProcessor;
});
