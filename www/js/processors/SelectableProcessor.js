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
            var assemblages = this.manager.getAssemblages();
            for (var key in assemblages) {
                var assemblage = assemblages[key];
                if (assemblage.name == name) {
                    return assemblage.description;
                }
            }
            return "";
        };
        SelectableProcessor.prototype.update = function (deltaTime) {
            var oldstyle = {
                font: "12px Arial",
                fill: "#FFFFE0",
                align: "left",
                backgroundColor: 'rgba(0,0,0,0.8)'
            };
            var style = { font: "12px Arial Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle",
                backgroundColor: 'rgba(100,100,0,1)'
            };
            if (this.isDitry) {
                this.text = this.game.add.text(0, 0, "", style);
                this.text.visible = false;
                this.text.lineSpacing = 1;
                this.text.wordWrap = true;
                this.text.wordWrapWidth = this.game.width;
                this.text.stroke = '#000000';
                this.text.strokeThickness = 3;
                this.text.fixedToCamera = true;
                this.createSelectableEventHandler();
                this.game.input.onDown.add(function () {
                    this.visible = false;
                }, this.text);
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
                        this.text.visible = true;
                        break;
                    }
                }
            }
        };
        return SelectableProcessor;
    }());
    return SelectableProcessor;
});
