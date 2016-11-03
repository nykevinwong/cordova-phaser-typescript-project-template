define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "starport",
        description: "The Starport produces aircraft or vehicles.\n Upgrade the Starport to develop more advanced aircraft or vehicles.",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'Animation',
            'AnimationSet',
            'Group',
            'Selectable',
            "Type"
        ],
        initialState: {
            Displayable: {
                sprite: 'starport'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'starport'
            },
            Type: {
                type: "starport"
            }
        }
    };
    return assemblage;
});
