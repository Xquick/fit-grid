/// <reference path="ref.ts" />
var app = angular.module('portal', ['ui.router', 'angular-inview', 'ngMaterial', 'ngMessages', 'ngAnimate', 'angularFileUpload',
    'ngDialog', 'angular-toArrayFilter', 'ngCacheBuster', 'pascalprecht.translate']);
app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.registerAvailableLanguageKeys(['cz']);
        $translateProvider.useStaticFilesLoader({
            prefix: '/locale-',
            suffix: '.json'
        });
        $translateProvider.use('cz');
    }]);
//# sourceMappingURL=app.js.map