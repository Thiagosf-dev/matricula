(function () {
    'use strict';

    angular
        .module('matriculaServiceApp', [])
        .service('MatriculaService', matriculaService);

    matriculaService.$inject = ['$http'];

    function matriculaService($http) {
        var BASE_URI = 'http://localhost:3000/api/matriculas/';

        this.listar = function () {
            return $http.get(BASE_URI);
        };

        this.incluir = function (curso) {
            return $http.post(BASE_URI, curso);
        };

        this.editar = function (curso) {
            return $http.put(BASE_URI + curso._id, curso);
        };

        this.excluir = function (id) {
            var parametros = {
                data: id,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            };
            return $http.delete(BASE_URI + id.id, parametros);
        };
    }
})();