(function () {
    'use strict';

    angular
        .module('app')
        .controller('AlunoController', alunoController);

    alunoController.$inject = ['$rootScope', '$routeParams', '$location', 'AlunoService'];

    function alunoController($rootScope, $routeParams, $location, AlunoService) {
        $(document).ready(function () {
            $('button').tooltip();
        });

        $(document).ready(function () {
            $('span').tooltip();
        });

        $(document).ready(function () {
            $('a').tooltip();
        });

        var vm = this;

        init();

        // Funções
        vm.novo = novo;
        vm.editar = editar;
        vm.excluir = excluir;
        vm.fecharAlerta = fecharAlerta;

        function init() {
            verificarMensagemGlobal();

            AlunoService.listar()
                .then(function (response) {
                    vm.alunos = response.data;
                })
                .catch(function (error) {
                    console.log('error :', error);
                    console.log('Não foi possível estabelecer uma comunicação com o servidor. Dados temporários serão carregados.....');
                    carregarListaTemp();
                });
        }

        function verificarMensagemGlobal() {
            if ($rootScope.exibirMensagem) {
                mostrarAlerta($rootScope.tipoMensagem, $rootScope.mensagem);
            }
        }

        function carregarListaTemp() {
            vm.alunos = [{
                    matricula: 1,
                    nome: 'Nome01',
                    email: 'email01@email.com'
                },
                {
                    matricula: 2,
                    nome: 'Nome02',
                    email: 'email02@email.com.br'
                },
                {
                    matricula: 3,
                    nome: 'Nome03',
                    email: 'email03@email.com'
                },
                {
                    matricula: 4,
                    nome: 'Nome04',
                    email: 'email04@email.com.br'
                },
                {
                    matricula: 5,
                    nome: 'Nome05',
                    email: 'email05@email.com.br'
                }
            ]
        }

        function novo() {
            delete $routeParams.id;
            $location.path('/aluno/novo');
        }

        function editar(id) {
            $rootScope.alunos = vm.alunos;
            $location.path('/aluno/editar/' + id);
        }

        function excluir() {
            if (angular.isDefined(vm.alunoParaExcluir) && angular.isObject(vm.alunoParaExcluir) && vm.alunoParaExcluir) {
                AlunoService.excluir({
                        id: vm.alunoParaExcluir._id
                    })
                    .then(function (response) {
                        fecharModal('modalExcluir');
                        mostrarAlerta('alert-success', 'Aluno excluído com sucesso');
                        init();
                    })
                    .catch(function (error) {
                        console.log('error :', error);
                    });
            }
        }

        function obterAlunoPeloId(id) {
            var aluno = vm.alunos.filter(function (aluno) {
                return aluno._id === id;
            });

            return angular.isDefined(aluno) && angular.isArray(aluno) && aluno.length > 0 ?
                angular.copy(aluno[0]) :
                undefined;
        }

        function mostrarAlerta(tipo, mensagem) {
            if (angular.isDefined(mensagem) && angular.isString(mensagem)) {
                vm.mensagemDoAlerta = mensagem;
            }

            if (angular.isDefined(tipo) && angular.isString(tipo)) {
                vm.classeDoAlerta = tipo;
            }

            return (vm.exibirAlerta = (vm.mensagemDoAlerta && vm.classeDoAlerta) ? true : false) ? true : false;
        }

        function fecharAlerta() {
            $rootScope.mostrarMensagem(false);
            vm.mensagemDoAlerta = $rootScope.mensagem;
            vm.classeDoAlerta = $rootScope.tipoMensagem;
            vm.exibirAlerta = $rootScope.exibirMensagem;
        }

        function fecharModal(nomeDoModal) {
            $('#' + nomeDoModal).modal('hide');
        }
    }
}());