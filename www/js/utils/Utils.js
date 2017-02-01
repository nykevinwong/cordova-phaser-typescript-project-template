define(["require", "exports"], function (require, exports) {
    "use strict";
    var ScreenMetrics = (function () {
        function ScreenMetrics() {
        }
        return ScreenMetrics;
    }());
    exports.ScreenMetrics = ScreenMetrics;
    var Orientation;
    (function (Orientation) {
        Orientation[Orientation["PORTRAIT"] = 0] = "PORTRAIT";
        Orientation[Orientation["LANDSCAPE"] = 1] = "LANDSCAPE";
    })(Orientation = exports.Orientation || (exports.Orientation = {}));
    ;
    var ScreenUtils = (function () {
        function ScreenUtils() {
        }
        ScreenUtils.calculateScreenMetrics = function (aDefaultWidth, aDefaultHeight, aOrientation, aMaxGameWidth, aMaxGameHeight) {
            if (aOrientation === void 0) { aOrientation = Orientation.LANDSCAPE; }
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            if ((windowWidth < windowHeight && aOrientation === Orientation.LANDSCAPE) ||
                (windowHeight < windowWidth && aOrientation === Orientation.PORTRAIT)) {
                var tmp = windowWidth;
                windowWidth = windowHeight;
                windowHeight = tmp;
            }
            if (typeof aMaxGameWidth === "undefined" || typeof aMaxGameHeight === "undefined") {
                if (aOrientation === Orientation.LANDSCAPE) {
                    aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
                    aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
                }
                else {
                    aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
                    aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
                }
            }
            var defaultAspect = (aOrientation === Orientation.LANDSCAPE) ? 1280 / 800 : 800 / 1280;
            var windowAspect = windowWidth / windowHeight;
            var offsetX = 0;
            var offsetY = 0;
            var gameWidth = 0;
            var gameHeight = 0;
            if (windowAspect > defaultAspect) {
                gameHeight = aDefaultHeight;
                gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
                gameWidth = Math.min(gameWidth, aMaxGameWidth);
                offsetX = (gameWidth - aDefaultWidth) / 2;
                offsetY = 0;
            }
            else {
                gameWidth = aDefaultWidth;
                gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
                gameHeight = Math.min(gameHeight, aMaxGameHeight);
                offsetX = 0;
                offsetY = (gameHeight - aDefaultHeight) / 2;
            }
            var scaleX = windowWidth / gameWidth;
            var scaleY = windowHeight / gameHeight;
            this.screenMetrics = new ScreenMetrics();
            this.screenMetrics.windowWidth = windowWidth;
            this.screenMetrics.windowHeight = windowHeight;
            this.screenMetrics.defaultGameWidth = aDefaultWidth;
            this.screenMetrics.defaultGameHeight = aDefaultHeight;
            this.screenMetrics.maxGameWidth = aMaxGameWidth;
            this.screenMetrics.maxGameHeight = aMaxGameHeight;
            this.screenMetrics.gameWidth = gameWidth;
            this.screenMetrics.gameHeight = gameHeight;
            this.screenMetrics.scaleX = scaleX;
            this.screenMetrics.scaleY = scaleY;
            this.screenMetrics.offsetX = offsetX;
            this.screenMetrics.offsetY = offsetY;
            return this.screenMetrics;
        };
        return ScreenUtils;
    }());
    exports.ScreenUtils = ScreenUtils;
    var Navigation = (function () {
        function Navigation() {
        }
        Navigation.findAngle = function (object, unit, directions) {
            var dy = (object.y) - (unit.y);
            var dx = (object.x) - (unit.x);
            var angle = Navigation.wrapDirection(directions / 2 - (Math.atan2(dx, dy) * directions / (2 * Math.PI)), directions);
            return angle;
        };
        Navigation.angleDiff = function (angle1, angle2, directions) {
            if (angle1 >= directions / 2) {
                angle1 = angle1 - directions;
            }
            if (angle2 >= directions / 2) {
                angle2 = angle2 - directions;
            }
            var diff = angle2 - angle1;
            if (diff < -directions / 2) {
                diff += directions;
            }
            if (diff > directions / 2) {
                diff -= directions;
            }
            return diff;
        };
        Navigation.wrapDirection = function (direction, directions) {
            if (direction < 0) {
                direction += directions;
            }
            if (direction >= directions) {
                direction -= directions;
            }
            return direction;
        };
        Navigation.isInSourceRadius = function (src, target, radius, gridSize) {
            var isInSourceRadius = (Math.pow(target.x - src.x, 2) + Math.pow(target.y - src.y, 2)) < Math.pow(radius / gridSize, 2);
            return isInSourceRadius;
        };
        return Navigation;
    }());
    exports.Navigation = Navigation;
});
