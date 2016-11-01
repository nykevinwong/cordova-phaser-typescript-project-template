/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />

var assemblage: Component.Assemblage = 
{
    name: "harvester",
    description: "Harvester building produces gold.",
    components: [
        'Displayable',
        'Position',
        'DragDrop',
        'Animation',
        'AnimationSet'
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

export = assemblage;
