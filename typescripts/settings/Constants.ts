
interface Inputs {
        JUMP: string,
        LEFT: string,
        DOWN: string,
        RIGHT: string,
        ACTION1: string,
        ACTION2: string
}

interface GamePad {
        STICK_UP: string,
        STICK_RIGHT: string,
        STICK_DOWN: string,
        STICK_LEFT: string,
        BUTTON_X: string,
        BUTTON_Y: string,
        BUTTON_A: string    
}

interface GameSettings 
{
        GAMES_TO_WIN: number;
        NUMBER_OF_MAPS: number;
        DURATION: number;
}

class GlobalConstants
{
    DEBUG: boolean = false;
    game: GameSettings = { // any arbitary game condition you defined.        
        GAMES_TO_WIN: 2,
        NUMBER_OF_MAPS: 5,
        DURATION: 30000,
    };
    inputs: Inputs = {
        JUMP: 'jump',
        LEFT: 'left',
        DOWN: 'down',
        RIGHT: 'right',
        ACTION1: 'action1',
        ACTION2: 'action2'
    };

    gamepad: GamePad = {
        STICK_UP: 'stickup',
        STICK_RIGHT: 'stickright',
        STICK_DOWN: 'stickdown',
        STICK_LEFT: 'stickleft',
        BUTTON_X: 'button_x',
        BUTTON_Y: 'button_y',
        BUTTON_A: 'button_a'
    };

}

var Constants: GlobalConstants = new GlobalConstants();

export = Constants;
