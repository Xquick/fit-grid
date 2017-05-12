/// <reference path="../ref.ts"/>


module portal {
    export class PlansController {
        public $cacheService: ICacheService;

        static $inject = ['$cacheService'];


        constructor($cacheService: ICacheService) {
            this.$cacheService = $cacheService;
            this.$cacheService.cacheUserWorkouts();
        }
    }

}
angular.module('portal').controller('PlansController', portal.PlansController);
