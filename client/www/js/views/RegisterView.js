define([
    'underscore',
    'backbone',
    'jquery',
    'router',
    'config',
    'hbs!templates/registerView'
    ], function(_, Backbone, $, router, config, registerViewTemplate){
        'use strict';

        var registerView = Backbone.View.extend({
            id: 'registerView',

            events: {
                "click #registerButton": "register"
            },

            initialize: function() {
                // init
            },

            close: function() {
                // cleanup
                this.remove();
            },
            render: function() {
                this.$el.append($(registerViewTemplate()));
                return this;
            },

            register: function(event) {
                $('#registerButton').prop('disabled', true);
                $('#loading').removeClass('hidden');

                var url = config.serverUrl + 'register?name=' + $('#nameInput').val();
                $.ajax({
                    url:      url,
                    type:     "GET",
                    dataType: "json",
                    timeout:  5000
                }).done(function(data) {
                    console.log(data);
                    router.gotoToPlayView(data);
                }).fail(function(error) {
                    $('#noServer').removeClass('hidden');
                    setTimeout(function() {
                        $('#noServer').addClass('hidden');
                    }, 2000);
                }).always(function() {
                    $('#registerButton').prop('disabled', false);
                    $('#loading').addClass('hidden');
                });
            }
        });

        return registerView;
    });
