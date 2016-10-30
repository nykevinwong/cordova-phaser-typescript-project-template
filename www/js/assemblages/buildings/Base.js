define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "base",
        description: "Base building ",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
            'Animation',
            'AnimationDataSet'
        ],
        initialState: {
            Displayable: {
                sprite: 'base'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationDataSet: {
                setName: 'base'
            }
        }
    };
    return assemblage;
});
