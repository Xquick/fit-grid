/// <reference path="ref.ts" />


var app: ng.IModule = angular.module('portal',
    ['ui.router', 'angular-inview', 'ngMaterial', 'ngMessages', 'ngAnimate', 'angularFileUpload',
        'ngDialog', 'angular-toArrayFilter', 'pascalprecht.translate', 'md.data.table', 'dndLists']);


app.config(['$translateProvider', function ($translateProvider: translate.ITranslateProvider): void {
    $translateProvider.registerAvailableLanguageKeys(['cz']);

    $translateProvider.useStaticFilesLoader({
        prefix: '/locale-',
        suffix: '.json'
    });

    $translateProvider.use('cz');
}]).config(['$mdThemingProvider', function ($mdThemingProvider: angular.material.MDThemingProvider): void {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange')
        .warnPalette('red');
}]);
