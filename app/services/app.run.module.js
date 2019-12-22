(function (angular) {
    'use strict'

    angular
        .module('app')
        .run(carregarApp);

    carregarApp.$inject = ['$rootScope'];

    function carregarApp($rootScope) {
        $rootScope.estados = [{
                sigla: 'AC',
                nome: 'Acre'
            },
            {
                sigla: 'AL',
                nome: 'Alagoas'
            },
            {
                sigla: 'AP',
                nome: 'Amapá'
            },
            {
                sigla: 'AM',
                nome: 'Amazonas'
            },
            {
                sigla: 'BA',
                nome: 'Bahia'
            },
            {
                sigla: 'CE',
                nome: 'Ceará'
            },
            {
                sigla: 'DF',
                nome: 'Distrito Federal'
            },
            {
                sigla: 'ES',
                nome: 'Espírito Santo'
            },
            {
                sigla: 'GO',
                nome: 'Goías'
            },
            {
                sigla: 'MA',
                nome: 'Maranhão'
            },
            {
                sigla: 'MT',
                nome: 'Mato Grosso'
            },
            {
                sigla: 'MS',
                nome: 'Mato Grosso do Sul'
            },
            {
                sigla: 'MG',
                nome: 'Minas Gerais'
            },
            {
                sigla: 'PA',
                nome: 'Pará'
            },
            {
                sigla: 'PB',
                nome: 'Paraíba'
            },
            {
                sigla: 'PR',
                nome: 'Paraná'
            },
            {
                sigla: 'PE',
                nome: 'Pernambuco'
            },
            {
                sigla: 'PI',
                nome: 'Piauí'
            },
            {
                sigla: 'RJ',
                nome: 'Rio de Janeiro'
            },
            {
                sigla: 'RN',
                nome: 'Rio Grande do Norte'
            },
            {
                sigla: 'RS',
                nome: 'Rio Grande do Sul'
            },
            {
                sigla: 'RO',
                nome: 'Rondônia'
            },
            {
                sigla: 'RR',
                nome: 'Roraíma'
            },
            {
                sigla: 'SC',
                nome: 'Santa Catarina'
            },
            {
                sigla: 'SP',
                nome: 'São Paulo'
            },
            {
                sigla: 'SE',
                nome: 'Sergipe'
            },
            {
                sigla: 'TO',
                nome: 'Tocantins'
            },
        ];

        $rootScope.removerMensagem = function () {
            delete $rootScope.mensagem;
            delete $rootScope.tipoMensagem;
            delete $rootScope.exibirMensagem;
        };

        $rootScope.adicionarMensagem = function (msg, tipo) {
            $rootScope.removerMensagem();
            $rootScope.mensagem = msg;
            $rootScope.tipoMensagem = tipo;
        };

        $rootScope.mostrarMensagem = function (bool) {
            if (bool) {
                return $rootScope.exibirMensagem = true;
            }

            $rootScope.removerMensagem();
        };

        $rootScope.fecharModal = function (nomeDoModal) {
            $('#' + nomeDoModal).modal('hide');
        };

        $rootScope.abrirModal = function (nomeDoModal) {
            $('#' + nomeDoModal).modal('show');
        };
    }
})(angular);