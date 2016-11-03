/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class GroupProcessor implements EntityManager.Processor {
    private manager: EntityManager;
    private game: Phaser.Game;
    private groups: Phaser.Group[] = new Array();
    private isDirty: boolean;

    constructor(manager: EntityManager, game: Phaser.Game) {
        this.manager = manager;
        this.game = game;
        this.isDirty = true;
        
    }

    createGroups() {
        var groupStates: Component.GroupState[] = this.manager.getComponentsData('Group');

        for (var entityId in groupStates) {
            var groupState: Component.GroupState = groupStates[entityId];
            var checkGroup: Phaser.Group = this.groups[groupState.groupName]

            if (checkGroup == null || typeof checkGroup == "undefined") {
                this.groups[groupState.groupName] = this.game.add.group();
            }

            if (this.manager.entityHasComponent(+entityId, "Displayable")) {
                var displayableState: Component.DisplayableState = this.manager.getComponentDataForEntity('Displayable', +entityId);

                if(displayableState.spriteReference!=null)
                {
                    var group : Phaser.Group = this.groups[groupState.groupName];
                    group.add(displayableState.spriteReference);
                }
            }
        }

        this.isDirty = false;
    }


    update(deltaTime: number): void {

        if (this.isDirty) {
            this.createGroups();
        }
        else {
            for (var name in this.groups) {
                var group: Phaser.Group = this.groups[name];
                //group.sort('y', Phaser.Group.SORT_ASCENDING);

                group.customSort(function(a,b)
                {
                    var result: number = a.y - b.y;

                    if(result == 0)
                    {
                        return b.x - a.x;
                    }

                    return result;                
                });
            }
        }

    }
}

export = GroupProcessor;