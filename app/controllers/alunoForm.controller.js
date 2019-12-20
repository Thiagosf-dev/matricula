(function () {
    'use strict';

    angular
        .module('app')
        .controller('AlunoFormController', alunoFormController);

    alunoFormController.$inject = ['$rootScope', '$routeParams', '$location', 'AlunoService'];

    function alunoFormController($rootScope, $routeParams, $location, AlunoService) {
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
        vm.buscarCep = buscarCep;
        vm.confirmarLimparCampos = confirmarLimparCampos;
        vm.teste = teste;

        function teste() {
            console.log('teste().....');
        }

        function fecharModal(nomeDoModal) {
            $('#' + nomeDoModal).modal('hide');
        }

        function abrirModal(nomeDoModal) {
            $('#' + nomeDoModal).modal('show');
        }

        function init() {
            carregarSelectDeEstados();

            if ($routeParams.id) {
                vm.aluno = {};
                vm.isEdicao = true;

                configurarParaEdicao($routeParams.id);

                $routeParams.id = undefined;
                delete $rootScope.alunos;
            } else {
                vm.aluno = {};
                configurarEnderecoPadrao();
                vm.isEdicao = false;
            }
        }

        function buscarCep() {
            if (vm.aluno.cep) {
                AlunoService.consultarCep(vm.aluno.cep)
                    .then(function (response) {
                        if (response.data.erro) {
                            return vm.aluno.cep = '';
                        }

                        vm.dadosDoCep = response.data;
                        configurarEnderecoDoCep();
                    })
                    .catch(function (error) {
                        vm.aluno.cep = '';
                        return console.log(error);
                    });
            } else {
                limparCampos();
            }
        }

        function configurarEnderecoPadrao() {
            vm.aluno.cidade = 'Brasília';
            vm.aluno.estado = vm.estados[6];
        }

        function limparCampos() {
            vm.aluno = {};
            configurarEnderecoPadrao();
        }

        function confirmarLimparCampos() {
            fecharModal('modalLimpar');
            limparCampos();
        }

        function configurarEnderecoDoCep() {
            var estadoSetado = vm.estados.filter(function (estado) {
                return estado.sigla.toLowerCase() === vm.dadosDoCep.uf.toLowerCase();
            });
            console.log('estadoSetado :', estadoSetado);
            vm.aluno.estado = estadoSetado[0];
            vm.aluno.cidade = vm.dadosDoCep.localidade;
            vm.aluno.logradouro = vm.dadosDoCep.logradouro;
            vm.aluno.bairro = vm.dadosDoCep.bairro;
        }

        function configurarParaEdicao(id) {
            vm.aluno = obterAlunoPeloId(id);
        }

        function obterAlunoPeloId(id) {
            var listaDeAlunos = obterListaDeAlunos();
            var alunoObtido;

            if (angular.isDefined(listaDeAlunos) && angular.isArray(listaDeAlunos)) {
                alunoObtido = listaDeAlunos.filter(function (aluno) {
                    return aluno._id === id;
                });
            }

            return angular.isDefined(alunoObtido) && angular.isArray(alunoObtido) && alunoObtido.length > 0 ?
                angular.copy(alunoObtido[0]) :
                undefined;
        }

        function obterListaDeAlunos() {
            return angular.isDefined($rootScope.alunos) && angular.isArray($rootScope.alunos) ?
                $rootScope.alunos :
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
            fecharModal('modalSalvar');
            abrirModal('modalLoading');

            AlunoService.editar(vm.aluno)
                .then(function (response) {
                    limparCampos();
                    fecharModal('modalLoading');
                    $location.path('/alunos');
                })
                .catch(function (error) {
                    console.log('error :', error);
                });
        }

        function confirmarSalvar() {
            fecharModal('modalSalvar');
            abrirModal('modalLoading');

            if (vm.aluno && angular.isDefined(vm.aluno) && angular.isObject(vm.aluno)) {
                AlunoService.incluir(vm.aluno)
                    .then(function (response) {
                        limparCampos();
                        fecharModal('modalLoading');
                        $location.path('/alunos');
                        mostrarMensagemGlobal(
                            'Aluno cadastrado com sucesso',
                            'alert-success',
                            true
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                fecharModal('modalLoading');
                window.alert('Por favor preencha todos os campos obrigatórios');
            }
        }

        function cancelar() {
            limparCampos();
            $location.path('/alunos');
        }

        function carregarSelectDeEstados() {
            if (angular.isDefined($rootScope.estados) && angular.isArray($rootScope.estados)) {
                vm.estados = $rootScope.estados;
            }

            vm.estado = angular.copy(vm.estados[5]);
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