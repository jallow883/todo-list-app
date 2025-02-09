To update the **CSS** and **JavaScript** files, I'll incorporate all the features discussed so far, including sorting tasks by due date, marking the earliest task as urgent, and ensuring the "URGENT" label appears in red without affecting the task text color. Below are the fully updated files:

---

### **Updated CSS File**

```css
/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: auto; /* Ensure scrolling when content overflows */
    font-family: 'Poppins', sans-serif;
    background-color: #f9fafb;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    width: 400px;
    max-width: 90%;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    max-height: 80vh; /* Limit the container's height */
    overflow-y: auto; /* Enable vertical scrolling */
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: 600;
}

.input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
}

#taskInput {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

#taskInput:focus {
    border-color: #6366f1;
}

#prioritySelect, #dueDateInput, #categorySelect {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-size: 1rem;
    width: auto;
}

#dueDateInput {
    min-width: 120px;
    flex-shrink: 0;
}

#addTaskBtn {
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    flex-shrink: 0;
}

#addTaskBtn:hover {
    background-color: #4f46e5;
}

.filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
}

#searchInput {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

#searchInput:focus {
    border-color: #6366f1;
}

#filterSelect {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-size: 1rem;
    width: auto;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-height: 300px; /* Set a maximum height for the task list */
    overflow-y: auto; /* Enable vertical scrolling */
    border: 1px solid #e2e8f0; /* Optional: Add a border for better visibility */
    border-radius: 5px;
}

li {
    background: #f8fafc;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    transition: transform 0.2s ease, background-color 0.2s ease;
    position: relative;
}

li:hover {
    transform: scale(1.02);
    background-color: #edf2f7;
}

li.completed .task-text {
    text-decoration: line-through;
    color: #a0aec0;
}

.priority-high::before {
    content: '!';
    color: red;
    font-weight: bold;
    margin-right: 0.5rem;
}

.priority-medium::before {
    content: '!!';
    color: orange;
    font-weight: bold;
    margin-right: 0.5rem;
}

.priority-low::before {
    content: '!!!';
    color: green;
    font-weight: bold;
    margin-right: 0.5rem;
}

.due-date, .completion-date {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
}

.category {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
}

.button-group {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.delete-btn, .complete-btn, .edit-btn {
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.complete-btn {
    background-color: #28a745;
}

.edit-btn {
    background-color: #ffc107;
}

.delete-btn:hover {
    background-color: #c53030;
}

.complete-btn:hover {
    background-color: #218838;
}

.edit-btn:hover {
    background-color: #e0a800;
}

.progress-bar {
    background-color: #e2e8f0;
    height: 10px;
    border-radius: 5px;
    margin-top: 1.5rem;
    overflow: hidden;
}

#progressFill {
    height: 100%;
    width: 0%;
    background-color: #6366f1;
    transition: width 0.3s ease;
}

#progressText {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #666;
}

/* Styles for Urgent Tasks */
li.urgent::before {
    content: 'URGENT!';
    color: red; /* Red color for the "URGENT" label */
    font-weight: bold;
    margin-right: 0.5rem;
}

/* Ensure task text color remains unchanged */
li.urgent .task-text {
    color: inherit; /* Inherit the default text color */
    font-weight: normal; /* Ensure no bold styling is applied */
}

/* Responsive Design */
@media (max-width: 600px) {
    .container {
        max-height: 70vh; /* Reduce the container height on smaller screens */
    }
    ul {
        max-height: 200px; /* Reduce the task list height on smaller screens */
    }
}
```

---

### **Updated JavaScript File**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const categorySelect = document.getElementById('categorySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(
            task.text,
            task.priority,
            task.dueDate,
            task.category,
            task.completed,
            task.completionTime
        ));
        updateProgress();
        sortTasksByDueDate(); // Sort tasks after loading
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            priority: li.dataset.priority,
            dueDate: li.dataset.dueDate,
            category: li.dataset.category,
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
        const category = categorySelect.value;

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        addTaskToDOM(taskText, priority, dueDate, category, false);
        saveTasks();
        taskInput.value = '';
        dueDateInput.value = '';
        sortTasksByDueDate(); // Sort tasks after adding a new one
    }

    function addTaskToDOM(text, priority, dueDate, category, completed, completionTime = null) {
        const li = document.createElement('li');
        li.dataset.priority = priority;
        li.dataset.dueDate = dueDate;
        li.dataset.category = category;

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
            sortTasksByDueDate(); // Sort tasks after completing
        });
        li.appendChild(completeBtn);

        // Edit Task Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit task:', taskText.textContent);
            const newDueDate = prompt('Edit due date (YYYY-MM-DD):', li.dataset.dueDate || '');
            const newCategory = prompt('Edit category:', li.dataset.category || '');

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
            sortTasksByDueDate(); // Sort tasks after editing
        });
        li.appendChild(editBtn);

        // Delete Task Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
            sortTasksByDueDate(); // Sort tasks after deleting
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

    function sortTasksByDueDate() {
        const tasksArray = Array.from(taskList.children);

        // Sort tasks by due date (earliest first)
        tasksArray.sort((a, b) => {
            const dateA = a.dataset.dueDate ? new Date(a.dataset.dueDate) : Infinity; // No due date goes last
            const dateB = b.dataset.dueDate ? new Date(b.dataset.dueDate) : Infinity;
            return dateA - dateB;
        });

        // Re-append sorted tasks to the DOM
        tasksArray.forEach(task => taskList.appendChild(task));

        // Mark the earliest task as urgent
        markEarliestTaskAsUrgent();
    }

    function markEarliestTaskAsUrgent() {
        const tasksArray = Array.from(taskList.children);

        // Remove "urgent" class from all tasks
        tasksArray.forEach(task => task.classList.remove('urgent'));

        // Find the first task with a due date
        const earliestTask = tasksArray.find(task => task.dataset.dueDate);

        if (earliestTask) {
            earliestTask.classList.add('urgent'); // Add "urgent" class
        }
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
                li.style.display = '
