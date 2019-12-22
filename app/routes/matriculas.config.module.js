(function (angular) {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider', '$locationProvider', definirRotas]);

    function definirRotas($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $routeProvider
            .when('/matriculas', {
                templateUrl: 'app/views/matricula.html',
                controller: 'MatriculaController',
                controllerAs: 'vm'
            })
            .when('/matriculas/novo', {
                templateUrl: 'app/views/matricula.form.html',
                controller: 'MatriculaFormController',
                controllerAs: 'vm'
            })
            .when('/matriculas/editar/:id', {
                templateUrl: 'app/views/matricula.form.html',
                controller: 'MatriculaFormController',
                controllerAs: 'vm'
            });
    }
})(angular);