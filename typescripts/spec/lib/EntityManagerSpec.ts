/// <reference path="../../definitions/jasmine.d.ts" />

import EntityManager = require("components/EntityManager");
import Displayable = require("components/Displayable");
import Position = require("components/Position");
import DragDrop = require("components/DragDrop");
import RenderingProcessor = require("processors/RenderingProcessor");

var EntityManagerSpec = (function () {

  describe("EntityManager", function () {
    var manager: EntityManager;

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

      var entityId = manager.createEntity(["Displayable","Position"]);
      manager.updateComponentDataForEntity('Displayable', entityId, { sprite:'test', spriteReference:a });
      manager.updateComponentDataForEntity('Displayable', entityId, {  spriteReference:b });

      var displayables = manager.getComponentsData('Displayable');
      var displayble: Component.DisplayableState = displayables[0];
      expect(displayble.sprite).toEqual('test');
      expect(displayble.spriteReference).toBe(b);

    });




  });

});

export = EntityManagerSpec;

