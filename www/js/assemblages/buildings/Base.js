define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "base",
        description: "If your Base is destroyed, the attacking rival wins the fight and can steal your resoruces. Upgrading the Base unlock new buildings and upgrades. ",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'AnimationSet',
            'Group',
            'Selectable',
            "Type"
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
            Type: {
                type: "base"
            }
        }
    };
    return assemblage;
});
