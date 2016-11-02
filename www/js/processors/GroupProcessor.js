define(["require", "exports"], function (require, exports) {
    "use strict";
    var GroupProcessor = (function () {
        function GroupProcessor(manager, game) {
            this.groups = new Array();
            this.manager = manager;
            this.game = game;
            this.isDirty = true;
        }
        GroupProcessor.prototype.createGroups = function () {
            var groupStates = this.manager.getComponentsData('Group');
            for (var entityId in groupStates) {
                var groupState = groupStates[entityId];
                var checkGroup = this.groups[groupState.groupName];
                if (checkGroup == null || typeof checkGroup == "undefined") {
                    this.groups[groupState.groupName] = this.game.add.group();
                }
                if (this.manager.entityHasComponent(+entityId, "Displayable")) {
                    var displayableState = this.manager.getComponentDataForEntity('Displayable', +entityId);
                    if (displayableState.spriteReference != null) {
                        var group = this.groups[groupState.groupName];
                        group.add(displayableState.spriteReference);
                    }
                }
            }
            this.isDirty = false;
        };
        GroupProcessor.prototype.update = function (deltaTime) {
            if (this.isDirty) {
                this.createGroups();
            }
            else {
                for (var name in this.groups) {
                    var group = this.groups[name];
                    group.customSort(function (a, b) {
                        var result = a.y - b.y;
                        if (result == 0) {
                            return b.x - a.x;
                        }
                        return result;
                    });
                }
            }
        };
        return GroupProcessor;
    }());
    return GroupProcessor;
});
