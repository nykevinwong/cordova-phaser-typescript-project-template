// source from http://sbcgamesdev.blogspot.cz/2015/04/phaser-tutorial-manage-different-screen.html

    export class ScreenMetrics {
        windowWidth: number;
        windowHeight: number;

        defaultGameWidth: number;
        defaultGameHeight: number;
        maxGameWidth: number;
        maxGameHeight: number

        gameWidth: number;
        gameHeight: number;
        scaleX: number;
        scaleY: number;
        offsetX: number;
        offsetY: number;
    }

    export enum Orientation {PORTRAIT, LANDSCAPE };

    export class ScreenUtils {
        public static screenMetrics: ScreenMetrics;

        // -------------------------------------------------------------------------
        public static calculateScreenMetrics(aDefaultWidth: number, aDefaultHeight: number,
            aOrientation: Orientation = Orientation.LANDSCAPE,
            aMaxGameWidth?: number, aMaxGameHeight?: number): ScreenMetrics {

            // get dimension of window
            var windowWidth: number = window.innerWidth;
            var windowHeight: number = window.innerHeight;


            // swap if window dimensions do not match orientation
            if ((windowWidth < windowHeight && aOrientation === Orientation.LANDSCAPE) ||
                (windowHeight < windowWidth && aOrientation === Orientation.PORTRAIT)) {
                var tmp: number = windowWidth;
                windowWidth = windowHeight;
                windowHeight = tmp;
            }


            // calculate max game dimension. The bounds are iPad and iPhone 
            if (typeof aMaxGameWidth === "undefined" || typeof aMaxGameHeight === "undefined") {
                if (aOrientation === Orientation.LANDSCAPE) {
                    aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
                    aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
                } else {
                    aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
                    aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
                }
            }


            // default aspect and current window aspect
            var defaultAspect: number = (aOrientation === Orientation.LANDSCAPE) ? 1280 / 800 : 800 / 1280;
            var windowAspect: number = windowWidth / windowHeight;

            var offsetX: number = 0;
            var offsetY: number = 0;
            var gameWidth: number = 0;
            var gameHeight: number = 0;

            // if (aOrientation === Orientation.LANDSCAPE) {
                // "iPhone" landscape ... and "iPad" portrait
                if (windowAspect > defaultAspect) {
                    gameHeight = aDefaultHeight;
                    gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
                    gameWidth = Math.min(gameWidth, aMaxGameWidth);
                    offsetX = (gameWidth - aDefaultWidth) / 2;
                    offsetY = 0;
                } else {    // "iPad" landscpae ... and "iPhone" portrait
                    gameWidth = aDefaultWidth;
                    gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
                    gameHeight = Math.min(gameHeight, aMaxGameHeight);
                    offsetX = 0;
                    offsetY = (gameHeight - aDefaultHeight) / 2;
                }
            /* } else {    // "iPhone" portrait
                if (windowAspect < defaultAspect) {
                    gameWidth = aDefaultWidth;
                    gameHeight = gameWidth / windowAspect;
                    gameHeight = Math.min(gameHeight, aMaxGameHeight);
                    offsetX = 0;
                    offsetY = (gameHeight - aDefaultHeight) / 2;
                } else {    // "iPad" portrait
                    gameHeight = aDefaultHeight;
                    gameWidth = gameHeight = windowAspect;
                    gameWidth = Math.min(gameWidth, aMaxGameWidth);
                    offsetX = (gameWidth - aDefaultWidth) / 2;
                    offsetY = 0;
                }
            }
            */


            // calculate scale
            var scaleX: number = windowWidth / gameWidth;
            var scaleY: number = windowHeight / gameHeight;


            // store values
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
        }
    }

    export class Navigation
    {
        // Finds the angle between two objects in terms of a direction (where 0 <= angle < directions) (assuming we have 8 directions)
  public static  findAngle(object,unit,directions: number): number{
     var dy = (object.y) - (unit.y);
     var dx = (object.x) - (unit.x);
	//Convert Arctan to value between (0 - 7)
    var angle = Navigation.wrapDirection(directions/2-(Math.atan2(dx,dy)*directions/(2*Math.PI)),directions);   
    return angle;    
 }

 // returns the smallest difference (value ranging between -directions/2 to +directions/2) between two angles (where 0 <= angle < directions)
public static angleDiff(angle1: number,angle2: number,directions: number):number{
	if (angle1>=directions/2){
		angle1 = angle1-directions;
	}
	if (angle2>=directions/2){
		angle2 = angle2-directions;
	}
	
	var diff: number  = angle2-angle1; 
	
	if (diff<-directions/2){
		diff += directions;
	}
	if (diff>directions/2){
		diff -= directions;
	}
	
    return diff;
}

// Make sure 0 <= direction < directions
public static  wrapDirection(direction: number,directions: number): number{
	if (direction<0){
		direction += directions;
	}  
	if (direction >= directions){
		direction -= directions;
	}
	return direction;
}




    } 

