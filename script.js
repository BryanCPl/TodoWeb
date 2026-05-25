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
        <span id="taskText" class="task-text">${taskText}</span>
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
            const taskTextElement = listItem.querySelector('.task-text');
            let currentText = taskTextElement.textContent;
            taskTextElement.contentEditable='true';
            if (taskTextElement.contentEditable === 'true') {
                taskTextElement.focus();
            }
            taskTextElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const newText = taskTextElement.textContent.trim();
                // Si queda vacío, restaurar texto anterior
                console.log(newText);
                if (newText === "") {
                    taskTextElement.textContent = currentText;
                } else {
                    // Guardar nuevo texto
                    currentText = newText;
                }

                // Salir del modo edición
                taskTextElement.contentEditable = false;
                taskTextElement.blur();
            }
            });
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