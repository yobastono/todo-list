const inputText = document.querySelector('.write-todo');
const addTodoBtn = document.querySelector('.btn-add-todo');
const deleteAllBtn = document.querySelector('.btn-delete-all');

const listTodoContainer = document.querySelector('.list-todo-container');
const savedTodos = [];
var counter = 2;

addTodoBtn.addEventListener('click', (e) => {
    let todoText = inputText.value;
    buildTodoTask(todoText);
    inputText.value = '';
});

deleteAllBtn.addEventListener('click', e => {
    counter = 2;
    while ( listTodoContainer.firstElementChild ) {
        listTodoContainer.firstElementChild.remove();
    }
});

function buildTodoTask(value) {
    let form = document.createElement('form');
    form.classList.add('row', 'g2', 'single-item');
    let div = document.createElement('div');
    div.classList.add('col-auto');
    let labelDate = document.createElement('span');
    labelDate.classList.add('.input-group-addon');
    let date = new Date(2021, 6, counter);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    counter++;
    let dateShort = day + "-" + month + "-" + year;
    labelDate.textContent = dateShort;
    let savedTodo = document.createElement('input');
    savedTodo.setAttribute('type', 'text');
    savedTodo.readOnly = true;
    savedTodo.value = value;
    savedTodos.push(savedTodo);
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.textContent = "Delete";
    deleteBtn.type = 'button';
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-warning');
    editBtn.textContent = "Edit";
    editBtn.type = 'button';

    listTodoContainer.appendChild(form);
    form.appendChild(labelDate);
    form.appendChild(div);
    div.appendChild(savedTodo);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
    deleteTodo(deleteBtn);
    editTodo(editBtn);
    let today = new Date().getDate();
    console.log(today);
    let todos = document.getElementsByClassName('.input-group-addon');
    let myRe = /^(\d+)-/g;
    for (let i = 0; i < todos.length; i++) {
        let textContentDay = todos[i].textContent;
        console.log("textContentDay:", textContentDay);
        let extractedDay = myRe.exec(textContentDay)[1]
        console.log("extracted day: ", extractedDay);
        if (parseInt(extractedDay) === today) {
            todos[i].parentNode.classList.add('today');
        }
        myRe.lastIndex = 0;
    }     
}

function deleteTodo(button) {
    button.addEventListener('click', e => {
        let targetElement = e.target.parentNode.parentNode;
        targetElement.parentNode.removeChild(targetElement);
    });
}

function toggleEditConfirm(button, e) {
    let saveBtn = document.createElement('button');
    saveBtn.classList.add('btn', 'btn-success');
    saveBtn.type = 'button';
    saveBtn.textContent = "Save";
    button.insertAdjacentElement('beforebegin', saveBtn);
    button.remove();
    saveBtn.addEventListener('click', (e) => {
        e.target.parentNode.children[0].readOnly = true;
        console.log('Todo edited and saved');
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning');
        editBtn.textContent = "Edit";
        editBtn.type = 'button';
        saveBtn.insertAdjacentElement('beforebegin', editBtn);
        editTodo(editBtn);
        saveBtn.remove();
    });
}

function editTodo(editBtn) {
    editBtn.addEventListener('click', e => {
        e.target.parentNode.children[0].readOnly = false;
        console.log("You can edit now.");
        toggleEditConfirm(editBtn, e);
    });
}

function deleteAll() {

}