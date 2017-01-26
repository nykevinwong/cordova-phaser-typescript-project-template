/// <reference path="../../components/EntityManager.d.ts" />
/// <reference path="../../components/Component.d.ts" />
import GameStaticData = require("settings/GameStaticData");

var assemblage: Component.Assemblage =
    {
        name: "base",
        description: "If your Base is destroyed, the attacking rival wins the fight and can steal your resoruces. Upgrading the Base unlock new buildings and upgrades. ",
        components: [
            'Displayable',
            'Position',
            'DragDrop',
    //        'Animation',
            'AnimationSet',
            'Group',
            'Selectable',
            "Type",
            'HealthPoint'
        ],
        initialState: {
            Displayable: {
                sprite: 'base' // load texture name
            },
            Position: {
                x: 300,
                y: 200
            },
            AnimationSet: {
                setName: 'base'
            },
            Type: {
                type: GameStaticData("base").type
            },
            HealthPoint: {
                hp: GameStaticData("base").hitPoints               
            }            
        }
    };

export = assemblage;
