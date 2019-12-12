(function () {
    'use strict';

    angular
        .module('app')
        .controller('AlunoFormController', alunoFormController);

    alunoFormController.$inject = ['$rootScope', '$routeParams', '$location', 'AlunoService'];

    function alunoFormController($rootScope, $routeParams, $location, AlunoService) {
        var vm = this;

        init();

        // Funções
        vm.salvar = salvar;
        vm.cancelar = cancelar;
        vm.limparCampos = limparCampos;

        function init() {
            carregarSelectDeEstados();

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

        function salvar() {
            if (vm.isEdicao) {
                confirmarEditar();
            } else {
                confirmarSalvar();
            }
        }

        function confirmarEditar() {
            var prontoParaEdicao = angular.isDefined(vm.aluno) && angular.isObject(vm.aluno);

            if (prontoParaEdicao && window.confirm('Editar os dados informados ?')) {
                AlunoService.editar(vm.aluno)
                    .then(function (response) {
                        console.log('response :', response);
                        limparCampos();
                        $location.path('/alunos');
                    })
                    .catch(function (error) {
                        console.log('error :', error);
                    });
            }
        }

        function confirmarSalvar() {
            var prontoParaSalvar = angular.isDefined(vm.aluno) && angular.isObject(vm.aluno);

            if (prontoParaSalvar && angular.isObject(vm.aluno)) {
                if (window.confirm('Salvar os dados informados ?')) {
                    AlunoService.incluir(vm.aluno)
                        .then(function (response) {
                            console.log('Aluno criado e salvo com sucesso...');
                            limparCampos();
                            $location.path('/alunos');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            } else {
                window.alert('Por favor preencha todos os campos obrigatórios');
            }
        }

        function limparCampos() {
            if (vm.isEdicao) {
                vm.aluno.nome = undefined;
                vm.aluno.email = undefined;
            } else {
                vm.aluno = undefined;
            }
        }

        function cancelar() {
            limparCampos();
            $location.path('/alunos');
        }

        function carregarSelectDeEstados() {
            if (angular.isDefined($rootScope.estados) && angular.isArray($rootScope.estados)) {
                vm.estados = $rootScope.estados;
                delete $rootScope.estados;
            }
            vm.estado = vm.estados[5];
        }
    }
}());