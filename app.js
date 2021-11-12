class Tarefa {
    constructor(tarefa){
        this.tarefa = tarefa;
    }

    validarDados(){
        if(this.tarefa == undefined || this.tarefa == '' || this.tarefa == null) {
            return false;
        }
        return true;
    }
}


class BancoDados {
    constructor() {
        let id = localStorage.getItem('id');

        if(id === null) {
            localStorage.setItem('id', 0);
            //setItem espera uma chave e um valor como parâmetros
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        //gravar espera um parâmetro (d) quando for estanciado
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);
    }

    recuperarRegistros() {
        let tarefas = Array();
        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++) {
            let tarefa = JSON.parse(localStorage.getItem(i))
            

            if(tarefa === null) {
                continue
            }
			
			tarefa.id = i
            tarefas.push(tarefa);
        }
        return tarefas;
    }

    remover(id){
		localStorage.removeItem(id)
	}


}

let bancoDados = new BancoDados();




function cadastrarTarefa() {
    let tarefaInput = document.getElementById('tarefa');
    //console.log(tarefaInput.value)

    let tarefa = new Tarefa(tarefaInput.value);
   // console.log(tarefa);

    //validarDados espera um valor booleano
    if(tarefa.validarDados()) {
        bancoDados.gravar(tarefa)
        document.location.reload()
        document.getElementById('tarefa').value = ''
    }
    
}

function carregarListaTarefas() {
    let tarefas = Array();
    tarefas = bancoDados.recuperarRegistros();

    let tLista = document.getElementById('listaTarefas');
    //console.log(tarefas);


    tarefas.forEach((d) => {


    let table = document.getElementById("myTable");
    let row = table.insertRow(d);
    let cell1 = row.insertCell(0);
    row.className = 'list-group-item d-flex justify-content-between'
    cell1.innerHTML = d.tarefa;

    
    
    //Criação do Botão 


    let btn = document.createElement('button')
    
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fa fa-times"  ></i>'
    row.insertCell(1).append(btn)
   

    //função de exclução com o botão
    btn.id = `id_tarefa_${d.id}`
    btn.onclick = function(){
        let id = this.id.replace('id_tarefa_','')
        bancoDados.remover(id)
        window.location.reload()
    }
     




})



  

}