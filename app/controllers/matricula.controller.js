(function () {
    'use strict';

    angular
        .module('app')
        .controller('MatriculaController', matriculaController);

    matriculaController.$inject = ['$rootScope', '$routeParams', '$location', 'MatriculaService'];

    function matriculaController($rootScope, $routeParams, $location, MatriculaService) {
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
            $rootScope.abrirModal('modalLoading');
            verificarMensagemGlobal();

            MatriculaService.listar()
                .then(function (response) {
                    vm.matriculas = response.data;
                    $rootScope.fecharModal('modalLoading');
                })
                .catch(function (error) {
                    console.log('error :', error);
                    console.log('Não foi possível estabelecer uma comunicação com o servidor. Dados temporários serão carregados.....');
                    carregarListaTemp();
                    $rootScope.fecharModal('modalLoading');
                });
        }

        function verificarMensagemGlobal() {
            if ($rootScope.exibirMensagem) {
                mostrarAlerta($rootScope.tipoMensagem, $rootScope.mensagem);
            }
            delete $rootScope.tipoMensagem;
            delete $rootScope.mensagem;
        }

        function carregarListaTemp() {
            vm.cursos = [{
                    codigo: 1,
                    nome: 'Curso01',
                    valor: 100.0,
                    status: true
                },
                {
                    codigo: 2,
                    nome: 'Curso02',
                    valor: 100.0,
                    status: true
                },
                {
                    codigo: 3,
                    nome: 'Curso03',
                    valor: 100.0,
                    status: false
                },
                {
                    codigo: 4,
                    nome: 'Curso04',
                    valor: 100.0,
                    status: true
                },
                {
                    codigo: 5,
                    nome: 'Curso05',
                    valor: 100.0,
                    status: false
                }
            ]
        }

        function novo() {
            delete $routeParams.id;
            $location.path('/matriculas/novo');
        }

        function editar(id) {
            $rootScope.matriculas = vm.matriculas;
            $location.path('/matriculas/editar/' + id);
        }

        function excluir() {
            $rootScope.abrirModal('modalExcluir');
            if (angular.isDefined(vm.matriculaParaExcluir) && angular.isObject(vm.matriculaParaExcluir) && vm.matriculaParaExcluir) {
                MatriculaService.excluir({
                        id: vm.matriculaParaExcluir._id
                    })
                    .then(function (response) {
                        $rootScope.fecharModal('modalExcluir');
                        init();
                        $rootScope.fecharModal('modalLoading');
                        mostrarAlerta('alert-success', 'Matrícula excluída com sucesso');
                    })
                    .catch(function (error) {
                        console.log('error :', error);
                        $rootScope.fecharModal('modalExcluir');
                        $rootScope.fecharModal('modalLoading');
                    });
            }
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
    }
}());