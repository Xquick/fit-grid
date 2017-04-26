/**
 * Created by amrazek on 21/03/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../ref.ts" />
var portal;
(function (portal) {
    'use strict';
    var DiscoverController = (function (_super) {
        __extends(DiscoverController, _super);
        function DiscoverController($scope, $dataService, $mdDialog, $translate) {
            _super.call(this, $scope, $dataService, $mdDialog, $translate);
        }
        DiscoverController.prototype.openAdvertDetailDialog = function ($event, advertId) {
            this.$dataService.advert = this.$dataService.getAdvertDetail(advertId);
            this.$dialog.show({
                templateUrl: 'templates/dialog/advert-detail.html',
                preserveScope: true,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };
        DiscoverController.prototype.cancel = function () {
            this.$dialog.cancel();
        };
        DiscoverController.$inject = ['$scope', '$DataService', '$mdDialog', '$translate'];
        return DiscoverController;
    }(portal.MainController));
    portal.DiscoverController = DiscoverController;
    angular.module('portal').controller('DiscoverController', portal.DiscoverController);
})(portal || (portal = {}));
//# sourceMappingURL=discover-controller.js.map