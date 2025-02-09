document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const categorySelect = document.getElementById('categorySelect'); // New: Category dropdown
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const searchInput = document.getElementById('searchInput'); // Search input
    const filterSelect = document.getElementById('filterSelect'); // Filter dropdown

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(
            task.text,
            task.priority,
            task.dueDate,
            task.category, // New: Category
            task.completed,
            task.completionTime
        ));
        updateProgress();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            priority: li.dataset.priority,
            dueDate: li.dataset.dueDate,
            category: li.dataset.category, // New: Save category
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
        const category = categorySelect.value; // New: Get category
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        addTaskToDOM(taskText, priority, dueDate, category, false);
        saveTasks();
        taskInput.value = '';
        dueDateInput.value = '';
    }

    function addTaskToDOM(text, priority, dueDate, category, completed, completionTime = null) {
        const li = document.createElement('li');
        li.dataset.priority = priority;
        li.dataset.dueDate = dueDate;
        li.dataset.category = category; // New: Store category
        li.classList.add(`priority-${priority}`); // For styling based on priority

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

        // Category
        if (category) {
            const categorySpan = document.createElement('span');
            categorySpan.textContent = `Category: ${category}`;
            categorySpan.classList.add('category');
            li.appendChild(categorySpan);
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
            const newText = prompt('Edit task:', taskText.textContent);
            const newDueDate = prompt('Edit due date (YYYY-MM-DD):', li.dataset.dueDate || '');
            const newCategory = prompt('Edit category:', li.dataset.category || ''); // New: Edit category

            if (newText && newText.trim() !== '') {
                taskText.textContent = newText.trim();
            }
            if (newDueDate) {
                li.dataset.dueDate = newDueDate;
                const dueDateSpan = li.querySelector('.due-date');
                if (dueDateSpan) {
                    dueDateSpan.textContent = `Due: ${newDueDate}`;
                } else {
                    const newDueDateSpan = document.createElement('span');
                    newDueDateSpan.textContent = `Due: ${newDueDate}`;
                    newDueDateSpan.classList.add('due-date');
                    li.appendChild(newDueDateSpan);
                }
            }
            if (newCategory) {
                li.dataset.category = newCategory;
                const categorySpan = li.querySelector('.category');
                if (categorySpan) {
                    categorySpan.textContent = `Category: ${newCategory}`;
                } else {
                    const newCategorySpan = document.createElement('span');
                    newCategorySpan.textContent = `Category: ${newCategory}`;
                    newCategorySpan.classList.add('category');
                    li.appendChild(newCategorySpan);
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

    // Search Functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        Array.from(taskList.children).forEach(li => {
            const taskText = li.querySelector('.task-text').textContent.toLowerCase();
            li.style.display = taskText.includes(query) ? 'flex' : 'none';
        });
    });

    // Filter Functionality
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

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
