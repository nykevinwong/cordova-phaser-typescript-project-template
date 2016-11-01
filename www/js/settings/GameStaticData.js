define(["require", "exports"], function (require, exports) {
    "use strict";
    var GameStaticData = [
        {
            "name": "base",
            "pixelWidth": 60,
            "pixelHeight": 60,
            "baseWidth": 40,
            "baseHeight": 40,
            "pixelOffsetX": 0,
            "pixelOffsetY": 20,
            "buildableGrid": [
                [1, 1],
                [1, 1]
            ],
            "passableGrid": [
                [1, 1],
                [1, 1]
            ],
            "sight": 3,
            "hitPoints": 500,
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
        }
    ];
    function LoadGameData(key) {
        for (var i = 0; i < GameStaticData.length; i++) {
            var data = GameStaticData[i];
            if (data.name == key)
                return data;
        }
        return null;
    }
    return LoadGameData;
});
