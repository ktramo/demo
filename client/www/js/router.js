define(['jquery',
        'underscore',
        'backbone',
        'models/UserModel'],
    function($, _, Backbone, UserModel) {
        'use strict';

        var Router = Backbone.Router.extend({
            currentView: null,
            userModel: null,
            routes: {
                '':'registerView',
                'play': 'playView',
                'exit': 'exitView'
            },
            registerView: function() {
                if (this.currentView && this.currentView.close) {
                    this.currentView.close();
                }
                require(['views/RegisterView'],
                    function(RegisterView) {
                        router.currentView = new RegisterView();
                        $('#view').append(router.currentView.render().$el);
                    });
            },
            playView: function() {
                if (this.currentView && this.currentView.close) {
                    this.currentView.close();
                }
                require(['views/PlayView'],
                    function(PlayView) {
                        router.currentView = new PlayView({model: router.userModel});
                        $('#view').append(router.currentView.render().$el);
                    });
            },
            exitView: function() {
                if (this.currentView && this.currentView.close) {
                    this.currentView.close();
                }
                require(['views/ExitView'],
                    function(ExitView) {
                        router.currentView = new ExitView();
                        $('#view').append(router.currentView.render().$el);
                    });
            },
            gotoToPlayView: function(userData) {
                this.userModel = new UserModel(userData);
                this.navigate('play', {trigger: true});
            }
        });

        // only one
        var router = new Router();
        return router;
    });
