define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "starport",
        description: "Starport produces aircrafit or vehicle. ",
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
                sprite: 'starport'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'starport'
            }
        }
    };
    return assemblage;
});
