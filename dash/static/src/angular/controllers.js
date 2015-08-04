'use strict';

var controllers = angular.module('dash.controllers', []);

controllers.controller('MainController', ['$rootScope', '$scope', 'router', 'notifier',
    function($rootScope, $scope, router, notifier) {
        function updateGrid() {
            console.log('Updating grid');
            $('.gridster ul').gridster({
                widget_margins: [5, 5],
                widget_base_dimensions: [140, 140]
            });
        }

        $scope.router = router;
        updateGrid();
        sendAlert($rootScope, successAlert('Grid updated!'));
        // notifier.setDOMChangedHandler($rootScope, updateGrid);
    }
]);

controllers.controller('NotificationController', ['$scope', '$rootScope', '$timeout',
    function($scope, $rootScope, $timeout) {
        $scope.notifications = [];

        $scope.closeAlert = function(index) {
            $scope.notifications.splice(index, 1);
        };

        $scope.autoHide = function() {
            $timeout(function() {
                $scope.notifications.splice(0, 1);
            }, 3000);
        };

        $rootScope.$on('notification', function(event, notification) {
            console.log('Received alert', notification);
            $scope.notifications.push(notification);
            $scope.autoHide();
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