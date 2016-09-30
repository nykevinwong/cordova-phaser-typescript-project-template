define(["require", "exports", "PhaserGameApp"], function (require, exports, PhaserGameApp) {
    "use strict";
    var Application = (function () {
        function Application() {
        }
        Application.prototype.initialize = function () { this.bindEvents(); };
        Application.prototype.bindEvents = function () {
            var isBrowser = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
            if (isBrowser) {
                document.addEventListener('deviceready', this.start, false);
            }
            else {
                this.start();
            }
        };
        Application.prototype.start = function () { console.log("Starting app"); this.game = new PhaserGameApp(); };
        Application.prototype.pause = function () { console.log('app paused'); };
        Application.prototype.getGame = function () { return this.game; };
        return Application;
    }());
    var app = new Application();
    document.addEventListener('pause', function () { app.pause(); });
    app.initialize();
    return app;
});
