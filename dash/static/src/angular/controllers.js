'use strict';

var dashControllers = angular.module('dash.controllers', []);

dashControllers.controller('MainController', ['$scope',
    function($scope) {
        $('.gridster ul').gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [140, 140]
        });
    }
]);

function sendAlert(scope, alert) {
    scope.$emit('notification', alert);
}

function successAlert(message) {
    return {
        type: 'success',
        message: message
    };
}

function warningAlert(message) {
    return {
        type: 'warning',
        message: message
    };
}
