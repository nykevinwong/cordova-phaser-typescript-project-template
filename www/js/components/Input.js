define(["require", "exports"], function (require, exports) {
    "use strict";
    var InputComponent = {
        name: 'Input',
        state: {
            action: '',
            keys: [],
            player: 0,
            active: false,
            padButtons: [],
        }
    };
    return InputComponent;
});
