const list = document.querySelector('#task-list ul')
const addForm = document.forms["add-task"]
const searchForm = document.getElementById('search-tasks')
const searchInput = searchForm.querySelector('input[type="text"]')

const editModal = document.querySelector('.modal')
const closeButton = document.querySelector('.close-button')
const editForm = document.getElementById('edit-form')
const editInput = document.getElementById('edit-input')
const saveButton = document.getElementById('save-button')
const cancelButton = document.getElementById('cancel-button')
let currentTask

addForm.addEventListener('submit', function (e){
    e.preventDefault()
    let value = addForm.querySelector('input[type="text"]').value
    addForm.querySelector('input[type="text"]').value = ""
    //Create Elements
    const li = document.createElement("li")
    const todoTitle = document.createElement("span")
    const todoEdit = document.createElement("span")
    const todoDelete = document.createElement("span")
    const todoActions = document.createElement("span")
    const todoCheckbox = document.createElement("input");

    // add Content
    value = toSentenceCase(value)
    todoTitle.textContent = value
    todoDelete.textContent = "delete"
    todoEdit.textContent = "edit"
    todoCheckbox.type = "checkbox"
    todoCheckbox.classList.add("task-checkbox")

    // class name for styling
    todoTitle.className = "name"
    todoEdit.className = "edit"
    todoDelete.className = "delete"
    todoActions.className = "actions"
    todoCheckbox.className = "task-checkbox"
    

    // Append To DOM
    todoActions.appendChild(todoCheckbox)
    todoActions.appendChild(todoEdit)
    todoActions.appendChild(todoDelete)
    li.appendChild(todoTitle)
    li.appendChild(todoActions)
    list.appendChild(li)



})

// New search functionality
searchForm.addEventListener('input', function (e) {
    e.preventDefault()
    const searchTerm = searchInput.value.toLowerCase()
    filterTasks(searchTerm)
})

function filterTasks(searchTerm) {
    const taskItems = list.getElementsByTagName('li')
    for (let i = 0; i < taskItems.length; i++) {
        const taskName = taskItems[i].querySelector('.name').textContent.toLowerCase()
        if (taskName.includes(searchTerm)) {
            console.log("Found")
        } else {
            taskItems[i].style.display = 'none'
        }
    }
}



// Turning the input values into sentence case
function toSentenceCase(str) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

list.addEventListener('click', function (e){
    // ---------------- Delete Book -------------------- //
    if (e.target.className == "delete"){
        const li = e.target.parentElement.parentElement
        list.removeChild(li)
    }

    // Show Edit Modal
    if(e.target.className == "edit"){
        currentTask = e.target.parentElement.parentElement
        console.log(currentTask)
        editInput.value = currentTask.querySelector('.name').textContent
        editModal.style.display = "block"
    }

    // editInput.value = currentTask.querySelector('.name').textContent;
})

// ------------------ Close Modal ------------------ //

closeButton.addEventListener('click', function () {
    editModal.style.display = 'none'
});

// ------------------ Save Changes ------------------ //
saveButton.addEventListener('click', function () {
    currentTask.querySelector('.name').textContent = toSentenceCase(editInput.value)
    editModal.style.display = 'none'
});

// ------------------ Cancel Editing ------------------ //
cancelButton.addEventListener('click', function () {
    editModal.style.display = 'none'
});