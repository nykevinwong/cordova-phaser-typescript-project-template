define(["require", "exports"], function (require, exports) {
    "use strict";
    var Displayable = {
        name: 'Displayable',
        state: {
            sprite: '',
            deleted: false,
            scaleX: 1,
        }
    };
    return Displayable;
});
