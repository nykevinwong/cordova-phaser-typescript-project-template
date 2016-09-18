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

}
