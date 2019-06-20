define([
    'underscore',
    'backbone',
    'jquery',
    'config',
    'hbs!templates/playView'
    ], function(_, Backbone, $, config, playViewTemplate){
        'use strict';

        var playView = Backbone.View.extend({
            id: 'playView',

            events: {
                "click img": "select"
            },

            initialize: function() {
                console.log('init');
            },

            close: function() {
                // cleanup
                this.remove();
            },
            render: function() {
                var userData = {
                    name: this.model.get('name'),
                    avatar: config.serverUrl + this.model.get('avatar')
                };
                this.$el.append($(playViewTemplate(userData)));

                return this;
            },
            select: function(event) {
                var selection = event.currentTarget.id;

                this.undelegateEvents();
                $('#loading').removeClass('hidden');
                $('#selectPanel').addClass('disabled');
                var url = config.serverUrl + 'play?selection=' + selection;
                $.ajax({
                    url:      url,
                    type:     "GET",
                    dataType: "json",
                    timeout:  5000
                }).done((function(data) {
                    //console.log(data);
                    var elem;
                    if (data.result === 'win') {
                        $('#computerSelection').text(data.computerSelection);
                        elem = $('#computer').add($('#win'));
                    } else if (data.result === 'lose') {
                        $('#computerSelection').text(data.computerSelection);
                        elem = $('#computer').add($('#lose'));
                    } else if (data.result === 'tie') {
                        $('#computerSelection').text(data.computerSelection);
                        elem = $('#computer').add($('#tie'));
                    } else {
                        elem = $('#error');
                    }

                    elem.removeClass('hidden');
                    setTimeout((function() {
                        elem.addClass('hidden');
                        this.delegateEvents();
                        $('#selectPanel').removeClass('disabled');
                    }).bind(this), 3000);
                }).bind(this)).fail((function(error) {
                    $('#noServer').removeClass('hidden');
                    setTimeout((function() {
                        $('#noServer').addClass('hidden');
                        this.delegateEvents();
                        $('#selectPanel').removeClass('disabled');
                    }).bind(this), 2000);
                }).bind(this)).always(function() {
                    $('#loading').addClass('hidden');
                });
            }
        });

        return playView;
    });
