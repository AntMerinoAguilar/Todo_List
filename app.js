const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

window.addEventListener('load', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            addToList(task);
        });
    }
});

addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addToList(taskText);
        taskInput.value = '';
        saveTasksToLocalStorage();
    }
});

function addToList(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasksToLocalStorage();
    });

    taskList.appendChild(li);
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const tasksList = document.querySelectorAll('#taskList li span');
    tasksList.forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}