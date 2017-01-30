var GameStaticData =
    [
        {
            "name": "base",
            action: "stand",
            // Properties for drawing the object
            "pixelWidth": 55,
            "pixelHeight": 60,
            "baseWidth": 40,
            "baseHeight": 40,
            "pixelOffsetX": 0,
            "pixelOffsetY": 20,
            // Properties for describing structure for pathfinding
            "buildableGrid": [
                [1, 1],
                [1, 1]
            ],
            "passableGrid": [
                [1, 1],
                [1, 1]
            ],
            "sight": 3,
            "hitPoints": 1000,
            "cost": 5000,
            "type": "building",
            "animations": [
                {
                    "name": "healthy",
                    "frames": [0, 1, 2, 3],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "damaged",
                    "frames": [4],
                    "loop": false,
                    "framePerSecond": 10
                },
                {
                    "name": "contructing",
                    "frames": [5, 6, 7],
                    "loop": true,
                    "framePerSecond": 10
                }
            ],
            "defaultAnimation": "healthy"
        },
        {
            name: "starport",
            action: "stand",
            pixelWidth: 40,
            pixelHeight: 60,
            baseWidth: 40,
            baseHeight: 55,
            pixelOffsetX: 1,
            pixelOffsetY: 5,
            buildableGrid: [
                [1, 1],
                [1, 1],
                [1, 1]
            ],
            passableGrid: [
                [1, 1],
                [0, 0],
                [0, 0]
            ],
            sight: 3,
            cost: 2000,
            hitPoints: 300,
            "type": "building",
            "animations": [
                {
                    "name": "teleport",
                    "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    "loop": false,
                    "framePerSecond": 10
                },
                {
                    "name": "closing",
                    "frames": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                    "loop": false,
                    "framePerSecond": 10
                },
                {
                    "name": "opening",
                    "frames": [26,25,24,23,22,20,19,18,17,16,15,14,13,12,11,10,9],
                    "loop": false,
                    "framePerSecond": 10
                },
                {
                    "name": "healthy",
                    "frames": [27, 28, 29, 30],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "damaged",
                    "frames": [31],
                    "loop": false,
                    "framePerSecond": 10
                }

            ],
            "defaultAnimation": "healthy"
        },
        {
            name: "harvester",
            action: "stand",
            pixelWidth: 40,
            pixelHeight: 60,
            baseWidth: 40,
            baseHeight: 20,
            pixelOffsetX: -2,
            pixelOffsetY: 40,
            buildableGrid: [
                [1, 1]
            ],
            passableGrid: [
                [1, 1]
            ],
            sight: 3,
            cost: 5000,
            hitPoints: 300,
            "type": "building",
            "animations": [
                {
                    "name": "deploy",
                    "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                    "loop": false,
                    "framePerSecond": 10
                },
                {
                    "name": "healthy",
                    "frames": [17, 18, 19],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "damaged",
                    "frames": [20],
                    "loop": false,
                    "framePerSecond": 10
                }

            ],
            "defaultAnimation": "healthy"
        },
        {
            name: "ground-turret",
            canAttack: true,
            canTargetLand: true,
            canTargetAir: false,
            weaponType: "cannon-ball",
            action: "guard", // Default action is guard unlike other buildings
            direction: 0, // Face upward (0) by default
            directions: 8, // Total of 8 turret directions allowed (0-7)
            orders: { type: "guard" },
            pixelWidth: 38,
            pixelHeight: 32,
            baseWidth: 20,
            baseHeight: 18,
            cost: 1500,
            pixelOffsetX: 9,
            pixelOffsetY: 12,
            buildableGrid: [
                [1]
            ],
            passableGrid: [
                [1]
            ],
            sight: 5,
            hitPoints: 200,
            "type": "building",
            "animations": [
                {
                    "name": "teleport",
                    "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    "loop": false,
                    "framePerSecond": 10
                },
                {
                    "name": "healthy",
                    "frames": [9,10,11,12,13,14,15,16],
                    "loop": false,
                    "framePerSecond": 30
                },
                {
                    "name": "damaged",
                    "frames": [18],
                    "loop": false,
                    "framePerSecond": 10
                }

            ],
            "defaultAnimation": "healthy"
        },
    	{
			name:"chopper",
			cost:900,
			pixelWidth:40,
			pixelHeight:40,
			pixelOffsetX:20,
			pixelOffsetY:20,
			weaponType:"heatseeker",
           	action:"fly",
           	orders:{type:"float"},   
			radius:18,
			sight:4,
			canAttack:true,
			canAttackLand:true,
			canAttackAir:true,
    	    hitPoints:50,
            type:"aircraft",
        	direction:0,
    		directions:8,
            "animations": [
                {
                    "name": "fly-0",
                    "frames": [0, 1, 2, 3],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-1",
                    "frames": [4, 5, 6, 7],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-2",
                    "frames": [8, 9, 10, 11],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-3",
                    "frames": [12, 13, 14, 15],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-4",
                    "frames": [16, 17, 18, 19],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-5",
                    "frames": [20, 21, 22, 23],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-6",
                    "frames": [24, 25, 26, 27],
                    "loop": true,
                    "framePerSecond": 10
                },
                {
                    "name": "fly-7",
                    "frames": [28, 29, 30, 31],
                    "loop": true,
                    "framePerSecond": 10
                }
            ],
			speed:25,
			turnSpeed:4,
			pixelShadowHeight:40
		},
		{
			name:"wraith",
			cost:600,
			pixelWidth:30,
			pixelHeight:30,
			canAttack:true,
			canAttackLand:false,
			canAttackAir:true,
			weaponType:"fireball",
           	action:"fly",
           	orders:{type:"float"},   
			pixelOffsetX:15,
			pixelOffsetY:15,
			radius:15,
			sight:8,
			speed:40,
			turnSpeed:4,
    	    hitPoints:50,
            type:"aircraft",
        	direction:0,
    		directions:8,
            "animations": [
            {
                "name": "fly-0",
                "frames": [0],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-1",
                "frames": [1],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-2",
                "frames": [2],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-3",
                "frames": [3],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-4",
                "frames": [4],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-5",
                "frames": [5],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-6",
                "frames": [6],
                "loop": false,
                "framePerSecond": 10
            },
            {
                "name": "fly-7",
                "frames": [7],
                "loop": false,
                "framePerSecond": 10
            }            
            ],
			pixelShadowHeight:40
		}	
    ];

function LoadGameData(key: string) {
    for (var i = 0; i < GameStaticData.length; i++) {
        var data = GameStaticData[i];
        if (data.name == key)
            return data;
    }

    return null;
}

export = LoadGameData;
