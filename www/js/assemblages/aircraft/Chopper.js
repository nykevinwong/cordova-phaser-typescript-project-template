define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var assemblage = {
        name: "chopper",
        description: "The chopper can attack both air force and ground force.",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'Animation',
            'AnimationSet',
            'Group',
            'Selectable',
            "Type",
            "HealthPoint",
            "State",
            "Direction"
        ],
        initialState: {
            Displayable: {
                sprite: 'chopper'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'chopper'
            },
            Type: {
                type: "chopper"
            },
            Animation: {
                animationName: "fly-0",
                initialized: false
            },
            HealthPoint: {
                hp: GameStaticData("chopper").hitPoints
            },
            State: {
                stateName: "fly"
            },
            Direction: {
                direction: 1,
            }
        }
    };
    return assemblage;
});
