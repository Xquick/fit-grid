/**
 * Created by amrazek on 21/03/16.
 */
/// <reference path="../ref.ts" />
var portal;
(function (portal) {
    'use strict';
    var DataService = (function () {
        function DataService($http, $q, $rootScope) {
            this.$http = $http;
            this.$q = $q;
            this.$rootScope = $rootScope;
        }
        DataService.prototype.loadAdverts = function () {
            return this.$http.post(portal.config.api.url + 'ad_c/filterAds/', {})
                .then(function (response) {
                return response.data;
            });
        };
        DataService.prototype.getAdvertDetail = function (advertId) {
            if (this.advertList) {
                console.log('advert detail', _.find(this.advertList, { 'ad_id_pk': advertId }));
                return _.find(this.advertList, { 'ad_id_pk': advertId });
            }
        };
        DataService.$inject = ['$http', '$q', '$rootScope'];
        return DataService;
    }());
    portal.DataService = DataService;
})(portal || (portal = {}));
angular.module('portal').service('$DataService', portal.DataService);
//# sourceMappingURL=data-service.js.map