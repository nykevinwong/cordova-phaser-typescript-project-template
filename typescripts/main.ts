/// <reference path="./definitions/require.d.ts" />
// Tell typeScript compiler this external js varaible is a global varialbe.

requirejs.config({
    baseUrl: 'js', 

    paths: {
        'entity-manager': '../lib/entity-manager',
       // 'slick-ui': '../lib/slick-ui.min',
        'EZGUI': '../lib/EZGUI',
        'lib': '../lib',
        'EZGUI-Phaser-Compatiblity': '../lib/phaser-compat-2.4.js'
    },
/*
    shim: {
        'EZGUI':{
            deps: ['EZGUI-Phaser-Compatiblity']
        }
    },*/

    waitSeconds: 20,

    deps: ['AppStart','entity-manager'],

    urlArgs: "t=20160320000000" //flusing cache, do not use in production
});

