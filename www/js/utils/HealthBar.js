define(["require", "exports"], function (require, exports) {
    "use strict";
    var HealthBar = (function () {
        function HealthBar(game, providedConfig) {
            this.game = game;
            this.setupConfiguration(providedConfig);
            this.setPosition(this.config.x, this.config.y);
            this.drawBackground();
            this.drawHealthBar();
            this.setFixedToCamera(this.config.isFixedToCamera);
        }
        HealthBar.prototype.setupConfiguration = function (providedConfig) {
            this.config = this.mergeWithDefaultConfiguration(providedConfig);
            this.flipped = this.config.flipped;
        };
        HealthBar.prototype.mergeObjetcs = function (targetObj, newObj) {
            for (var p in newObj) {
                try {
                    targetObj[p] = newObj[p].constructor == Object ? this.mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
                }
                catch (e) {
                    targetObj[p] = newObj[p];
                }
            }
            return targetObj;
        };
        HealthBar.prototype.mergeWithDefaultConfiguration = function (newConfig) {
            var defaultConfig = {
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
        };
        HealthBar.prototype.drawBackground = function () {
            var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
            bmd.ctx.fillStyle = this.config.bg.color;
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, this.config.width, this.config.height);
            bmd.ctx.fill();
            this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
            this.bgSprite.anchor.set(0.5);
            if (this.flipped) {
                this.bgSprite.scale.x = -1;
            }
        };
        HealthBar.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
            if (this.bgSprite !== undefined && this.barSprite !== undefined) {
                this.bgSprite.position.x = x;
                this.bgSprite.position.y = y;
                this.barSprite.position.x = x - this.config.width / 2;
                this.barSprite.position.y = y;
            }
        };
        HealthBar.prototype.drawHealthBar = function () {
            var bmd = this.game.add.bitmapData(this.config.width * this.config.percent, this.config.height);
            bmd.ctx.fillStyle = this.config.bar.color;
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, this.config.width * this.config.percent, this.config.height);
            bmd.ctx.fill();
            this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width / 2, this.y, bmd);
            this.barSprite.anchor.y = 0.5;
            if (this.flipped) {
                this.barSprite.scale.x = -1;
            }
        };
        HealthBar.prototype.setWidth = function (newValue) {
            var newWidth = newValue;
            if (this.flipped) {
                newWidth = -1 * newWidth;
            }
            this.game.add.tween(this.barSprite).to({ width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
        };
        HealthBar.prototype.setFixedToCamera = function (fixedToCamera) {
            this.bgSprite.fixedToCamera = fixedToCamera;
            this.barSprite.fixedToCamera = fixedToCamera;
        };
        HealthBar.prototype.kill = function () {
            this.bgSprite.kill();
            this.barSprite.kill();
        };
        return HealthBar;
    }());
    return HealthBar;
});
