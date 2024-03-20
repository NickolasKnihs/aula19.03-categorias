const espresso = require('express');
const meuServidor = espresso();
meuServidor.use(espresso.json());

const listaCategorias = [/*
    {
        id: 1,
        descricao: 'Mercado'
    },
    {
        id: 2,
        descricao: 'Trabalho'
    },
    {
        id: 3,
        descricao: 'Carro'
    },
    {
        id: 4,
        descricao: 'Casa'
    },
    {
        id: 5,
        descricao: 'Poupança'
    }    
*/];
const listaReceitas = [/*
    {
        id: 1,
        descricao: 'Salário',
        valor: 100.000,
        codigoCategoria: 1
    },
    {
        id: 2,
        descricao: 'Investimento',
        valor: 200.000,
        codigoCategoria: 2
    }
*/];
const listaDespesas = [/*
    {
        id: 1,
        descricao: '',
        valor: 100,
        codigoCategoria: 1
    },
    {
        id: 2,
        descricao: '',
        valor: 200,
        codigoCategoria: 2
    }
*/];

// **********************************************************
// ********************** Categorias ************************
// **********************************************************
// GET CATEGORIAS -> Rota de CONSULTAS
// http://localhost:4300/categorias
meuServidor.get('/categorias', (requisicao, resposta) => {
    let respostaCategorias = '';
    for (let index = 0; index < listaCategorias.length; index++) {
        const categoria = listaCategorias[index];
        respostaCategorias += '<p>';
        respostaCategorias += 'Codigo: ';
        respostaCategorias += categoria.id;
        respostaCategorias += '</br>Descricao: ';
        respostaCategorias += categoria.descricao;
        respostaCategorias += '</p>';
    }
    resposta.send(respostaCategorias);
});

//POST CATEGORIAS -> Rota de CADASTRO
meuServidor.post('/categorias', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao; 
    let codigo = -99999999999999999;
    for (let index = 0; index < listaCategorias.length; index++){
        const categoriaAtual = listaCategorias[index];
        if (categoriaAtual.id > codigo) {
            codigo = categoriaAtual.id;
        }
    }
    if (codigo < 0){
        codigo = 0;
    }
    const novoCategoria = {
        id: codigo + 1,
        descricao: descricao
    };
    listaCategorias.push(novoCategoria);
    resposta.send();
});
// exemplo: 
// POST http://localhost:4300/categorias
/* {
  "descricao": "Carro"
} */

//PUT CATEGORIAS -> Rota de ALTERAÇÃO / ATUALIZAÇÃO
meuServidor.put('/categorias/:categoriaId', (requisicao, resposta) => {
    const codigoCategoria = requisicao.params.categoriaId;
    const categoriaEncontrada = listaCategorias.find((categoriaAtual) => {
        return categoriaAtual.id == codigoCategoria;
    });
    const descricao = requisicao.body.descricao;
    categoriaEncontrada.descricao = descricao;
});

//DELETE CATEGORIAS -> Rota de REMOÇÃO / DELETAR
meuServidor.delete('/categorias/:categoriaId', (requisicao, resposta) => {
    const codigoCategoria = requisicao.params.categoriaId;
    const indiceCategoria = listaCategorias.findIndex((categoriaAtual) => {
        return categoriaAtual.id == codigoCategoria;
    });
    listaCategorias.splice(indiceCategoria, 1);
    resposta.send();
});

//GET CATEGORIAS -> Rota de CONSULTA DE USUÁRIO POR IDs
meuServidor.get('/categorias/:categoriaId', (requisicao, resposta) => {
    const codigoCategoria = requisicao.params.categoriaId;
    resposta.send(listaCategorias.find((categoriaAtual) => {
        return categoriaAtual.id == codigoCategoria;
    }));
    return;
});


// **********************************************************
// ************************ Receitas ************************
// **********************************************************
// GET RECEITAS -> Rota de CONSULTAS
meuServidor.get('/receitas', (requisicao, resposta) => {
    let respostaReceitas = '';
    for (let index = 0; index < listaReceitas.length; index++) {
        const receita = listaReceitas[index];
        respostaReceitas += '<p>';
        respostaReceitas += 'Codigo: ';
        respostaReceitas += receita.id;
        respostaReceitas += '</br>Descricao ';
        respostaReceitas += receita.descricao;
        respostaReceitas += '</br>Valor ';
        respostaReceitas += receita.valor;
        respostaReceitas += '</br>Categoria ';
        const categoriaEncontrada = listaCategorias.find((categoriaAtual) => {
            return categoriaAtual.id == receita.codigoCategoria;
        })
        respostaReceitas += categoriaEncontrada.descricao; 
        respostaReceitas += '<p>';    
    }
    resposta.send(respostaReceitas);
});

//POST RECEITAS -> Rota de CADASTRO
meuServidor.post('/receitas', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao;
    const valor = requisicao.body.valor;
    const codigoCategoria = requisicao.body.codigoCategoria;
    let codigo = -99999999999999999;
    for (let index = 0; index < listaReceitas.length; index++) {
        const receitaAtual = listaReceitas[index];
        if (receitaAtual.id > codigo) {
            codigo = receitaAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }
    const novaReceita = {
        id: codigo + 1,
        descricao: descricao,
        valor: valor,
        codigoCategoria: codigoCategoria
    };
    listaReceitas.push(novaReceita);
    resposta.send();
});

//PUT RECEITAS -> Rota de ALTERAÇÃO / ATUALIZAÇÃO
meuServidor.put('/receitas/:receitaId', (requisicao, resposta) => {
    const codigoReceita = requisicao.params.receitaId;
    const receitaEncontrada = listaReceitas.find((receitaAtual) => {
        return receitaAtual.id == codigoReceita;
    });
    const descricao = requisicao.body.descricao;
    const valor = requisicao.body.valor;
    const codigoCategoria = requisicao.body.codigoCategoria;
    resposta.send();
});

//DELETE RECEITAS -> Rota de REMOÇÃO / DELETAR
meuServidor.delete('/receitas/receitaId', (requisicao, resposta) =>{
    const codigoReceita = requisicao.params.receitaId;
    const indiceReceita = listaReceitas.findIndex((receitaAtual) => {
        return receitaAtual.id == codigoReceita;
    });
    listaReceitas.splice(indiceReceita, 1);
    resposta.send();
})

//GET DESPESAS -> Rota de CONSULTA DE USUÁRIO POR ID
meuServidor.get('/receitas/receitaId', (requisicao, resposta) => {
    const codigoReceita = requisicao.params.receitaId;
    resposta.send(listaReceitas.find((receitaAtual) => {
        return receitaAtual.id == codigoReceita;
    }));
    return;
})


// **********************************************************
// ************************ Despesas ************************
// **********************************************************
// GET DESPESAS -> Rota de CONSULTAS
meuServidor.get('despesas', (requisicao, resposta) => {
    let respostaDespesas = '';
    for (let index = 0; index < listaDespesas; index++) {
        const despesa = listaDespesas[index];
        respostaDespesas += '<p>';
        respostaDespesas += 'Codigo: ';
        respostaDespesas += despesa.id;
        respostaDespesas += '</br>Descricao ';
        respostaDespesas += despesa.descricao;
        respostaDespesas += '</br>Valor ';
        respostaDespesas += despesa.valor;
        respostaDespesas += '</br>Categoria: ';
        const categoriaEncontrada = listaCategorias.find((categoriaAtual) => {
            return categoriaAtual.id == despesa.codigoCategoria;
        })   
        respostaDespesas += categoriaEncontrada.descricao;
        respostaDespesas += '<p>';
    }
});

//POST DESPESAS -> Rota de CADASTRO
meuServidor.post('despesas', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao;
    const valor = requisicao.body.valor;
    const codigoCategoria = requisicao.body.codigoCategoria;
    let codigo = -99999999999999999;
    for (let index = 0; index < listaDespesas.length; index++) {
        const despesaAtual = listaDespesas[index];
        if (despesaAtual.id > codigo) {
            codigo = despesaAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }
    const novaDespesa = {
        id: codigo + 1,
        descricao: descricao,
        valor: valor,
        codigoCategoria: codigoCategoria
    };
    listaDespesas.push(novaDespesa);
    resposta.send();
});

//PUT DESPESAS -> Rota de ALTERAÇÃO / ATUALIZAÇÃO
meuServidor.put('/despesas/:despesaId', (requisicao, resposta) => {
    const codigoDespesa = requisicao.params.despesaId;
    const despesaEncontrada = listaDespesas.find((despesaAtual) => {
        return despesaAtual.id = codigoDespesa;
    });
    const descricao = requisicao.body.descricao;
    const valor = requisicao.body.valor;
    const codigoCategoria = requisicao.body.codigoCategoria;
    despesaEncontrada.descricao = descricao;
    despesaEncontrada.valor = valor;
    despesaEncontrada.codigoCategoria = codigoCategoria;
    resposta.send();
});

//DELETE DESPESAS -> Rota de REMOÇÃO / DELETAR
meuServidor.delete('/despesas/:despesaId', (requisicao, resposta) => {
    const codigoDespesa = requisicao.params.despesaId;
    const indiceDespesa = listaDespesas.findIndex((despesaAtual) => {
        return despesaAtual.id == codigoDespesa;
    });
    listaDespesas.splice(indiceDespesa, 1);
    resposta.send(); 
});

//GET DESPESAS -> Rota de CONSULTA DE USUÁRIO POR ID
meuServidor.get('/despesas/:despesaId', (requisicao, resposta) => {
    const codigoDespesa = requisicao.params.despesaId;
    resposta.send(listaDespesas.find((despesaAtual) => {
        return despesaAtual == codigoDespesa;
    }));
    return;
});


meuServidor.listen(4300, () => {
    console.log('Meu primeiro servidor na porta 4300.');
});