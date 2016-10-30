define(["require", "exports", "components/EntityManager", "components/Displayable", "components/Position", "components/DragDrop"], function (require, exports, EntityManager, Displayable, Position, DragDrop) {
    "use strict";
    function EntityManagerSpec() {
        describe("EntityManager", function () {
            var manager;
            beforeEach(function () {
                manager = new EntityManager();
                var components = [Displayable, Position, DragDrop];
                for (var i = components.length - 1; i >= 0; i--) {
                    manager.addComponent(components[i].name, components[i]);
                }
            });
            it("should be able to add components", function () {
                var actualComponents = manager.getComponentsList();
                expect(actualComponents).toContain(Displayable.name);
                expect(actualComponents).toContain(Position.name);
                expect(actualComponents).toContain(DragDrop.name);
            });
            it("should be able to update and load correct Displayable state", function () {
                var a = new Object();
                a["b"] = "test";
                var b = new Object();
                b["kk"] = "test2";
                var entityId = manager.createEntity(["Displayable", "Position"]);
                manager.updateComponentDataForEntity('Displayable', entityId, { sprite: 'test', spriteReference: a });
                manager.updateComponentDataForEntity('Displayable', entityId, { spriteReference: b });
                var displayables = manager.getComponentsData('Displayable');
                var displayble = displayables[0];
                expect(displayble.sprite).toEqual('test');
                expect(displayble.spriteReference).toBe(b);
            });
        });
    }
    return EntityManagerSpec;
});
