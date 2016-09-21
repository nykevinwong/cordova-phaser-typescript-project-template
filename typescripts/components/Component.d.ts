/// <reference path="EntityManager.d.ts" />

declare module Component {

class DisplayableState {
    sprite: string;
    deleted: boolean;
    scaleX: number;
}

class DisplayableComponent implements EntityManager.Component {
    name: string;
    state: DisplayableState;
}

class PositionState {
    x : number;
    y : number;
}

class PositionComponent implements EntityManager.Component  {
    name: string;
    state: PositionState;
}

class AnchorState {
    x : number;
    y : number;
}

class AnchorComponent implements EntityManager.Component  {
    name: string;
    state: AnchorState;
}

class SoundState {
    source : string;
    loop : boolean;
}

class SoundComponent implements EntityManager.Component  {
    name: string;
    state: SoundState;
}

class RopeState {
    width: number;
    pointCount : number;
}

class RopeComponent implements EntityManager.Component  {
    name: string;
    state: RopeState;
}

}

