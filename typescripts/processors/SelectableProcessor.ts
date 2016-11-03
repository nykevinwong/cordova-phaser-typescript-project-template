/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />
import BaseAssemblage = require("assemblages/buildings/Base")
import StarPortAssemblage = require("assemblages/buildings/StarPort")
import HarvesterAssemblage = require("assemblages/buildings/Harvester")

class SelectableProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private isDitry: boolean;
    private text: Phaser.Text;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.isDitry = true;
    }

    createSelectableEventHandler() {
        var selectableStates: Component.SelectableState[] = this.manager.getComponentsData('Selectable');

        for (var entityId in selectableStates) {
            var selectableState: Component.SelectableState = selectableStates[entityId];

            if (this.manager.entityHasComponent(+entityId, 'Displayable')) {
                var displayableState: Component.DisplayableState = this.manager.getComponentDataForEntity('Displayable', +entityId);
                var sprite: Phaser.Sprite = displayableState.spriteReference;

                sprite.events.onInputDown.add(function () {
                    var state: Component.SelectableState = this.state;
                    state.selected = !state.selected;
                    this.sprite.tint = 0xffff00; // enable tint with specified color 

                }, { state: selectableState, sprite: sprite });
            }
        }

        this.game.input.onDown.add(function () {

            var selectableStates: Component.SelectableState[] = this.getComponentsData('Selectable');

            for (var entityId in selectableStates) {
                var selectableState: Component.SelectableState = selectableStates[entityId];

                selectableState.selected = false;

                if (this.entityHasComponent(+entityId, 'Displayable')) {
                    var displayableState: Component.DisplayableState = this.getComponentDataForEntity('Displayable', +entityId);
                    var sprite: Phaser.Sprite = displayableState.spriteReference;
                    sprite.tint = 0xffffff; // remove tint 
                }
            }

        }, this.manager);

        this.isDitry = false;
    }

    getDescription(name: string): string {
        var assemblages = [BaseAssemblage, StarPortAssemblage, HarvesterAssemblage];

        for (var key in assemblages) {
            var assemblage = assemblages[key];

            if (assemblage.name == name) {
                return assemblage.description;
            }
        }

        return "";
    }


    update(deltaTime: number): void {

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
            var selectableStates: Component.SelectableState[] = this.manager.getComponentsData('Selectable');

            for (var entityId in selectableStates) {
                var selectableState: Component.SelectableState = selectableStates[entityId];

                if (selectableState.selected &&
                    this.manager.entityHasComponent(+entityId, 'Type')) {
                    var typeState: Component.TypeState = this.manager.getComponentDataForEntity('Type', +entityId);
                    var description : string = this.getDescription(typeState.type)
                    this.text.setText(description);
                    break;
                }
            }

        }

    }


}

export = SelectableProcessor;