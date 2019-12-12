(function () {
    'use strict';

    angular
        .module('app')
        .controller('AlunoController', alunoController);

    alunoController.$inject = ['$rootScope', '$routeParams', '$location', 'AlunoService'];

    function alunoController($rootScope, $routeParams, $location, AlunoService) {
        console.log('AlunoController().....');
        var vm = this;

        init();

        // Constantes
        var TIPOS_DE_ALERTA = {
            success: 'alert-success',
            danger: 'alert-danger',
            info: 'alert-info'
        };

        var CLASSES_DO_ALERTA = ['alert-success', 'alert-danger', 'alert-info'];

        // Funções
        vm.novo = novo;
        vm.editar = editar;
        vm.excluir = excluir;
        vm.fecharAlerta = fecharAlerta;

        function init() {
            AlunoService.listar()
                .then(function (response) {
                    vm.alunos = response.data;
                    console.log('vm.alunos :', vm.alunos);
                })
                .catch(function (error) {
                    console.log('error :', error);
                    console.log('Não foi possível estabelecer uma comunicação com o servidor. Dados temporários serão carregados.....');
                    carregarListaTemp();
                });
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
            $location.path('/alunos/editar/' + id);
        }

        function excluir(id) {
            var alunoExcluir = obterAlunoPeloId(id);

            if (angular.isDefined(alunoExcluir) &&
                angular.isObject(alunoExcluir) &&
                window.confirm(alunoExcluir.cor +
                    '\n' +
                    alunoExcluir.nome +
                    '\n\nDeseja excluir este aluno ?')
            ) {
                return AlunoService.excluir({
                        id: id
                    })
                    .then(function (response) {
                        console.log('Aluno excluído com sucesso...');
                        mostrarAlerta(TIPOS_DE_ALERTA.success, 'Aluno excluído com sucesso');
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
                vm.classeDoAlerta = CLASSES_DO_ALERTA
                    .filter(function (classe) {
                        return tipo === classe;
                    })
                    .toString();
            }

            return (vm.exibirAlerta = (vm.mensagemDoAlerta && vm.classeDoAlerta) ? true : false) ? true : false;
        }

        function fecharAlerta() {
            vm.mensagemDoAlerta = undefined;
            vm.classeDoAlerta = undefined;
            vm.exibirAlerta = undefined;
        }
    }
}());