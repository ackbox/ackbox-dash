angular.module('dash.app').directive('clock', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/src/angular/templates/widgets/clock/template.html',
        css: '/static/src/angular/templates/widgets/clock/style.css',
        controller: function($scope, $element, $interval) {
            $interval(function() {
                $scope.month_day_label = moment().format('MMMM Do');
                $scope.year_weekday_label = moment().format('YYYY, dddd');
                $scope.time_label = moment().format('h:mm:ss a');
            }, 1000);

            $interval(function() {
                var seconds = new Date().getSeconds();
                var sdegree = seconds * 6;
                var srotate = 'rotate(' + sdegree + 'deg)';

                $element.find('#sec').css({
                    '-moz-transform': srotate,
                    '-webkit-transform': srotate
                });
            }, 1000);

            $interval(function() {
                var hours = new Date().getHours();
                var mins = new Date().getMinutes();
                var hdegree = hours * 30 + (mins / 2);
                var hrotate = 'rotate(' + hdegree + 'deg)';

                $element.find('#hour').css({
                    '-moz-transform': hrotate,
                    '-webkit-transform': hrotate
                });
            }, 1000);

            $interval(function() {
                var mins = new Date().getMinutes();
                var mdegree = mins * 6;
                var mrotate = 'rotate(' + mdegree + 'deg)';

                $element.find('#min').css({
                    '-moz-transform': mrotate,
                    '-webkit-transform': mrotate
                });
            }, 1000);
        }
    }
});