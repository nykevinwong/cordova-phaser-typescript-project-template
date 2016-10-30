requirejs.config({
    baseUrl: 'js',
    paths: {
        'entity-manager': '../lib/entity-manager',
        'slick-ui': '../lib/slick-ui.min',
        'lib': '../lib'
    },
    waitSeconds: 20,
    deps: ['AppStart', 'entity-manager']
});
