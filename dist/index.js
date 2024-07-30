"use strict";
const addForm = document.querySelector('#add-task');
const list = document.querySelector('#task-list ul');
const searchForm = document.getElementById('search-tasks');
const searchInput = searchForm.querySelector('input[type="text"]');
const editModal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
let currentTask;
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputElement = addForm.querySelector('input[type="text"]');
    let value = inputElement.value;
    inputElement.value = "";
    const li = document.createElement("li");
    const todoTitle = document.createElement("span");
    const todoEdit = document.createElement("span");
    const todoDelete = document.createElement("span");
    const todoActions = document.createElement("span");
    const todoCheckbox = document.createElement("input");
    value = toSentenceCase(value);
    todoTitle.textContent = value;
    todoDelete.textContent = "delete";
    todoEdit.textContent = "edit";
    todoCheckbox.type = "checkbox";
    todoCheckbox.classList.add("task-checkbox");
    todoTitle.className = "name";
    todoEdit.className = "edit";
    todoDelete.className = "delete";
    todoActions.className = "actions";
    todoCheckbox.className = "task-checkbox";
    todoActions.appendChild(todoCheckbox);
    todoActions.appendChild(todoEdit);
    todoActions.appendChild(todoDelete);
    li.appendChild(todoTitle);
    li.appendChild(todoActions);
    list.appendChild(li);
});
searchForm.addEventListener('input', function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    filterTasks(searchTerm);
});
function filterTasks(searchTerm) {
    const taskItems = list.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        const taskName = taskItems[i].querySelector('.name').textContent.toLowerCase();
        if (taskName.includes(searchTerm)) {
            console.log("Found");
            taskItems[i].style.display = '';
        }
        else {
            taskItems[i].style.display = 'none';
        }
    }
}
function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
list.addEventListener('click', function (e) {
    const target = e.target;
    if (target.className === "delete") {
        const li = target.parentElement.parentElement;
        list.removeChild(li);
    }
    if (target.className === "edit") {
        currentTask = target.parentElement.parentElement;
        console.log(currentTask);
        editInput.value = currentTask.querySelector('.name').textContent;
        editModal.style.display = "block";
    }
});
closeButton.addEventListener('click', function () {
    editModal.style.display = 'none';
});
saveButton.addEventListener('click', function () {
    currentTask.querySelector('.name').textContent = toSentenceCase(editInput.value);
    editModal.style.display = 'none';
});
cancelButton.addEventListener('click', function () {
    editModal.style.display = 'none';
});
//# sourceMappingURL=index.js.map