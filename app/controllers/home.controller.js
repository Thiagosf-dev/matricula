// Guia de estilo John papa https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/pt-BR.md
(function (angular) {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', homeController);

    homeController.$inject = ['$window'];

    function homeController($window) {

        var vm = this;
    }
})(angular);