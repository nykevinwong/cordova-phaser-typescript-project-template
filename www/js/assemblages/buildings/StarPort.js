define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "starport",
        description: "Base building ",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'Animation',
            'AnimationSet'
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
