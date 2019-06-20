'use strict';

require.config({
    baseUrl : 'js',
    waitSeconds: 0,
    paths: {
        jquery: 'lib/jquery-1.10.2.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        hbs : 'lib/hbs',
        Handlebars : 'lib/hbs/handlebars',
        templates:  '../hbs_templates'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },

    hbs : {
        templateExtension : 'html',
        disableI18n : true
    },

    deps: ['jquery']

});

require(['jquery'],
    function($) {
        var onDeviceReady = function() {
            // now can use cordova fully
            require(['backbone', 'router'], function(Backbone, router) {
                if (device.platform == 'Android') {
                    var onBack = function() {
                        router.navigate('exit', {trigger: true});

                        // just direct exit, no questions asked...
                        setTimeout(function() {
                            navigator.app.exitApp();
                        }, 500);
                    };
                    document.addEventListener('backbutton', onBack, false);
                }

                Backbone.history.start({ pushState: false });
                $('#init').hide();
            })
        };
        $(document).ready(function() {
            document.addEventListener('deviceready', onDeviceReady, false);
        });
    });
