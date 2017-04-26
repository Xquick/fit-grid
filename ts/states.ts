/**
 * Created by amrazek on 21/03/16.
 */

app.config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {

    //$urlRouterProvider.otherwise('/home');

    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('grid', {
            url: '/grid',
            templateUrl: 'templates/grid.html',
            controller: 'GridController'
        })

}).config(function ($mdIconProvider: angular.material.MDIconProvider): void {
    $mdIconProvider
        .iconSet('glyphicons', 'images/sprites/glyphicons.svg', 48);
});