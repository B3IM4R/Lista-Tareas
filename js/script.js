document.querySelector('.btn-add').addEventListener('click', () => {
    document.getElementById('taskModal').classList.remove('hidden');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('taskModal').classList.add('hidden');
});

document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('taskDate').value;
    const priority = document.getElementById('taskPriority').value;
    const category = document.getElementById('taskCategory').value;
    const description = document.getElementById('taskDescription').value;

    const task = {
        date,
        priority,
        category,
        description
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('taskModal').classList.add('hidden');
    displayTasks();
});

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksContainer = document.querySelector('.pending-tasks .cards-content');
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'card bg-white rounded-xl max-w-sm w-full mt-6 md:mt-8';
        taskElement.innerHTML = `
            <div class="card-header flex justify-between items-center px-5 py-2">
              <div class="date-cont flex items-center">
                <i class="bi-calendar-fill text-l"></i>
                <p class="ml-2">${task.date}</p>
              </div>
              <p class="priority font-semibold">${task.priority}</p>
            </div>
            <div class="line"></div>
            <div class="rounded-b-xl bg-rd-500 px-5 py-3">
              <h2 class="task-category text-lg mb-1">${task.category}</h2>
              <p class="task-description text-xl">${task.description}</p>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// Mostrar las tareas almacenadas al cargar la página
document.addEventListener('DOMContentLoaded', displayTasks);