define(["require", "exports"], function (require, exports) {
    "use strict";
    var PhaserGameApp = (function () {
        function PhaserGameApp() {
            this.vx = 2.0;
            this.vy = 2.0;
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
            this.time = new Phaser.Time(this.game);
        }
        PhaserGameApp.prototype.create = function () {
            var text = "Hello World!";
            var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
            this.text = this.game.add.text(0, 0, text, style);
            this.deltaText = this.game.add.text(0, 300, text, style);
        };
        PhaserGameApp.prototype.update = function () {
            var deltaTime = (this.time.elapsedMS / 1000);
            this.deltaText.text = deltaTime.toString();
            this.text.position.x += 400 * deltaTime;
            this.text.position.y += 0 * deltaTime;
            if (this.text.position.x >= 800)
                this.text.position.x = 0;
        };
        return PhaserGameApp;
    }());
    return PhaserGameApp;
});
