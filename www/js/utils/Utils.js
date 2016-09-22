define(["require", "exports"], function (require, exports) {
    "use strict";
    var ScreenMetrics = (function () {
        function ScreenMetrics() {
        }
        return ScreenMetrics;
    }());
    exports.ScreenMetrics = ScreenMetrics;
    (function (Orientation) {
        Orientation[Orientation["PORTRAIT"] = 0] = "PORTRAIT";
        Orientation[Orientation["LANDSCAPE"] = 1] = "LANDSCAPE";
    })(exports.Orientation || (exports.Orientation = {}));
    var Orientation = exports.Orientation;
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
});
