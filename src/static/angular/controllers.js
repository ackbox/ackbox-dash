'use strict';

var dashControllers = angular.module('dash.controllers', []);

dashControllers.controller('MainController', ['$scope',
    function($scope) {}
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
