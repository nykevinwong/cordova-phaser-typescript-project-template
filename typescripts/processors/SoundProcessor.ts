/// <reference path="../components/EntityManager.d.ts" />
/// <reference path='../components/Component.d.ts' />
/// <reference path="../definitions/phaser.d.ts" />

class SoundProcessor implements EntityManager.Processor {

    private manager: EntityManager;
    private game: Phaser.Game;
    private sounds: Phaser.Sound[] =  new Array();

    constructor(manager: EntityManager, game:Phaser.Game)
    {
        this.manager = manager;
        this.game = game;
    }


    createSound(entityId: number, soundData) {
        var sound: Phaser.Sound = this.game.add.sound(soundData.source, 1, soundData.loop);
        this.sounds[entityId] = sound;
    }

    update(deltaTime: number): void{

        // Play all sounds.
        var sounds = this.manager.getComponentsData('Sound');
        for (var entityId in sounds) {
            // First create the actual Phaser.Sound object if it doesn't exist yet.
            if (!this.sounds[entityId]) {
                 // plus sign means converting to number.
                this.createSound(+entityId, sounds[entityId]);
                this.sounds[entityId].play();
            }
        }
    }

    stopAll(): void {
        // Stop all sounds.
        for (var entityId in this.sounds) {
            this.sounds[entityId].stop();
            this.sounds[entityId].destroy();
        }
    }
}

export = SoundProcessor;