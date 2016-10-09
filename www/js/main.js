requirejs.config({
    baseUrl: 'js',
    paths: {
        'entity-manager': '../lib/entity-manager',
        'EZGUI': '../lib/EZGUI',
        'lib': '../lib',
        'EZGUI-Phaser-Compatiblity': '../lib/phaser-compat-2.4.js'
    },
    waitSeconds: 20,
    deps: ['AppStart', 'entity-manager'],
    urlArgs: "t=20160320000000"
});
