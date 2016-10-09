/// <reference path="../definitions/phaser.d.ts" />
/// <reference path="../definitions/EZGUI.d.ts" />
import "EZGUI";
import MenuScreenView = require("settings/MenuScreenView");

class MenuTest extends Phaser.State {

    constructor() {
        super();
    }

    private mainScreen;
    private secondScreen;
    private thirdScreen;
    private mainScreenJSON = MenuScreenView.mainScreenJSON;
    private secondScreenJSON = MenuScreenView.secondScreenJSON;
    private thirdScreenJSON = MenuScreenView.thirdScreenJSON;
    private gameWidth;

    init() {        
		var self = this;
        EZGUI.Theme.load(['../../assets/ui/metalworks-theme/metalworks-theme.json'],
		function() { self.loadTheme() });
    }

    loadTheme() {

        this.mainScreen = EZGUI.create(this.mainScreenJSON, 'metalworks');

        this.secondScreen = EZGUI.create(this.secondScreenJSON, 'metalworks');
        this.secondScreen.visible = false;

        this.thirdScreen = EZGUI.create(this.thirdScreenJSON, 'metalworks');
        this.thirdScreen.visible = false;

        this.setupGUI();
    }

	firstScreenButtonNext_Click() {
		this.secondScreen.position.x = this.gameWidth;
		this.secondScreen.visible = true;
		var secondScreen = this.secondScreen;

		this.mainScreen.animatePosTo(-this.gameWidth, this.mainScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
			secondScreen.visible = false;
		});

		this.secondScreen.animatePosTo(0, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
		});
		
	} 

	secondScreenButtonPrev_Click() {
		this.mainScreen.position.x = -this.gameWidth;
		this.mainScreen.visible = true;
		var secondScreen = this.secondScreen;

		this.secondScreen.animatePosTo(this.gameWidth, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
			secondScreen.visible = false;
		});

		this.mainScreen.animatePosTo(0, this.mainScreen.position.y, 800, EZGUI.Easing.Back.Out, function () { });
	}

	secondScreenButtonNext_Click() {
			this.thirdScreen.position.x = this.gameWidth;
			this.thirdScreen.visible = true;
			var secondScreen = this.secondScreen;

			this.secondScreen.animatePosTo(-this.gameWidth, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
				secondScreen.visible = false;
			});

			this.thirdScreen.animatePosTo(0, this.thirdScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
				//dlg1.visible = false;
			});
	}

	thridScreenButtonPrev_Click() {
		        this.secondScreen.position.x = -this.gameWidth;
		        this.secondScreen.visible = true;
				var thirdScreen = this.thirdScreen;

		        this.thirdScreen.animatePosTo(this.gameWidth, this.thirdScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
		            thirdScreen.visible = false;
		        });

		        this.secondScreen.animatePosTo(0, this.secondScreen.position.y, 800, EZGUI.Easing.Back.Out, function () {
		        });
	}

	setupGUI() {
		var self = this;

		EZGUI.components.btNext1.on('click', function() { self.firstScreenButtonNext_Click(); });
		EZGUI.components.btPrev2.on('click', function() { self.secondScreenButtonPrev_Click(); });
		EZGUI.components.btNext2.on('click', function() { self.secondScreenButtonNext_Click(); });
		EZGUI.components.btPrev3.on('click', function() { self.thridScreenButtonPrev_Click(); });
	}    

}
 
export = MenuTest;