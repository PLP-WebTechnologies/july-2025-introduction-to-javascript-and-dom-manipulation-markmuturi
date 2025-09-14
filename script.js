// I have decided to create a simple Task Manager

console.log('=== DEBUGGING START ===');
console.log('Script starting to load....');

// Part 1 
// Variables for storing tasks, current filter, etc.
let tasks = [];
let currentFilter = 'all';
let taskIdCounter = 0;

// Get references for HTML elements we'll need to interact with
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskCounter");
const taskCounter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll('.filter-btn');

// Conditionals for:
// - Checking if input is empty before adding task
// - Filtering tasks by status
// - validating task operations


// Part 2
// Custom Functions
// Function 1 - Add Task
function addTask() {
    const taskText = taskInput.value.trim();

    // Check if the input is empty
    if (taskText === '') {
        alert('Please Enter a Task!');
        return; // Exists early if no text
    }

    // Check if task is too long
    if (taskText.length > 100) {
        alert('Task is too long! Keep it 100!');
        return;
    }

    // Create a new task object
    const newTask = {
        id: ++taskIdCounter,
        text: taskText,
        completed: false
    };

    // Add the new task to the task array
    tasks.push(newTask);

    // Clear input field for new task
    taskInput.value = '';

    // Update the display to show the new task
    renderTasks();
    updateCounter();

    console.log('Task Added:', newTask);
    alert('Task Successfuly Added!');
}

// Function 2 - Display all tasks on the page
console.log('Defining renderTasks function');
console.log('getFilteredtasks exists?', typeof getFilteredTasks);
function renderTasks() {
    console.log('=== renderTasks() START ===');
    // Clear the current task list
    taskList.innerHTML = '';

    // Debugging
    console.log('=== renderTasks DEBUG ===');
    console.log('currentFilter:', currentFilter);
    console.log('tasks:', tasks);

    // get filtered tasks with error handling
    let filteredTasks;
    try {
        filteredTasks = getFilteredTasks();
    } catch (error) {
        console.error('Error in getFilteredTasks():', error);
        filteredTasks = tasks;
    }

    // Ensure a valid array
    if (!filteredTasks || !Array.isArray(filteredTasks)) {
        console.error('filteredTasks is not an array:', filteredTasks);
        filteredTasks = [];
    }

    console.log('Using filteredTasks:', filteredTasks);

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks to show</li>';
    }

    
    // LOOP 1: Iterate through the filtered tasks and create HTML for each
    console.log('Starting for loop with', filteredTasks.length, 'tasks');
    for (let i = 0; i < filteredTasks.length; i++) {
        const task = filteredTasks[i];
        console.log('Processing task', i, ':', task);

        if (!task) {
            console.error('Invalid task at index', i, ':', task);
            continue;
        }

        // Create a new list item
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        // Add 'Completed' if task is done
        if(task.completed) {
            taskItem.classList.add('completed');
        }

        // Create HTML content for this task
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})">
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>   
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>    
        `;

    // Add task item to task list
    taskList.appendChild(taskItem);
}
console.log('=== renderTasks() END ===');    
}


//  FUNCTION 3: Toggle a task between completed and active
function toggleTask(taskid) {
    // LOOP 2: Find the task with the matching ID
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            // Flip the Status
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }

    // Update the display and the counter
    renderTasks();
    updateCounter();

    console.log('Task Toggled', taskId);
}

// FUNCTION 4: Delete a task
function deleteTask(taskId) {
    // Ask user to confirm deletion
    if (confirm('Are you sure you want to delete this task?')) {
        // Filter out task with matching ID and keep all others

        tasks = tasks.filter(task => task.id !== taskId);

        // Update the display and counter
        renderTasks();
        updateCounter();

        console.log('Task deleted:', taskId);
    }
}

// FUNCTION 5: Get tasks based on current filter
function getFilteredTasks() {
    console.log('=== getFilteredTasks() DEBUG ===');
    console.log('currentFilter:', currentFilter);
    console.log('tasks array:', tasks);
    console.log('tasks.length:', tasks.length);
    
    let result;
    
    // Return different tasks based on filter
    if (currentFilter === 'active') {
        result = tasks.filter(task => !task.completed);
        console.log('Active filter result:', result);
    } else if (currentFilter === 'completed') {
        result = tasks.filter(task => task.completed);
        console.log('Completed filter result', result);
    } else {
        result = tasks;
        console.log('All tasks result:', result);
    }

    console.log('Final result:', result);
    console.log('Is result an array?', Array.isArray(result));

    return result;
}

// FUNCTION 6: Update the task counter display
function updateCounter() {
    // Count how many tasks aren't completed
    const activeTasks = tasks.filter(task => !task.completed);
    const count = activeTasks.length;

    // Use singular or plural form
    const taskWord = count === 1 ? 'task': 'tasks';

    // Update counter text
    taskCounter.textContent = `${count} ${taskWord} remaining`;
}

// Part 3
// Loops
// Initialize filter buttons using forEach
if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTasks();
        });
    });
} else {
    console.error('No filter buttons found!');
}


// Adding event listener to the add button

addBtn.addEventListener('click', addTask);

// Adding event listener for the Enter key
taskInput.addEventListener('keypress', function(event) {
    // checking if the key was pressed
    if (event.key === 'Enter') {
        addTask();
    }
});

// Adding focus to input field when the page loads
window.addEventListener('load', function(){
    taskInput.focus();
    updateCounter();
});