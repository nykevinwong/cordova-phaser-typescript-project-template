requirejs.config({
    baseUrl: 'js',
    paths: {
        'entity-manager': '../lib/entity-manager',
        'slick-ui': '../lib/slick-ui.min',
        'lib': '../lib',
        'spec-test-starter': 'spec/SpecTestStart',
        'jasmine': ['../lib/jasmine-2.5.2/jasmine'],
        'jasmine-html': ['../lib/jasmine-2.5.2/jasmine-html'],
        'jasmine-boot': ['../lib/jasmine-2.5.2/boot']
    },
    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    },
    waitSeconds: 20,
    deps: ['entity-manager']
});
require(['jasmine-boot'], function () {
    require(['spec-test-starter'], function () {
        window.onload();
    });
});
