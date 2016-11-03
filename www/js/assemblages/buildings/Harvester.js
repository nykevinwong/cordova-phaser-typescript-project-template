define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "harvester",
        description: "Harvester building produces gold.",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'Animation',
            'AnimationSet',
            'Group',
            'Selectable'
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
            }
        }
    };
    return assemblage;
});
