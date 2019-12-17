(function () {
    'use strict';

    angular
        .module('alunoServiceApp', [])
        .service('AlunoService', alunoService);

    alunoService.$inject = ['$http'];

    function alunoService($http) {
        var BASE_URI = 'http://localhost:3000/api/contatos/';

        this.listar = function () {
            return $http.get(BASE_URI);
        };

        this.incluir = function (aluno) {
            return $http.post(BASE_URI, aluno);
        };

        this.editar = function (aluno) {
            return $http.put(BASE_URI + aluno._id, aluno);
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

        this.consultarCep = function (cep) {
            return $http.get('https://viacep.com.br/ws/' + cep + '/json/')
        }
    }
})();