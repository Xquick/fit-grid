///<reference path="../ref.ts"/>
var portal;
(function (portal) {
    'use strict';
    var MainController = (function () {
        function MainController($scope, $dataService, $mdDialog, $translate) {
            this.$dataService = $dataService;
            this.$dialog = $mdDialog;
            this.$scope = $scope;
            this.$translate = $translate;
            console.log('construct Main');
            this.getAdverts();
        }
        MainController.prototype.getAdverts = function () {
            var _this = this;
            this.$dataService.loadAdverts().then(function (adverts) {
                _this.$dataService.advertList = adverts;
            });
        };
        MainController.prototype.setFilter = function () {
            //Implement
        };
        MainController.$inject = ['$scope', '$DataService', '$mdDialog', '$translate'];
        return MainController;
    }());
    portal.MainController = MainController;
    angular.module('portal').controller('MainController', portal.MainController);
})(portal || (portal = {}));
//# sourceMappingURL=main-controller.js.map