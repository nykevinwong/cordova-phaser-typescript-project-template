/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

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
        var assemblages = this.manager.getAssemblages();

        for (var key in assemblages) {
            var assemblage = assemblages[key];

            if (assemblage.name == name) {
                return assemblage.description;
            }
        }

        return "";
    }


    update(deltaTime: number): void {
        var oldstyle = {
                font: "12px Arial",
                fill: "#FFFFE0",
                align: "left",
            backgroundColor: 'rgba(0,0,0,0.8)'
            };
        var style  : Phaser.PhaserTextStyle = { font: "12px Arial Black", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" ,
         backgroundColor: 'rgba(100,100,0,1)'
    };

         
        if (this.isDitry) {
            this.text= this.game.add.text(0, 0, "", style );
            this.text.visible = false;
           // this.text.anchor.x = 0.5;
         //   this.text.anchor.y = 0.5;
            this.text.lineSpacing = 1;
            this.text.wordWrap = true;
            this.text.wordWrapWidth = this.game.width;
  this.text.stroke = '#000000';
    this.text.strokeThickness = 3;
            this.text.fixedToCamera = true
            /*
            this.text.x = this.game.world.centerX;    
            this.text.y = this.game.world.centerY;    
            */
           // this.text.setTextBounds(100, 0, this.game.width-100, this.game.height);

            this.createSelectableEventHandler();

             this.game.input.onDown.add(function () {
            this.visible = false;
             }, this.text);

        }
        else {
            var selectableStates: Component.SelectableState[] = this.manager.getComponentsData('Selectable');

            for (var entityId in selectableStates) {
                var selectableState: Component.SelectableState = selectableStates[entityId];

                // enable for one selection only
                if (selectableState.selected &&
                    this.manager.entityHasComponent(+entityId, 'Type')) {
                    var typeState: Component.TypeState = this.manager.getComponentDataForEntity('Type', +entityId);
                    var description : string = this.getDescription(typeState.type)

                    if(this.manager.entityHasComponent(+entityId, 'State'))
                    {
                        var stateState : Component.StateState = this.manager.getComponentDataForEntity('State', +entityId);
                        description += " currentState:" + stateState.stateName;
                    }

                    this.text.setText(description);
                    this.text.visible = true;
                    break;
                }
            }

        }

    }


}

export = SelectableProcessor;