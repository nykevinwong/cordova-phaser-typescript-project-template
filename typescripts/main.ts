/// <reference path="./definitions/require.d.ts" />
// Tell typeScript compiler this external js varaible is a global varialbe.

requirejs.config({
    baseUrl: 'js', 

    paths: {
        'entity-manager': '../lib/entity-manager',
        'slick-ui': '../lib/slick-ui.min',
        'lib': '../lib',
        'phaser-swipe': '../lib/swipe'
    },

    waitSeconds: 20,

    deps: ['AppStart','entity-manager','phaser-swipe'],

    urlArgs: "t=20160320000000" //flusing cache, do not use in production
});

