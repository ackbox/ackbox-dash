'use strict';

var dashApp = angular.module('dash.app', [
    'ngRoute',
    'door3.css',
    'dash.controllers'
]);

dashApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        $routeProvider
            .when('/', {
                templateUrl: '/static/src/angular/templates/grid.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);