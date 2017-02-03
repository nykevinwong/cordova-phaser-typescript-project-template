define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var assemblage = {
        name: "wraith",
        description: "The wraith can attack air force with a stronger weapon.",
        components: [
            'Displayable',
            'Position',
            'Animation',
            'AnimationSet',
            'Group',
            'Selectable',
            "Type",
            "HealthPoint",
            "State",
            "Direction",
            "Orders"
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
                direction: 3,
            },
            Orders: {
                type: "float",
                target: null
            }
        }
    };
    return assemblage;
});
