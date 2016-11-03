define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "harvester",
        description: "Harvester buildings produce gold.",
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
                sprite: 'harvester'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'harvester'
            },
            Type: {
                type: "harvester"
            }
        }
    };
    return assemblage;
});
