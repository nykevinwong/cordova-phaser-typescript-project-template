/**
 Copyright (c) 2015 Belahcen Marwane (b.marwane@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/// <reference path="../definitions/phaser.d.ts" />

class HealthBar
{
    private game: Phaser.Game;
    private config: any;
    private flipped: boolean;
    private bgSprite: Phaser.Sprite;
    private barSprite: Phaser.Sprite;
    private x: number;
    private y: number;

    constructor(game:Phaser.Game, providedConfig:any)
    {
        this.game = game;
        this.setupConfiguration(providedConfig);
        this.setPosition(this.config.x, this.config.y);
        this.drawBackground();
        this.drawHealthBar();
        this.setFixedToCamera(this.config.isFixedToCamera);
    }

    setupConfiguration(providedConfig: any) 
    {
        this.config = this.mergeWithDefaultConfiguration(providedConfig);
        this.flipped = this.config.flipped;
    }

    mergeObjetcs(targetObj, newObj) {
        for (var p in newObj) {
            try {
                targetObj[p] = newObj[p].constructor==Object ? this.mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
            } catch(e) {
                targetObj[p] = newObj[p];
            }
        }
        return targetObj;
    }

    mergeWithDefaultConfiguration(newConfig)
    {
    var defaultConfig= {
        width: 250,
        height: 40,
        x: 0,
        y: 0,
        percent: 0.8,
        bg: {
            color: '#651828'
        },
        bar: {
            color: '#FEFF03'
        },
        animationDuration: 200,
        flipped: false,
        isFixedToCamera: false
    };

    return this.mergeObjetcs(defaultConfig, newConfig);
    }

    drawBackground()
    {
        var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
        bmd.ctx.fillStyle = this.config.bg.color;
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.config.width, this.config.height);
        bmd.ctx.fill();

        this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
        this.bgSprite.anchor.set(0.5);

        if(this.flipped){
            this.bgSprite.scale.x = -1;
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        if(this.bgSprite !== undefined && this.barSprite !== undefined){
            this.bgSprite.position.x = x;
            this.bgSprite.position.y = y;

            this.barSprite.position.x = x - this.config.width/2;
            this.barSprite.position.y = y;
        }
    }

    drawHealthBar() {
        var bmd = this.game.add.bitmapData(this.config.width*this.config.percent, this.config.height);
        bmd.ctx.fillStyle = this.config.bar.color;
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.config.width*this.config.percent, this.config.height);
        bmd.ctx.fill();

        this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
        this.barSprite.anchor.y = 0.5;

        if(this.flipped){
            this.barSprite.scale.x = -1;
        }
    }

    setWidth(newValue) 
    {
        var newWidth: number = newValue;
        if(this.flipped) {
            newWidth = -1 * newWidth;
        }
        this.game.add.tween(this.barSprite).to( { width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
    }

    setFixedToCamera(fixedToCamera) {
        this.bgSprite.fixedToCamera = fixedToCamera;
        this.barSprite.fixedToCamera = fixedToCamera;
    }

    kill(): void {
        this.bgSprite.kill();
        this.barSprite.kill();
    }
}

export = HealthBar;
