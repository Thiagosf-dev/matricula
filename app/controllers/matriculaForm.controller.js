(function () {
    'use strict';

    angular
        .module('app')
        .controller('MatriculaFormController', matriculaFormController);

    matriculaFormController.$inject = ['$rootScope', '$routeParams', '$location', 'MatriculaService', 'AlunoService', 'CursoService'];

    function matriculaFormController($rootScope, $routeParams, $location, MatriculaService, AlunoService, CursoService) {
        $(document).ready(function () {
            $('button').tooltip();
        });

        $(document).ready(function () {
            $('span').tooltip();
        });

        $(document).ready(function () {
            $('a').tooltip();
        });

        $(document).ready(function () {
            $('div').tooltip();
        });

        var vm = this;

        init();

        // Funções
        vm.salvar = salvar;
        vm.cancelar = cancelar;
        vm.limparCampos = limparCampos;
        vm.confirmarLimparCampos = confirmarLimparCampos;
        vm.teste = teste;

        function teste() {
            console.log('teste().....');
        }

        function init() {
            $rootScope.abrirModal('modalLoading');
            carregarAlunos();
            carregarCursos();
            $rootScope.fecharModal('modalLoading');

            if ($routeParams.id) {
                vm.matricula = {};
                vm.isEdicao = true;

                configurarParaEdicao($routeParams.id);

                $routeParams.id = undefined;
                delete $rootScope.matricula;
            } else {
                vm.matricula = {};
                vm.isEdicao = false;
            }
        }

        function carregarCursos() {
            CursoService.listar()
                .then(function (response) {
                    vm.cursos = response.data;
                })
                .catch(function (erro) {
                    console.log('erro :', erro);
                });
        }

        function carregarAlunos() {
            AlunoService.listar()
                .then(function (response) {
                    vm.alunos = response.data;
                })
                .catch(function (erro) {
                    console.log('erro :', erro);
                });
        }

        function limparCampos() {
            vm.curso = {};
            // configurarEnderecoPadrao();
        }

        function confirmarLimparCampos() {
            $rootScope.fecharModal('modalLimpar');
            limparCampos();
        }

        function configurarParaEdicao(id) {
            vm.matricula = obterMatriculaPeloId(id);
        }

        function obterMatriculaPeloId(id) {
            var listaDeMatriculas = obterListaDeMatriculas();
            var matriculaObtida;

            if (angular.isDefined(listaDeMatriculas) && angular.isArray(listaDeMatriculas)) {
                matriculaObtida = listaDeMatriculas.filter(function (curso) {
                    return curso._id === id;
                });
            }

            return angular.isDefined(matriculaObtida) && angular.isArray(matriculaObtida) && matriculaObtida.length > 0 ?
                angular.copy(matriculaObtida[0]) :
                undefined;
        }

        function obterListaDeMatriculas() {
            return angular.isDefined($rootScope.matriculas) && angular.isArray($rootScope.matriculas) ?
                $rootScope.matriculas :
                undefined;
        }

        function salvar() {
            if (vm.isEdicao) {
                confirmarEditar();
            } else {
                confirmarSalvar();
            }
        }

        function confirmarEditar() {
            $rootScope.fecharModal('modalSalvar');
            $rootScope.abrirModal('modalLoading');

            MatriculaService.editar(vm.matricula)
                .then(function () {
                    limparCampos();
                    $rootScope.fecharModal('modalLoading');
                    $location.path('/matriculas');
                })
                .catch(function (error) {
                    console.log('error :', error);
                });
        }

        function confirmarSalvar() {
            $rootScope.fecharModal('modalSalvar');
            $rootScope.abrirModal('modalLoading');

            if (vm.matricula && angular.isDefined(vm.matricula) && angular.isObject(vm.matricula)) {
                MatriculaService.incluir(vm.matricula)
                    .then(function () {
                        limparCampos();
                        $rootScope.fecharModal('modalLoading');
                        $location.path('/matriculas');
                        mostrarMensagemGlobal(
                            'Matrícula realizada com sucesso',
                            'alert-success',
                            true
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                $rootScope.fecharModal('modalLoading');
            }
        }

        function cancelar() {
            limparCampos();
            $location.path('/matriculas');
        }

        function mostrarMensagemGlobal(msg, tipo, bool) {
            if (bool) {
                $rootScope.adicionarMensagem(msg, tipo);
                $rootScope.mostrarMensagem(bool);
            } else {
                $rootScope.mostrarMensagem(bool);
            }
        }
    }
}());