/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />

var assemblage: Component.Assemblage = 
{
    name: "starport",
    description: "The Starport produces aircraft and vehicles. Upgrade the Starport to develop more advanced aircraft and vehicles.",
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
            sprite: 'starport'
        },
        Position: {
            x: 300,
            y: 200
        },
        AnimationSet: {
            setName: 'starport'
        },
        Type : {
            type:"starport"
        },
        Animation: {
            animationName: "opening",
            initialized:false
        },
        State: {
            stateName: "open"
        }
    }
};



export = assemblage;
