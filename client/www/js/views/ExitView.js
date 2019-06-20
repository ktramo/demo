define([
    'underscore',
    'backbone',
    'jquery',
    //'text!../views/TitleItemTemplate.html',
    ], function(_, Backbone, $){
        'use strict';

        var exitView = Backbone.View.extend({
            id: 'playView',

            events: {
            },

            initialize: function() {
                // init
            },

            close: function() {
                // cleanup
                this.remove();
            },
            render: function() {
                this.$el.append('<h1>Bye!</h1>');
                return this;
            }
        });

        return exitView;
    });
