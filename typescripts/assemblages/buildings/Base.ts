/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />

var assemblage: Component.Assemblage = 
{
    name: "base",
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
            sprite: 'base'
        },
        Position: {
            x: 300,
            y: 200
        },
        AnimationSet: {
            setName: 'base'
        }
    }
};

export = assemblage;
