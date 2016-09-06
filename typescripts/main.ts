

requirejs.config({
    baseUrl: 'js', 

    paths: {
        'entity-manager': '../lib/entity-manager',
        'lib': '../lib'
    },

    waitSeconds: 20,

    deps: ['AppStart'],

    urlArgs: "t=20160320000000" //flusing cache, do not use in production
});

