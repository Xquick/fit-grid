
app.config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {

    //$urlRouterProvider.otherwise('/home');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('grid', {
            url: '/grid',
            templateUrl: 'templates/grid.html',
            controller: 'GridController'
        })
        .state('plans', {
            url: '/plans',
            templateUrl: 'templates/plans.html',
            controller: 'PlansController'
        })

}).config(function ($mdIconProvider: angular.material.IIconProvider): void {
    $mdIconProvider
        .iconSet('glyphicons', 'images/sprites/glyphicons.svg', 48);
});