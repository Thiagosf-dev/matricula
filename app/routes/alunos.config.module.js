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
            .when('/alunos', {
                templateUrl: 'app/views/aluno.html',
                controller: 'AlunoController',
                controllerAs: 'vm'
            })
            .when('/aluno/editar/:id', {
                templateUrl: 'app/views/aluno.form.html',
                controller: 'AlunoFormController',
                controllerAs: 'vm'
            })
            .when('/aluno/novo', {
                templateUrl: 'app/views/aluno.form.html',
                controller: 'AlunoFormController',
                controllerAs: 'vm'
            });
    }
})(angular);