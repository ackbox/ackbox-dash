'use strict';

var dashApp = angular.module('dash.app', [
    'ngRoute',
    'dash.controllers'
]);

dashApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        $routeProvider
            .when('/', {
                templateUrl: '/static/angular/templates/index.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);