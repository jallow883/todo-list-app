document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.priority, task.dueDate, task.completed));
        updateProgress();
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            priority: li.dataset.priority,
            dueDate: li.dataset.dueDate,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateProgress();
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        addTaskToDOM(taskText, priority, dueDate, false);
        saveTasks();

        // Clear inputs
        taskInput.value = '';
        dueDateInput.value = '';
    }

    // Add task to the DOM
    function addTaskToDOM(text, priority, dueDate, completed) {
        const li = document.createElement('li');
        li.dataset.priority = priority;
        li.dataset.dueDate = dueDate;

        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = text;
        taskText.classList.add('task-text');
        li.appendChild(taskText);

        // Priority indicator
        li.classList.add(`priority-${priority}`);

        // Due date
        if (dueDate) {
            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = `Due: ${dueDate}`;
            dueDateSpan.style.fontSize = '0.8rem';
            dueDateSpan.style.color = '#666';
            li.appendChild(dueDateSpan);
        }

        // Add a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        // Mark task as completed when clicked
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Append the delete button to the list item
        li.appendChild(deleteBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        if (completed) {
            li.classList.add('completed');
        }
    }

    // Update progress bar
    function updateProgress() {
        const totalTasks = taskList.children.length;
        const completedTasks = Array.from(taskList.children).filter(li => li.classList.contains('completed')).length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Completed`;
    }

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', addTask);

    // Allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Search tasks
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        Array.from(taskList.children).forEach(li => {
            const taskText = li.querySelector('.task-text').textContent.toLowerCase();
            li.style.display = taskText.includes(query) ? 'flex' : 'none';
        });
    });

    // Filter tasks
    filterSelect.addEventListener('change', () => {
        const filter = filterSelect.value;
        Array.from(taskList.children).forEach(li => {
            if (filter === 'all') {
                li.style.display = 'flex';
            } else if (filter === 'pending' && !li.classList.contains('completed')) {
                li.style.display = 'flex';
            } else if (filter === 'completed' && li.classList.contains('completed')) {
                li.style.display = 'flex';
            } else {
                li.style.display = 'none';
            }
        });
    });

    // Load tasks on page load
    loadTasks();
});