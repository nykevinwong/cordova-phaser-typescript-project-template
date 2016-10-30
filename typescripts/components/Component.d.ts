/// <reference path="EntityManager.d.ts" />

declare module Component {

    type ComponentType = "Displayable" | "Position" | "Anchor" | "Sound" | "Rope" | "Input"|
    "DragDrop"|"Animation" | "AnimationDataSet" | "Selectable" ;

    interface Assemblage {
        name: string;
        description: string;
        components: Component.ComponentType[];
        initialState: any;        
    }

    class DisplayableState {
        sprite: string;
        deleted: boolean;
        scaleX: number;
        spriteReference: any;
    }

    class DisplayableComponent implements EntityManager.Component {
        name: string;
        state: DisplayableState;
    }

    class AnimationState {
        animationName: string;
        loop: boolean;
        frameCountPerSecond: number;
        animationSet: string;
    }

    class AnimationComponent implements EntityManager.Component {
        name: string;
        state: AnimationState;
    }

    class AnimationData {
        name: string;
        frames: number[];
        frameCountPerSecond: number;
        defaultLoop: boolean;
    }

    class AnimationDataSet {
        setName: string;
        loaded: boolean;
    }

    class AnimationDataSetComponent implements EntityManager.Component {
        name: string;
        state: AnimationDataSet;
    }


    class PositionState {
        x: number;
        y: number;
    }

    class PositionComponent implements EntityManager.Component {
        name: string;
        state: PositionState;
    }

    class AnchorState {
        x: number;
        y: number;
    }

    class AnchorComponent implements EntityManager.Component {
        name: string;
        state: AnchorState;
    }

    class SoundState {
        source: string;
        loop: boolean;
    }

    class SoundComponent implements EntityManager.Component {
        name: string;
        state: SoundState;
    }

    class RopeState {
        width: number;
        pointCount: number;
    }

    class RopeComponent implements EntityManager.Component {
        name: string;
        state: RopeState;
    }

    class InputState {
        action: string;
        keys: any[];
        player: number;
        active: boolean;
        padButtons: any[];
    }

    class InputComponent implements EntityManager.Component {
        name: string;
        state: InputState;
    }

    class DragDropState {
        enable: boolean;
        enableSnap: boolean;
        initialized: boolean;
    }

    class DragDropComponent implements EntityManager.Component {
        name: string;
        state: DragDropState;
    }

    class SelectableState {
        selected: boolean;
    }

    class SelectableComponent implements EntityManager.Component {
        name: string;
        state: SelectableState;
    }

}

