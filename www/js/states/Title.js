var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "components/EntityManager", "../GlobalEntityManager", "processors/RenderingProcessor", "processors/SoundProcessor", "components/Displayable", "components/Position", "components/Anchor", "components/Sound", "components/Rope"], function (require, exports, EntityManager, GlobalEntityManager, RenderingProcessor, SoundProcessor, Displayable, Position, Anchor, Sound, Rope) {
    "use strict";
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title() {
            _super.call(this);
        }
        Title.prototype.init = function () {
            this.manager = new EntityManager();
            var components = [Displayable, Position, Anchor, Sound, Rope];
            for (var i = components.length - 1; i >= 0; i--) {
                this.manager.addComponent(components[i].name, components[i]);
            }
            this.soundProcessor = new SoundProcessor(this.manager, this.game);
            this.manager.addProcessor(this.soundProcessor);
            this.manager.addProcessor(new RenderingProcessor(this.manager, this.game));
        };
        Title.prototype.end = function () {
            this.soundProcessor.stopAll();
            this.game.state.start('Game', true, false);
        };
        Title.prototype.create = function () {
            var soundEntityId = this.manager.createEntity(['Sound']);
            this.manager.updateComponentDataForEntity('Sound', soundEntityId, {
                source: 'algorithmicMusic',
                loop: true,
            });
            var data = [
                {
                    components: ['Position', 'Displayable', 'Anchor', 'Rope'],
                    sprite: 'gameTitle',
                    x: this.world.centerX,
                    y: this.world.centerY * 0.5
                },
                {
                    components: ['Position', 'Displayable', 'Anchor'],
                    sprite: 'start',
                    x: this.world.centerX,
                    y: this.world.centerY * 1.25
                }
            ];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var entity = this.manager.createEntity(d.components);
                this.manager.updateComponentDataForEntity('Displayable', entity, { sprite: d.sprite });
                this.manager.updateComponentDataForEntity('Position', entity, { x: d.x, y: d.y });
            }
        };
        Title.prototype.update = function () {
            GlobalEntityManager.update(this.game.time.elapsedMS);
            this.manager.update(this.game.time.elapsedMS);
            var inputs = GlobalEntityManager.getComponentsData('Input');
            for (var i in inputs) {
                if (inputs[i].active) {
                    this.end();
                }
            }
        };
        return Title;
    }(Phaser.State));
    return Title;
});
