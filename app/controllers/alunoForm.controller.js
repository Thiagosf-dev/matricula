(function () {
    'use strict';

    angular
        .module('app')
        .controller('AlunoFormController', alunoFormController);

    alunoFormController.$inject = ['$rootScope', '$routeParams', '$location', 'AlunoService'];

    function alunoFormController($rootScope, $routeParams, $location, AlunoService) {
        var vm = this;

        init();

        // Variáveis
        var aluno = {};

        // Funções
        vm.salvar = salvar;
        vm.cancelar = cancelar;
        vm.limparCampos = limparCampos;
        vm.buscarCep = buscarCep;
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
            console.log('object');
            carregarSelectDeEstados();
            configurarEnderecoPadrao();

            if ($routeParams.id) {
                vm.isEdicao = true;

                configurarParaEdicao($routeParams.id);

                $routeParams.id = undefined;
                delete $rootScope.alunos;
            } else {
                vm.isEdicao = false;
                configurarParaNovo();
            }
        }

        function buscarCep() {
            if (vm.cep) {
                AlunoService.consultarCep(vm.cep)
                    .then(function (response) {
                        if (response.data.erro) {
                            return vm.cep = '';
                        }

                        vm.dadosDoCep = response.data;
                        configurarEnderecoDoCep();
                    })
                    .catch(function (error) {
                        vm.cep = '';
                        return console.log(error);
                    });
            } else {
                limparCampos();
            }
        }

        function configurarEnderecoPadrao() {
            vm.estado = vm.estados[6];
            vm.cidade = 'Brasília';
        }

        function limparCampos() {
            vm.nome = '';
            vm.email = '';
            vm.cep = '';
            vm.cidade = '';
            vm.estado = '';
            vm.logradouro = '';
            vm.numero = '';
            vm.bairro = '';
            vm.complemento = '';
            vm.jaFezOutroCurs = '';
            configurarEnderecoPadrao();
        }

        function configurarEnderecoDoCep() {
            var estadoSetado = vm.estados.filter(function (estado) {
                return estado.sigla.toLowerCase() === vm.dadosDoCep.uf.toLowerCase();
            });
            vm.estado = estadoSetado[0];
            vm.cidade = vm.dadosDoCep.localidade;
            vm.logradouro = vm.dadosDoCep.logradouro;
            vm.bairro = vm.dadosDoCep.bairro;
        }

        function configurarParaEdicao(id) {
            var alunoEditar = obterAlunoPeloId(id);
            vm.aluno = angular.isDefined(alunoEditar) && angular.isObject(alunoEditar) ? alunoEditar : undefined;
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

        function configurarParaNovo() {
            vm.aluno = undefined;
        }

        function configurarDadosParaSalvar() {
            aluno = {
                nome: vm.nome,
                email: vm.email,
                cep: vm.cep,
                cidade: vm.cidade,
                estado: vm.estado,
                logradouro: vm.logradouro,
                numero: vm.numero,
                bairro: vm.bairro,
                complemento: vm.complemento,
                fezCurso: vm.jaFezOutroCurso
            }
        }

        function salvar() {
            if (vm.isEdicao) {
                confirmarEditar();
            } else {
                montarObjetoParaSalvar();
                confirmarSalvar();
            }
        }

        function confirmarEditar() {
            var prontoParaEdicao = angular.isDefined(vm.aluno) && angular.isObject(vm.aluno);

            if (prontoParaEdicao && window.confirm('Editar os dados informados ?')) {
                AlunoService.editar(vm.aluno)
                    .then(function (response) {
                        limparCampos();
                        $location.path('/alunos');
                    })
                    .catch(function (error) {
                        console.log('error :', error);
                    });
            }
        }

        function montarObjetoParaSalvar() {
            vm.aluno = {
                nome: vm.nome,
                email: vm.email,
                cep: vm.cep,
                cidade: vm.cidade,
                estadoNome: vm.estado.nome,
                estadoSigla: vm.estado.sigla,
                logradouro: vm.logradouro,
                bairro: vm.bairrro,
                complemento: vm.complemento
            };
        }

        function confirmarSalvar() {
            fecharModal('modalSalvar');
            abrirModal('modalLoading');
            var prontoParaSalvar = angular.isDefined(vm.aluno) && angular.isObject(vm.aluno);

            if (prontoParaSalvar && angular.isObject(vm.aluno)) {
                AlunoService.incluir(vm.aluno)
                    .then(function (response) {
                        limparCampos();
                        fecharModal('modalLoading');
                        $location.path('/alunos');
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
    }
}());