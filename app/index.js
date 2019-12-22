(function (angular) {
    'use strict';

    angular
        .module('app', [
            'ngCpfCnpj',
            'ui.mask',
            'ngRoute',
            'ngMessages',
            'alunoServiceApp',
            'cursoServiceApp',
            'matriculaServiceApp'
        ])
        .config(['$routeProvider', '$locationProvider', definirRotas]);

    function definirRotas($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $routeProvider
            .when('/', {
                templateUrl: 'app/views/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})(angular);