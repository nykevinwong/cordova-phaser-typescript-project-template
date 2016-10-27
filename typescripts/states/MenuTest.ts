/// <reference path="../definitions/phaser.d.ts" />

import SlickUI = require("slick-ui")

class MenuTest extends Phaser.State {
    private slickUI: any;
    constructor() {
        super();
    }

    
    init() {
       SlickUI.setGame(this.game); // late binding to the game.
    }

    preload() {
        this.slickUI = this.game.plugins.add(Phaser.Plugin.SlickUI);
        this.game.load.image('menu-button', 'assets/ui/menu.png');
        this.game.load.image('backdrop', 'assets/backdrop.png');
        this.slickUI.load('assets/ui/kenney/kenney.json');
    }
    
    create() {
        var game = this.game;

        var panel = new SlickUI.Element.Panel(game.width*0.05,game.height*0.05, game.width*0.9, game.height*0.9);        

        this.slickUI.add(panel);
        var button = new SlickUI.Element.Button(0,0, 140, 80);
        button.add(new SlickUI.Element.Text(0,0, "Save game")).center();        
        button.x = panel.width - button.width;
        button.visible = true;
        panel.add(button).events.onInputUp.add(function () {
            console.log('Clicked save game');
        });
    }

    create2() {
        var game = this.game;
        this.game.add.sprite(0,-125,'backdrop');
        var button, panel, menuButton;
        this.slickUI.add(panel = new SlickUI.Element.Panel(this.game.width - 156, 8, 150, this.game.height - 16));
        panel.add(new SlickUI.Element.Text(10,0, "Menu")).centerHorizontally().text.alpha = 0.5;
        panel.add(button = new SlickUI.Element.Button(0,this.game.height - 166, 140, 80)).events.onInputUp.add(function () {
            console.log('Clicked save game');
        });

        button.add(new SlickUI.Element.Text(0,0, "Save game")).center();

        panel.add(button = new SlickUI.Element.Button(0,this.game.height - 76, 140, 40));
        button.add(new SlickUI.Element.Text(0,0, "Close")).center();

        panel.visible = false;
        var basePosition = panel.x;

        this.slickUI.add(menuButton = new SlickUI.Element.DisplayObject(this.game.width - 45, 8, this.game.make.sprite(0, 0, 'menu-button')));

        menuButton.slickUI = this.slickUI;
        menuButton.inputEnabled = true;
        menuButton.input.useHandCursor = true;
        menuButton.events.onInputDown.add(function () {
            if(panel.visible) {
                return;
            }
            panel.visible = true;
            panel.x = basePosition + 156;
            game.add.tween(panel).to( {x: basePosition}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                menuButton.visible = false;
            });
            this.slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
        }, this);

        button.events.onInputUp.add(function () {
            game.add.tween(panel).to( {x: basePosition + 156}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                panel.visible = false;
                panel.x -= 156;
            });
            menuButton.visible = true;
        });



        /*
        cb1.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb2.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb1.checked = true;
            }
        }, this);

        panel.add(cb2 = new SlickUI.Element.Checkbox(50,100, SlickUI.Element.Checkbox.TYPE_RADIO));
        cb2.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb1.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb2.checked = true;
            }
        }, this);

        panel.add(new SlickUI.Element.Checkbox(100,100));
        */
    }


}
 
export = MenuTest;