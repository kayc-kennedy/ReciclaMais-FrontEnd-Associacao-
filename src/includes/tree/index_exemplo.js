const Arvore = require("./Tree/Arvore")

let arv = new Arvore();

// Testes de Inserção
arv.inserir({id: 10, nome: 'abc'});
arv.inserir({id: 21, nome: 'abc'});
arv.inserir({id: 98, nome: 'abc'});
arv.inserir({id: 20, nome: 'abc'});
arv.inserir({id: 12, nome: 'abc'});
arv.inserir({id: 2, nome: 'abc'});
arv.inserir({id: 45, nome: 'abc'});
arv.inserir({id: 8, nome: 'abc'});
arv.inserir({id: 32, nome: 'abc'});
arv.inserir({id: 24, nome: 'abc'});
console.log(arv.raiz.filhoEsq);

// Testes de Remoção
arv.remover({id: 20, nome: 'abc'});
console.log(arv.raiz);

// Testes de Pesquisa de Dados
console.log(arv.pesquisar({id: 20, nome: 'abc'}));
console.log(arv.pesquisar({id: 5, nome: 'abc'}));
console.log(arv.pesquisar({id: 27, nome: 'abc'}));
console.log(arv.pesquisar({id: 2, nome: 'abc'}));
console.log(arv.pesquisar({id: 45, nome: 'abc'}));

// Testes de busca pelo ID
console.log(arv.buscar(45));
console.log(arv.buscar(27));

