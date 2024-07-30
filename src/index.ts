const addForm = document.querySelector('#add-task') as HTMLFormElement;
const list = document.querySelector('#task-list ul') as HTMLUListElement;

const searchForm = document.getElementById('search-tasks') as HTMLFormElement;
const searchInput = searchForm.querySelector('input[type="text"]') as HTMLInputElement;

const editModal = document.querySelector('.modal') as HTMLDivElement;
const closeButton = document.querySelector('.close-button') as HTMLButtonElement;
const editForm = document.getElementById('edit-form') as HTMLFormElement;
const editInput = document.getElementById('edit-input') as HTMLInputElement;
const saveButton = document.getElementById('save-button') as HTMLButtonElement;
const cancelButton = document.getElementById('cancel-button') as HTMLButtonElement;
let currentTask: HTMLLIElement;


addForm.addEventListener('submit', function (e: Event): void {
    e.preventDefault();

    const inputElement = addForm.querySelector('input[type="text"]') as HTMLInputElement;
    let value = inputElement.value;
    inputElement.value = "";

    // Create Elements
    const li = document.createElement("li");
    const todoTitle = document.createElement("span");
    const todoEdit = document.createElement("span");
    const todoDelete = document.createElement("span");
    const todoActions = document.createElement("span");
    const todoCheckbox = document.createElement("input");

    // Add Content
    value = toSentenceCase(value);
    todoTitle.textContent = value;
    todoDelete.textContent = "delete";
    todoEdit.textContent = "edit";
    todoCheckbox.type = "checkbox";
    todoCheckbox.classList.add("task-checkbox");

    // Class name for styling
    todoTitle.className = "name";
    todoEdit.className = "edit";
    todoDelete.className = "delete";
    todoActions.className = "actions";
    todoCheckbox.className = "task-checkbox";

    // Append To DOM
    todoActions.appendChild(todoCheckbox);
    todoActions.appendChild(todoEdit);
    todoActions.appendChild(todoDelete);
    li.appendChild(todoTitle);
    li.appendChild(todoActions);
    list.appendChild(li);
});


searchForm.addEventListener('input', function (e: Event): void {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    filterTasks(searchTerm);
});

function filterTasks(searchTerm: string): void {
    const taskItems = list.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        const taskName = taskItems[i].querySelector('.name')!.textContent!.toLowerCase();
        if (taskName.includes(searchTerm)) {
            console.log("Found");
            taskItems[i].style.display = '';
        } else {
            taskItems[i].style.display = 'none';
        }
    }
}


function toSentenceCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

list.addEventListener('click', function (e: Event): void {
    const target = e.target as HTMLElement;

    // ---------------- Delete Book -------------------- //
    if (target.className === "delete") {
        const li = target.parentElement!.parentElement as HTMLLIElement;
        list.removeChild(li);
    }

    // Show Edit Modal
    if (target.className === "edit") {
        currentTask = target.parentElement!.parentElement as HTMLLIElement;
        console.log(currentTask);
        editInput.value = currentTask.querySelector('.name')!.textContent!;
        editModal.style.display = "block";
    }
});

// ------------------ Close Modal ------------------ //

closeButton.addEventListener('click', function (): void {
    editModal.style.display = 'none';
});

// ------------------ Save Changes ------------------ //
saveButton.addEventListener('click', function (): void {
    currentTask.querySelector('.name')!.textContent = toSentenceCase(editInput.value);
    editModal.style.display = 'none';
});

// ------------------ Cancel Editing ------------------ //
cancelButton.addEventListener('click', function (): void {
    editModal.style.display = 'none';
});