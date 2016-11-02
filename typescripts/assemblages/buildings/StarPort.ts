/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />

var assemblage: Component.Assemblage = 
{
    name: "starport",
    description: "Starport produces aircrafit or vehicle. ",
    components: [
        'Displayable',
        'Position',
        'DragDrop',
        'Animation',
        'AnimationSet',
        'Group'
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



export = assemblage;
