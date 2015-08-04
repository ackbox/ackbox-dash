'use strict';

var services = angular.module('dash.services', []);

services.service('router', ['$location',
    function($location) {
        this.templatesUrl = function(filename) {
            return '/static/src/angular/templates/' + filename;
        };

        this.appUrl = function(path) {
            return $location.path(path);
        };
    }
]);

services.service('notifier', [
    function() {
        this.sendDOMChanged = function(scope) {
            console.log('Sending DOM changed event');
            scope.$emit('dashDOMChanged', {});
        };

        this.setDOMChangedHandler = function(rootScope, handler) {
            rootScope.$on('dashDOMChanged', function(event, object) {
                console.log('Received DOM change event', object);
                handler();
            });
        };
    }
]);