define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var assemblage = {
        name: "wraith",
        description: "The wraith can attack air force with a stronger weapon.",
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
                sprite: 'wraith'
            },
            Position: {
                x: 400,
                y: 200
            },
            AnimationSet: {
                setName: 'wraith'
            },
            Type: {
                type: "wraith"
            },
            Animation: {
                animationName: "fly-0",
                initialized: false
            },
            HealthPoint: {
                hp: GameStaticData("wraith").hitPoints
            },
            State: {
                stateName: "fly"
            },
            Direction: {
                direction: 2,
            }
        }
    };
    return assemblage;
});
