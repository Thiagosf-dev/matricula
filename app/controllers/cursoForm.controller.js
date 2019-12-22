(function () {
    'use strict';

    angular
        .module('app')
        .controller('CursoFormController', cursoFormController);

    cursoFormController.$inject = ['$rootScope', '$routeParams', '$location', 'CursoService'];

    function cursoFormController($rootScope, $routeParams, $location, CursoService) {
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
        // vm.buscarCep = buscarCep;
        vm.confirmarLimparCampos = confirmarLimparCampos;
        vm.teste = teste;

        function teste() {
            console.log('teste().....');
        }

        function init() {
            if ($routeParams.id) {
                vm.curso = {};
                vm.isEdicao = true;

                configurarParaEdicao($routeParams.id);

                $routeParams.id = undefined;
                delete $rootScope.curso;
            } else {
                vm.curso = {};
                // configurarEnderecoPadrao();
                vm.isEdicao = false;
            }
        }

        // function buscarCep() {
        //     if (vm.aluno.cep) {
        //         CursoService.consultarCep(vm.aluno.cep)
        //             .then(function (response) {
        //                 if (response.data.erro) {
        //                     return vm.aluno.cep = '';
        //                 }

        //                 vm.dadosDoCep = response.data;
        //                 configurarEnderecoDoCep();
        //             })
        //             .catch(function (error) {
        //                 vm.aluno.cep = '';
        //                 return console.log(error);
        //             });
        //     } else {
        //         limparCampos();
        //     }
        // }

        // function configurarEnderecoPadrao() {
        //     vm.aluno.cidade = 'Brasília';
        //     vm.aluno.estado = vm.estados[6];
        // }

        function limparCampos() {
            vm.curso = {};
            // configurarEnderecoPadrao();
        }

        function confirmarLimparCampos() {
            $rootScope.fecharModal('modalLimpar');
            limparCampos();
        }

        // function configurarEnderecoDoCep() {
        //     var estadoSetado = vm.estados.filter(function (estado) {
        //         return estado.sigla.toLowerCase() === vm.dadosDoCep.uf.toLowerCase();
        //     });
        //     vm.aluno.estado = estadoSetado[0];
        //     vm.aluno.cidade = vm.dadosDoCep.localidade;
        //     vm.aluno.logradouro = vm.dadosDoCep.logradouro;
        //     vm.aluno.bairro = vm.dadosDoCep.bairro;
        // }

        function configurarParaEdicao(id) {
            vm.curso = obterCursoPeloId(id);
        }

        function obterCursoPeloId(id) {
            var listaDeCursos = obterListaDeCursos();
            var cursoObtido;

            if (angular.isDefined(listaDeCursos) && angular.isArray(listaDeCursos)) {
                cursoObtido = listaDeCursos.filter(function (curso) {
                    return curso._id === id;
                });
            }

            return angular.isDefined(cursoObtido) && angular.isArray(cursoObtido) && cursoObtido.length > 0 ?
                angular.copy(cursoObtido[0]) :
                undefined;
        }

        function obterListaDeCursos() {
            return angular.isDefined($rootScope.cursos) && angular.isArray($rootScope.cursos) ?
                $rootScope.cursos :
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

            CursoService.editar(vm.curso)
                .then(function () {
                    limparCampos();
                    $rootScope.fecharModal('modalLoading');
                    $location.path('/cursos');
                })
                .catch(function (error) {
                    console.log('error :', error);
                });
        }

        function confirmarSalvar() {
            $rootScope.fecharModal('modalSalvar');
            $rootScope.abrirModal('modalLoading');

            if (vm.curso && angular.isDefined(vm.curso) && angular.isObject(vm.curso)) {
                CursoService.incluir(vm.curso)
                    .then(function () {
                        limparCampos();
                        $rootScope.fecharModal('modalLoading');
                        $location.path('/cursos');
                        mostrarMensagemGlobal(
                            'Curso cadastrado com sucesso',
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
            $location.path('/cursos');
        }

        // function carregarSelectDeEstados() {
        //     if (angular.isDefined($rootScope.estados) && angular.isArray($rootScope.estados)) {
        //         vm.estados = $rootScope.estados;
        //     }

        //     vm.estado = angular.copy(vm.estados[5]);
        // }

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