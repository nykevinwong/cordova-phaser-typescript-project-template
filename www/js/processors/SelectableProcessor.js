define(["require", "exports"], function (require, exports) {
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
                        var text = this.text;
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
        SelectableProcessor.prototype.update = function (deltaTime) {
            if (this.isDitry) {
                this.createSelectableEventHandler();
            }
        };
        return SelectableProcessor;
    }());
    return SelectableProcessor;
});
