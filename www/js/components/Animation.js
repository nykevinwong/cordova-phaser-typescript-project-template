define(["require", "exports"], function (require, exports) {
    "use strict";
    var AnimationComponent = {
        name: 'Animation',
        state: {
            animationName: null,
            loop: false,
            frameCountPerSecond: null,
            animationSet: null
        }
    };
    return AnimationComponent;
});
