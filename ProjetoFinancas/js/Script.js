class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false;
            }
        }
        return true;
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id');
        if(id === null){
            localStorage.setItem('id', 0);
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }
    gravar(d){
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);
    }
    recuperarTodosRegistros(){
        let despesas = Array();
        let id = localStorage.getItem('id');
        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i));
            //testar se existe a possibilidade de haver índices que foram pulados/removidos
            if(despesa === null){
                continue;
            }
            despesa.id = i; //atribuir o id para cada despesa
            despesas.push(despesa);
        }
        return despesas;
    }
    pesquisar(despesa){
        let despesasFiltradas = Array();
        despesasFiltradas = this.recuperarTodosRegistros();
        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }
        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
        //descrição
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }
        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }
        return despesasFiltradas;
    }
    remover(id){
        localStorage.removeItem(id);
    }
}

let bd = new Bd();
function CadastrarDespesas(){
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    if(despesa.validarDados()){
        bd.gravar(despesa);
        //dialog de sucesso - utilizando o modal do bootstrap 5
        document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modalBody').innerHTML = 'Despesa foi cadastrada com sucesso!';
        document.getElementById('modalBotao').innerHTML = 'Voltar';
        document.getElementById('modalBotao').className = 'btn btn-success';
        let modal = new bootstrap.Modal(document.getElementById('modalRegistraDespesa'));
        modal.show();
        //limpar os campos
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {
        //dialog de erro
        document.getElementById('modalTitulo').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modalBody').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.';
        document.getElementById('modalBotao').innerHTML = 'Voltar e corrigir';
        document.getElementById('modalBotao').className = 'btn btn-danger';
        let modal = new bootstrap.Modal(document.getElementById('modalRegistraDespesa'));
        modal.show();
    }
}
function carregaListaDespesas(despesas = Array()){
    if(despesas.length == 0){
        despesas = bd.recuperarTodosRegistros();
    }
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';
    //percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        //criando a linha (tr)
        let linha = listaDespesas.insertRow();
        //criando as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        //ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação';
                break;
            case '2': d.tipo = 'Educação';
                break;
            case '3': d.tipo = 'Lazer';
                break;
            case '4': d.tipo = 'Saúde';
                break;
            case
            '5': d.tipo = 'Transporte';
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;
        //criar o botão de exclusão
        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${d.id}`;
        btn.onclick = function(){
            //remover a despesa
            let id = this.id.replace('id_despesa_', '');
            bd.remover(id);
            //remover a linha do registro da tabela, mas por enquanto só mostra o modal
            setTimeout(() => {
            let modal = new bootstrap.Modal(document.getElementById('modalRegistraDespesa'));
            modal.show();

        
            //modifica o conteúdo do modal
            document.getElementById('modalTitulo').innerHTML = 'Registro excluído com sucesso'
            document.getElementById('modalTitulo').className = 'modal-title text-success'
            document.getElementById('modalBody').innerHTML = '<p>O Item foi excluído com Sucesso.</p>'
            document.getElementById('modalBotao').className = 'btn btn-success'
            document.getElementById('modalBotao').innerHTML = 'Voltar'
            document.getElementById('modalBotao').removeAttribute('data-dismiss')
            document.getElementById('modalBotao').onclick = function() {
            window.location.reload()
            }
                }, 5000)
        }
        linha.insertCell(4).append(btn);
    });
}
function pesquisarDespesas(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
    let despesas = bd.pesquisar(despesa);
    carregaListaDespesas(despesas);
}

