var SimpleGame = (function () {
    function SimpleGame() {
        this.vx = 2;
        this.vy = 2;
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    }
    SimpleGame.prototype.create = function () {
        var text = "Hello World!";
        var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
        this.text = this.game.add.text(0, 0, text, style);
    };
    SimpleGame.prototype.update = function () {
        this.text.position.x += 5;
        this.text.position.y += 5;
    };
    return SimpleGame;
}());
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
    Application.prototype.start = function () { console.log("Starting app"); var game = new SimpleGame(); };
    Application.prototype.pause = function () { console.log('app paused'); };
    return Application;
}());
var app = new Application();
document.addEventListener('pause', function () { app.pause(); });
app.initialize();
