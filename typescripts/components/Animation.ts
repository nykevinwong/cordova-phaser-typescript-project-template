///<reference path='Component.d.ts' />

var AnimationComponent : Component.AnimationComponent = {
    name: 'Animation',
    state: { // center as the default
        animationName: null,
        loop: false,
        frameCountPerSecond: null,
        animationSet: null
    }  
};

export = AnimationComponent;