const button = document.getElementById('addTaskBtn');
const input = document.getElementById('taskInput');
const emptyImage = document.querySelector('.empty-image');
const taskList = document.getElementById('todoList');

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
        taskList.appendChild(listItem);
        input.value = '';
        emptyImage.style.display = 'none';
    }
});