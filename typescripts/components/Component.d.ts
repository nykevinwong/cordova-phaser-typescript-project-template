
declare module Component {

class DisplayableState {
    sprite: string;
    deleted: boolean;
    scaleX: number;
}

class DisplayableComponent {
    name: string;
    state: DisplayableState;
}

class PositionState {
    x : number;
    y : number;
}

class PositionComponent {
    name: string;
    state: PositionState;
}

class AnchorState {
    x : number;
    y : number;
}

class AnchorComponent {
    name: string;
    state: AnchorState;
}

class SoundState {
    source : string;
    loop : boolean;
}

class SoundComponent {
    name: string;
    state: SoundState;
}

class RopeState {
    width: number;
    pointCount : number;
}

class RopeComponent {
    name: string;
    state: RopeState;
}

}
