define(["require", "exports"], function (require, exports) {
    "use strict";
    var assemblage = {
        name: "ground-turret",
        description: "The ground turret can attack ground units.",
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
                sprite: 'ground-turret'
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'ground-turret'
            },
            Type: {
                type: "ground-turret"
            }
        }
    };
    return assemblage;
});
