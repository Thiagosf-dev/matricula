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
            .when('/cursos', {
                templateUrl: 'app/views/curso.html',
                controller: 'CursoController',
                controllerAs: 'vm'
            })
            .when('/cursos/novo', {
                templateUrl: 'app/views/curso.form.html',
                controller: 'CursoFormController',
                controllerAs: 'vm'
            })
            .when('/cursos/editar/:id', {
                templateUrl: 'app/views/curso.form.html',
                controller: 'CursoFormController',
                controllerAs: 'vm'
            });
    }
})(angular);