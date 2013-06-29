/* global angular */

(function () {
    'use strict';

    function isBlank(str) {
        if (str === null || str === undefined) {
            str = '';
        }
        return (/^\s*$/).test(str);
    }

    function flashAlertDirective(flash, $timeout) {
        return {
            scope: true,
            link: function ($scope, element, attr) {
                var handle;

                $scope.flash = {};

                function removeAlertClasses() {
                    element.removeClass('alert-info');
                    element.removeClass('alert-warn');
                    element.removeClass('alert-error');
                    element.removeClass('alert-success');
                }

                function hide() {
                    $scope.flash = {};
                    removeAlertClasses();
                    if (!isBlank(attr.activeClass)) {
                        element.removeClass(attr.activeClass);
                    }
                }

                function show(message, type) {
                    if (handle) {
                        $timeout.cancel(handle);
                    }

                    $scope.flash.type = type;
                    $scope.flash.message = message;
                    removeAlertClasses();
                    element.addClass('alert-' + type);
                    if (!isBlank(attr.activeClass)) {
                        element.addClass(attr.activeClass);
                    }

                    handle = $timeout(hide, 5000);
                }

                flash.subscribe(function (message, type) {
                    if (!isBlank(attr.flashAlert) && attr.flashAlert !== type) {
                        return;
                    }
                    if (isBlank(message)) {
                        hide(type);
                    } else {
                        show(message, type);
                    }
                });
            }
        };
    }

    angular.module('angular-flash.flash-alert-directive', ['angular-flash.service'])
        .directive('flashAlert', ['flash', '$timeout', flashAlertDirective]);

}());