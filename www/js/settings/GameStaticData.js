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
        }];
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
