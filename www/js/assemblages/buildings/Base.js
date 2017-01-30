define(["require", "exports", "settings/GameStaticData"], function (require, exports, GameStaticData) {
    "use strict";
    var assemblage = {
        name: "base",
        description: "If your Base is destroyed, the attacking rival wins the fight and can steal your resoruces. Upgrading the Base unlock new buildings and upgrades. ",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'Animation',
            'AnimationSet',
            'Group',
            'Selectable',
            "Type",
            'HealthPoint',
            "State"
        ],
        initialState: {
            Displayable: {
                sprite: 'base'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'base'
            },
            Animation: {
                animationName: "healthy",
                initialized: false
            },
            Type: {
                type: "base",
            },
            HealthPoint: {
                hp: GameStaticData("base").hitPoints
            },
            State: {
                stateName: "stand"
            }
        }
    };
    return assemblage;
});
