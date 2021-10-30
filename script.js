const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
let tasks = localStorage.getItem('tasks') !== null ? localStorageTasks : [];

// Function that creates elements in the DOM based on received parameters
function addTaskIntoTheDOM({id, description, deadline}) {
    const li = document.createElement('li')
    li.innerHTML = `<input type="checkbox" class="complete">
    ${description} ${deadline}
    <button class="btnEdit" onclick="editTask(${id})">&#128393</button>
    <button class=btnDelete" onclick="removeTask(${id})">&#128465 </button>`
    li.setAttribute('id', id)
    taskList.append(li)
}

// Function that updates elements in the DOM
function init() {
    taskList.innerHTML = ''
    tasks.forEach(addTaskIntoTheDOM);
}

// Function that stores the contents of the "tasks" array in localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    init()
}

// Function that captures input values ​​and adds it to the "tasks" array
addTask.addEventListener('click', function() {
    const description = taskDescription.value
    const deadline = taskDate.value
    
// Check if the inputs have been filled
    if (description.value === '' || deadline.value === '' ) {
        alert('The fields must be filled in!');
        return
    }
    
// Function that creates a unique identifier
    function newID() {
        const myID = tasks.map(idElement => tasks.id)
        let numberID = Math.round(Math.random() * 1000)
        
        if (myID.indexOf(numberID) === -1) {
            return numberID
        } else {
            numberID = Math.round(Math.random() * 1000)        
        }
    }

// Adds the values ​​of entries in object format to the "tasks" array
    tasks.push({
        id: newID(),
        description: description,
        deadline: deadline
    })
    
    updateLocalStorage()
})

function removeTask(ID) {
    tasks = tasks.filter(tasks => tasks.id !== ID)
    updateLocalStorage()
}

function editTask(ID) {
    let editingTaskIndex = null
    const liEditing = document.getElementById(ID)
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === ID) {
            editingTaskIndex = i
            liEditing.innerHTML = `<input type="text" id="liTaskDescription"><br><input type="date" id="liTaskDate"><button onclick="saveEditTask(${i})">save</button>`
            
            liTaskDescription.value = tasks[i].description
            liTaskDate.value = tasks[i].deadline
        }
    }
}

function saveEditTask(i) {
    // Check if the inputs have been filled
    if (liTaskDescription.value === '' || liTaskDate.value === '' ) {
        alert('The fields must be filled in!');
        return
    }else{
        tasks[i].description = liTaskDescription.value
        tasks[i].deadline = liTaskDate.value
        updateLocalStorage()
    }
}

init()



