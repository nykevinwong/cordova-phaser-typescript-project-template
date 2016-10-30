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

export = assemblage;
