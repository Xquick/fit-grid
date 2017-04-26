/**
 * Created by amrazek on 21/03/16.
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('discover', {
        url: '/discover',
        templateUrl: 'templates/discover.html',
        controller: 'DiscoverController'
    })
        .state('favorite', {
        url: '/favorite',
        templateUrl: 'templates/favorite.html',
        controller: 'FavoriteController'
    })
        .state('roommates', {
        url: '/roommates',
        templateUrl: 'templates/roommates.html',
        controller: 'RoommatesController'
    })
        .state('suggested', {
        url: '/suggested',
        templateUrl: 'templates/suggested.html',
        controller: 'SuggestedController'
    });
}).config(function ($mdIconProvider) {
    $mdIconProvider
        .iconSet('glyphicons', 'images/sprites/glyphicons.svg', 48);
});
//# sourceMappingURL=states.js.map