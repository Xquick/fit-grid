/**
 * Created by amrazek on 11/04/17.
 */

///<reference path="../ref.ts"/>

angular.module('portal')
    .directive('appHeader', function () {
        return {
            restrict: "E",
            scope: {
                appTitle: '@'
            },
            templateUrl: 'templates/directives/app-header.html',
            link: function(a){
                console.log(a);
            }
        };
    });