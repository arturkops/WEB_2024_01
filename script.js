let task_list = new Array();

//ADICIONAR TASK
function addTask(task) {
    task_list.push(task);
}

//CHECA SE ID JÁ ESTÁ EM USO 
function checkID(input) {
    if (task_list.length === 0) 
        return true
    else {
        for (let i = 0; i < task_list.length; i++) {
            if(task_list[i].id == input)
                return false
        }
        return true
    }
    
}

//BUBBLE SORT PARA ORDENAR TAREFAS
function bubbleSortById() {
    const n = task_list.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Comparar IDs 
            if (task_list[j].id > task_list[j + 1].id) {
                // Trocar elementos
                const temp = task_list[j];
                task_list[j] = task_list[j + 1];
                task_list[j + 1] = temp;
            }
        }
    }
}

//RENDERIZAR TAREFAS
function renderTasks() {
    t = document.getElementById('table_body');
    t.innerHTML = '';

    task_list.forEach((task) => {
        t.innerHTML += `
            <tr>
                <td>${task.id}</td>
                <td>${task.descricao}</td>
                <td>${task.responsavel}</td>
                <td>${task.inicio}</td>
                <td>${task.termino}</td>
                <td>${task.concluida}</td>
            </tr>
        `;
    });
}

//TASK MANAGER
function createTask(){
    const task = {
        id : +document.getElementById('id').value,
        descricao : document.getElementById('descricao').value,
        responsavel : document.getElementById('responsavel').value,
        inicio : document.getElementById('dataInicio').value,
        termino : document.getElementById('dataTermino').value,
        concluida : document.getElementById('concluida').checked
    };
    console.log(task.id);
    if(checkID(task.id)){
        addTask(task);
        bubbleSortById();
        renderTasks();   
    } else {
        alert("ID já utilizado");   
    }
}

function editTask() {
    const id = +document.getElementById('edit_id').value;
    const descricao = document.getElementById('edit_descricao').value;
    const responsavel = document.getElementById('edit_responsavel').value;
    const inicio = document.getElementById('edit_dataInicio').value;
    const termino = document.getElementById('edit_dataTermino').value;
    const concluida = document.getElementById('edit_concluida').checked;

    //Verifica se o id está certo
    const i = task_list.findIndex(task => task.id == id);
    if (i == -1) {
        alert("id não encontrada");
        return;
    }

    //Atualiza valores
    task_list[i].descricao = descricao;
    task_list[i].responsavel = responsavel;
    task_list[i].inicio = inicio;
    task_list[i].termino = termino;
    task_list[i].concluida = concluida;

    bubbleSortById()
    renderTasks();
}

function deleteTask() {
    const id = document.getElementById('delete_id').value;
    const i = task_list.findIndex(task => task.id == id);
    
    if (i == -1) {
        alert("id não encontrada:", id);
        return;
    }

    task_list.splice(i, 1);
    bubbleSortById()
    renderTasks();
}

function deleteAllTasks() {
    task_list = []; // Assign an empty array to clear the existing array
    renderTasks();
}

//IMPORTAR LISTAS
function exportList() {
    //Código Chatgpt que deu certo
    const json = JSON.stringify(task_list);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
}

function importList(arquivo) {
    const file = arquivo.files[0];
    if (!file) return; // Caso não selecionar arquivo
    
    const reader = new FileReader();

    reader.onload = function(event) {
        const jsonData = event.target.result;
        try {
            task_list = JSON.parse(jsonData);
            bubbleSortById()
            renderTasks();
            
            //Limpar o input para outras importações
            arquivo.value = null;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file); // Ler arquivo como texto
}


function showlog(){
    console.log(task_list);
    console.log(task_list.id,task_list.value)
}



