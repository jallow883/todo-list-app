document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.priority, task.dueDate, task.completed, task.completionTime));
        updateProgress();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            priority: li.dataset.priority,
            dueDate: li.dataset.dueDate,
            completed: li.classList.contains('completed'),
            completionTime: li.dataset.completionTime || null
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateProgress();
    }

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

        taskInput.value = '';
        dueDateInput.value = '';
    }

    function addTaskToDOM(text, priority, dueDate, completed, completionTime = null) {
        const li = document.createElement('li');
        li.dataset.priority = priority;
        li.dataset.dueDate = dueDate;

        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = text;
        taskText.classList.add('task-text');
        li.appendChild(taskText);

        // Due date
        if (dueDate) {
            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = `Due: ${dueDate}`;
            dueDateSpan.classList.add('due-date');
            li.appendChild(dueDateSpan);
        }

        // Completion date
        if (completed && completionTime) {
            const completionDateSpan = document.createElement('span');
            completionDateSpan.textContent = `Completed on: ${completionTime}`;
            completionDateSpan.classList.add('completion-date');
            li.appendChild(completionDateSpan);
        }

        // Complete Task Button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            if (li.classList.contains('completed')) {
                const now = new Date();
                const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
                li.dataset.completionTime = formattedTime;

                const completionDateSpan = document.createElement('span');
                completionDateSpan.textContent = `Completed on: ${formattedTime}`;
                completionDateSpan.classList.add('completion-date');
                li.appendChild(completionDateSpan);
            } else {
                li.dataset.completionTime = null;
                const completionDateSpan = li.querySelector('.completion-date');
                if (completionDateSpan) {
                    li.removeChild(completionDateSpan);
                }
            }
            saveTasks();
        });
        li.appendChild(completeBtn);

        // Edit Task Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            // Prompt for the new task text
            const newText = prompt('Edit task:', taskText.textContent);

            // Prompt for the new due date
            const currentDueDate = li.dataset.dueDate || ''; // Default to empty string if no due date exists
            const newDueDate = prompt('Edit due date (YYYY-MM-DD):', currentDueDate);

            // Update the task text if a new value is provided
            if (newText && newText.trim() !== '') {
                taskText.textContent = newText.trim();
            }

            // Update the due date if a new value is provided
            if (newDueDate) {
                li.dataset.dueDate = newDueDate; // Update the data attribute

                // Find the due date span in the DOM
                const dueDateSpan = li.querySelector('.due-date');
                if (dueDateSpan) {
                    dueDateSpan.textContent = `Due: ${newDueDate}`;
                } else {
                    // If the span doesn't exist, create and append a new one
                    const newDueDateSpan = document.createElement('span');
                    newDueDateSpan.textContent = `Due: ${newDueDate}`;
                    newDueDateSpan.classList.add('due-date');
                    li.appendChild(newDueDateSpan);
                }
            }

            saveTasks();
        });
        li.appendChild(editBtn);

        // Delete Task Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        if (completed) {
            li.classList.add('completed');
        }
    }

    function updateProgress() {
        const totalTasks = taskList.children.length;
        const completedTasks = Array.from(taskList.children).filter(li => li.classList.contains('completed')).length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Completed`;
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
