const button = document.getElementById('addTaskBtn');
const input = document.getElementById('taskInput');
const emptyImage = document.querySelector('.empty-image');
const taskList = document.getElementById('todoList');

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});

button.addEventListener('click', function() {
    let taskText = input.value.trim();
    if (taskText !== '') {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        ${taskText}
        <div class="button-container">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>`;

        listItem.querySelector('.task-checkbox').addEventListener('change', function() {
            if (this.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        });

        listItem.querySelector('.edit-btn').addEventListener('click', function() {
            let newTaskText = prompt('Edit task:', taskText);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                listItem.childNodes[1].textContent = newTaskText.trim();
                taskText = newTaskText.trim();
            }
        });

        listItem.querySelector('.delete-btn').addEventListener('click', function() {
            taskList.removeChild(listItem);
            if (taskList.children.length === 0) {
                emptyImage.style.display = 'block';
            }
        });

        
        taskList.appendChild(listItem);
        input.value = '';
        emptyImage.style.display = 'none';
    }
});