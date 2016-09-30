/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

import Const = require("../settings/Constants")
import GlobalEntityManager = require("../GlobalEntityManager")
import Controls = require("../assemblages/Controls")

class InputProcessor implements EntityManager.Processor {
        manager: EntityManager;
        game: Phaser.Game;

    constructor(game:Phaser.Game) {
        this.manager = GlobalEntityManager;
        this.game = game;

        this.init();
    }

    init() {
        this.game.input.gamepad.start();

        // Create all Input entities to control the game.
        for (var key in Controls) {
            var control = Controls[key];

            this.manager.addAssemblage(control.name, control);
            this.manager.createEntityFromAssemblage(control.name);
        }
    }

    update() {
        var inputs = this.manager.getComponentsData('Input');
        for (var inputId in inputs) {
            var input = inputs[inputId];
            var padId = 'pad' + (parseInt(input.player) + 1);
            var pad = this.game.input.gamepad[padId];

            if (this.isDown(input.keys) || this.padUsed(pad, input.padButtons)) {
                // This is a trick so that `justPressed` is set to `true` only
                // when the key was not active during the last frame. This way
                // it is true only once per key stroke.
                input.justPressed = !input.active;
                input.active = true;
            }
            else {
                input.justPressed = false;
                input.active = false;
            }
        }
    }

    isDown(keys) {
        var atLeastOneKeyIsDown = false;

        var self = this;
        keys.forEach(function (element, index, array) {
            var key = Phaser.Keyboard[element];
            atLeastOneKeyIsDown = atLeastOneKeyIsDown || self.game.input.keyboard.isDown(key);
        });

        return atLeastOneKeyIsDown;
    }

    padUsed(pad, padButtons) {
        var atLeastOnePadButtonIsDown = false;

        padButtons.forEach(function (element, index, array) {
            var actionMade = false;
            switch(element) {
                case Const.gamepad.STICK_UP:
                    if (pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
                        actionMade = true;
                    }
                    break;
                case Const.gamepad.STICK_RIGHT:
                    if (pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
                        actionMade = true;
                    }
                    break;
                case Const.gamepad.STICK_DOWN:
                    if (pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
                        actionMade = true;
                    }
                    break;
                case Const.gamepad.STICK_LEFT:
                    if (pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
                        actionMade = true;
                    }
                    break;
                case Const.gamepad.BUTTON_X:
                    if (pad.isDown(Phaser.Gamepad.XBOX360_X)) {
                        actionMade = true;
                    }
                    break;
                case Const.gamepad.BUTTON_Y:
                    if (pad.isDown(Phaser.Gamepad.XBOX360_Y)) {
                        actionMade = true;
                    }
                    break;
                case Const.gamepad.BUTTON_A:
                    if (pad.isDown(Phaser.Gamepad.XBOX360_A)) {
                        actionMade = true;
                    }
                    break;
            }
            atLeastOnePadButtonIsDown = atLeastOnePadButtonIsDown || actionMade;
        });

        return atLeastOnePadButtonIsDown;
    }
}

export = InputProcessor;