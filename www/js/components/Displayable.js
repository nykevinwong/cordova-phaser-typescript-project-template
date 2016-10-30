define(["require", "exports"], function (require, exports) {
    "use strict";
    var DisplayableComponent = {
        name: 'Displayable',
        state: {
            sprite: '',
            deleted: false,
            scaleX: 1,
            spriteReference: null
        }
    };
    return DisplayableComponent;
});
