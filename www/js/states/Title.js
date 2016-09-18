var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "components/Displayable", "components/Position", "components/EntityManager", "processors/RenderingProcessor"], function (require, exports, Displayable, Position, EntityManager, RenderingProcessor) {
    "use strict";
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title() {
            _super.call(this);
            this.manager = new EntityManager();
        }
        Title.prototype.init = function () {
            var components = [Displayable, Position];
            for (var i = components.length - 1; i >= 0; i--) {
                this.manager.addComponent(components[i].name, components[i]);
            }
            this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
        };
        Title.prototype.create = function () {
            var backgroundSprites = [
                'gameTitle',
            ];
            var data = [
                {
                    sprite: 'gameTitle',
                    x: this.world.centerX,
                    y: this.world.centerY
                }];
            for (var i = 0; i < data.length; i++) {
                var entity = this.manager.createEntity(['Position', 'Displayable']);
                var d = data[i];
                this.manager.updateComponentDataForEntity('Displayable', entity, { sprite: d.sprite });
                this.manager.updateComponentDataForEntity('Position', entity, { x: d.x, y: d.y });
            }
        };
        Title.prototype.update = function () {
            this.manager.update(this.game.time.elapsed);
        };
        return Title;
    }(Phaser.State));
    return Title;
});