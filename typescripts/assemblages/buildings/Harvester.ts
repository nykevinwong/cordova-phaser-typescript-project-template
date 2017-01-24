/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />

var assemblage: Component.Assemblage = 
{
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
        "Type",
        "State"                
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
            type:"harvester"
        },
        Animation: {
            animationName: "deploy",
            initialized:false
        },
        State: {
            stateName: "deploy"
        }        
    }
};

export = assemblage;
