var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "settings/MenuScreenView", "EZGUI"], function (require, exports, MenuScreenView) {
    "use strict";
    var MenuTest = (function (_super) {
        __extends(MenuTest, _super);
        function MenuTest() {
            _super.call(this);
            this.mainScreenJSON = MenuScreenView.mainScreenJSON;
            this.secondScreenJSON = MenuScreenView.secondScreenJSON;
            this.thirdScreenJSON = MenuScreenView.thirdScreenJSON;
        }
        MenuTest.prototype.init = function () {
            var self = this;
            EZGUI.Theme.load(['../../assets/ui/metalworks-theme/metalworks-theme.json'], function () { self.loadTheme(); });
        };
        MenuTest.prototype.loadTheme = function () {
            this.mainScreen = EZGUI.create(this.mainScreenJSON, 'metalworks');
            this.secondScreen = EZGUI.create(this.secondScreenJSON, 'metalworks');
            this.secondScreen.visible = false;
            this.thirdScreen = EZGUI.create(this.thirdScreenJSON, 'metalworks');
            this.thirdScreen.visible = false;
            this.setupGUI();
        };
        MenuTest.prototype.firstScreenButtonNext_Click = function () {
            this.secondScreen.position.x = this.gameWidth;
            this.secondScreen.visible = true;
            var secondScreen = this.secondScreen;
            this.mainScreen.animatePosTo(-this.gameWidth, this.mainScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
                secondScreen.visible = false;
            });
            this.secondScreen.animatePosTo(0, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
            });
        };
        MenuTest.prototype.secondScreenButtonPrev_Click = function () {
            this.mainScreen.position.x = -this.gameWidth;
            this.mainScreen.visible = true;
            var secondScreen = this.secondScreen;
            this.secondScreen.animatePosTo(this.gameWidth, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
                secondScreen.visible = false;
            });
            this.mainScreen.animatePosTo(0, this.mainScreen.position.y, 800, EZGUI.Easing.Back.Out, function () { });
        };
        MenuTest.prototype.secondScreenButtonNext_Click = function () {
            this.thirdScreen.position.x = this.gameWidth;
            this.thirdScreen.visible = true;
            var secondScreen = this.secondScreen;
            this.secondScreen.animatePosTo(-this.gameWidth, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
                secondScreen.visible = false;
            });
            this.thirdScreen.animatePosTo(0, this.thirdScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
            });
        };
        MenuTest.prototype.thridScreenButtonPrev_Click = function () {
            this.secondScreen.position.x = -this.gameWidth;
            this.secondScreen.visible = true;
            var thirdScreen = this.thirdScreen;
            this.thirdScreen.animatePosTo(this.gameWidth, this.thirdScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
                thirdScreen.visible = false;
            });
            this.secondScreen.animatePosTo(0, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
            });
        };
        MenuTest.prototype.setupGUI = function () {
            var self = this;
            EZGUI.components.btNext1.on('click', function () { self.firstScreenButtonNext_Click(); });
            EZGUI.components.btPrev2.on('click', function () { self.secondScreenButtonPrev_Click(); });
            EZGUI.components.btNext2.on('click', function () { self.secondScreenButtonNext_Click(); });
            EZGUI.components.btPrev3.on('click', function () { self.thridScreenButtonPrev_Click(); });
        };
        return MenuTest;
    }(Phaser.State));
    return MenuTest;
});
