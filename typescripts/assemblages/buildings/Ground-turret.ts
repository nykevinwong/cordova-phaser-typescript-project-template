/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />

var assemblage: Component.Assemblage = 
{
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
        "Type",
        "State"      
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
        Animation: {
            animationName: "healthy",
            initialized:false
        },
        Type : {
            type:"ground-turret"
        },
        State: {
            stateName: "stand"
        }
    }
};



export = assemblage;
