/// <reference path="ref.ts" />


var app: ng.IModule = angular.module('portal',
    ['ui.router', 'angular-inview', 'ngMaterial', 'ngMessages', 'ngAnimate', 'angularFileUpload',
        'ngDialog', 'angular-toArrayFilter', 'ngCacheBuster','pascalprecht.translate', 'md.data.table']);


app.config(['$translateProvider', function ($translateProvider: translate.ITranslateProvider): void {
        $translateProvider.registerAvailableLanguageKeys(['cz']);

        $translateProvider.useStaticFilesLoader({
                prefix: '/locale-',
                suffix: '.json'
        });

        $translateProvider.use('cz');

}]);
