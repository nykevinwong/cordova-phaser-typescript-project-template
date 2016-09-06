/// <reference path="./definitions/phaser.d.ts" />

class PhaserGameApp {
    private game: Phaser.Game;
    private text: Phaser.Text;
    private deltaText: Phaser.Text;
    private time: Phaser.Time;
    private vx : number  = 2.0;
    private vy : number  = 2.0;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
        this.time = new Phaser.Time(this.game);
    }

    create() {
        var text = "Hello World!";
        var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
        this.text = this.game.add.text(0, 0, text, style);
        this.deltaText = this.game.add.text(0, 300, text, style);
    
        
    }


    update() {
        var deltaTime = (this.time.elapsedMS / 1000)
        this.deltaText.text = deltaTime.toString();

        this.text.position.x += 400 * deltaTime;
        this.text.position.y += 0 * deltaTime;

        if(this.text.position.x >= 800)
        this.text.position.x = 0;
    }

}

export = PhaserGameApp;