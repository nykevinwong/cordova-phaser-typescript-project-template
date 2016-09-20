define(["require", "exports"], function (require, exports) {
    "use strict";
    var SoundProcessor = (function () {
        function SoundProcessor(manager, game) {
            this.sounds = new Array();
            this.manager = manager;
            this.game = game;
        }
        SoundProcessor.prototype.createSound = function (entityId, soundData) {
            var sound = this.game.add.sound(soundData.source, 1, soundData.loop);
            this.sounds[entityId] = sound;
        };
        SoundProcessor.prototype.update = function (deltaTime) {
            var sounds = this.manager.getComponentsData('Sound');
            for (var entityId in sounds) {
                if (!this.sounds[entityId]) {
                    this.createSound(+entityId, sounds[entityId]);
                    this.sounds[entityId].play();
                }
            }
        };
        SoundProcessor.prototype.stopAll = function () {
            for (var entityId in this.sounds) {
                this.sounds[entityId].stop();
                this.sounds[entityId].destroy();
            }
        };
        return SoundProcessor;
    }());
    return SoundProcessor;
});
