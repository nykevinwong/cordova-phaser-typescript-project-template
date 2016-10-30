define(["require", "exports"], function (require, exports) {
    "use strict";
    var DragDropComponent = {
        name: 'DragDrop',
        state: {
            enable: true,
            enableSnap: true,
            initialized: false
        }
    };
    return DragDropComponent;
});
