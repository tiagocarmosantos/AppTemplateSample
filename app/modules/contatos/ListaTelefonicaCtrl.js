(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("ListaTelefonicaController", ['$scope', '$timeout', 'contatosAPI', 'serialGenerator', ListaTelefonicaController])

    function ListaTelefonicaController($scope, $timeout, contatosAPI, serialGenerator) { 
        
        $scope.app = "Lista Telefônica";
        $scope.contatos = [];

        contatosAPI.getContatosInScope().then((contatos) => {
            $scope.contatos =  contatos;

            $scope.contatosNgTable = {
                data: 'contatos',
                class: 'table table-hover table-striped table-bordered table-condensed table-list table-stroke',
                search: 'pesquisarDados',
                select: 'selecionado',
                visualisable: 'visualizavel',
                editable: 'editavel',
                deletable: 'deletavel',
                columnDefs: [{
                    field: 'serial',
                    displayName: 'Serial',
                    hide: 'phone,tablet',
                    sort: true,
                    width: "10%",
                    priority: 4
                }, {
                    field: 'nome',
                    displayName: 'Nome',
                    sort: true,
                    width: "50%",
                    filter: 'capitalize',
                    priority: 1
                }, {
                    field: 'telefone',
                    displayName: 'Telefone',
                    hide: 'phone,tablet',
                    sort: true,
                    width: '20%',
                    priority: 3
                }, {
                    field: 'data',
                    displayName: 'Data',
                    sort: true,
                    width: '20%',
                    filter: 'date',
                    hide: 'phone',
                    priority: 2
                }],
                pager: { enable: true, startPage: 1, limitPerPage: 2, sizes: [2, 5, 8, 10], type:'local', class: 'pager' },
                rowSelectClick: function (e, row) {
                    console.log('Fui Clicado!');
                    return true;
                },
                rowDeleteClick: function (e, row) {
                    event.preventDefault();
                    console.log('Fui Clicado!');
                    return false;
                },
                rowEditClick: function (e, row) {
                    event.preventDefault();
                    console.log('Fui Clicado!');
                    return false;
                },
                rowViewClick: function (e, row) {
                    event.preventDefault();
                    console.log('Fui Clicado!');
                    return false;
                },
                pagerReloadClick: function (e, pagerConfig) {
                    console.log('Fui Atualizado!');
                }
            };
        })

        

        var init = function(){
            calcularImpostos($scope.contatos);
        };

        var calcularImpostos = function(contatos){
            contatos.forEach(function(contato){
                contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
            });
        }

        var carregarContatos = function () {
            contatosAPI.getContatos($scope);
        };

        $scope.apagarContatos = function(contatos){
            contatos.forEach(function(contato) {
                 if (contato.selecionado) contatosAPI.deleteContato($scope, contato);
            });
        };

        $scope.verificarContatoSelecionado = function(contatos) {
            $scope.hasContatoSelecionado = contatos.some(function(contato) {
                return contato.selecionado;
            });
        };

        $scope.ordernarPor = function(campo) {
            $scope.ordenarContato = campo;
            $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
        };
        
        var calcularImposto = function(preco){
            var imposto = 1.2;
            return preco * imposto;
        };


        (function initController() {
            init();
            //carregarContatos();

            //$timeout(function () { $('table').trigger('footable_redraw'); }, 0);
            $timeout(function () { $('.footable').footable(); }, 0);
        })();

    }

})()

