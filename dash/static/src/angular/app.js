'use strict';

var app = angular.module('dash.app', [
    'ngRoute',
    'ui.bootstrap',
    'door3.css',
    'dash.controllers',
    'dash.services'
]);

app.config(['$routeProvider', '$httpProvider', '$provide',
    function($routeProvider, $httpProvider, $provide) {
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
        $provide.decorator('$rootScope', function ($delegate) {
            var _emit = $delegate.$emit;
            $delegate.$emit = function () {
                console.log.apply(console, arguments);
                _emit.apply(this, arguments);
            };
            return $delegate;
        });
    }
]);

app.directive('ngConfirmClick', [
    function() {
        return {
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || 'Are you sure?';
                var clickAction = attr.confirmedClick;
                element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }
]);