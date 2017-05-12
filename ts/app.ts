/// <reference path="ref.ts" />


var app: ng.IModule = angular.module('portal',
    ['ui.router', 'angular-inview', 'ngMaterial', 'ngMessages', 'ngAnimate', 'angularFileUpload',
        'ngDialog', 'angular-toArrayFilter', 'pascalprecht.translate', 'md.data.table', 'dndLists']);


app.config(['$translateProvider', function ($translateProvider: angular.translate.ITranslateProvider): void {
    $translateProvider.registerAvailableLanguageKeys(['cz']);

    $translateProvider.useStaticFilesLoader({
        prefix: '/locale-',
        suffix: '.json'
    });
    $translateProvider.use('cz');

}]).config(['$mdThemingProvider', function ($mdThemingProvider: angular.material.IThemingProvider): void {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange')
        .warnPalette('red');

}])
    .config(['$mdDateLocaleProvider',function($mdDateLocaleProvider: angular.material.IDateLocaleProvider): void {
    $mdDateLocaleProvider.formatDate = function(date: Date): string {
        return moment(date).format(portal.config.date.longFormat);
    };
}]);
