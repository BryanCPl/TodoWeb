const button = document.getElementById('addTaskBtn');
const input = document.getElementById('taskInput');
const emptyImage = document.querySelector('.empty-image');
const taskList = document.getElementById('todoList');
const progressBar = document.getElementById('progress');
const progressnumber = document.getElementById('number');
const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu');
const menuIcon = document.getElementById('menu-icon');
const inputVideo = document.getElementById('selector-video');
const videoSource = document.getElementById('video-source');
const newbutton = document.getElementById('new-button');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');


saveButton.addEventListener('click', () => {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((taskItem) => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const isCompleted = taskItem.querySelector('.task-checkbox').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

loadButton.addEventListener('click', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        taskList.innerHTML = '';
        savedTasks.forEach((task) => {
            addNewTask(task.text, task.completed);
        });
        updateProgressBar();
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }
});

            
            

newbutton.addEventListener('click', () => {
    // Limpiar la lista de tareas
    taskList.innerHTML = '';
    // Reiniciar la barra de progreso
    updateProgressBar();
    // Mostrar la imagen de "no hay tareas"
    emptyImage.style.display = 'block';
});

inputVideo.addEventListener('change', function() {
    // 1. Obtener el archivo del arreglo 'files'
    const archivo = this.files[0];
    
    if (archivo) {
        const urlVideo = URL.createObjectURL(archivo);
        videoSource.src = urlVideo;
        videoSource.parentElement.load(); // Recargar el video para que tome el nuevo source
      // Aquí ya tienes el archivo listo para usar
    }
});

menuToggle.addEventListener('click', () => {
    if (menu.classList.contains('menuActive')) {
        menu.classList.remove('menuActive');
        menuIcon.src = "resource/menu.png";
    } else {
        menu.classList.add('menuActive');
        menuIcon.src = "resource/back.png";
    }

});

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        updateProgressBar();
        button.click();
    }
});


const updateProgressBar = (checkCompletion=true) => {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.task-checkbox:checked').length;
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressnumber.textContent = `${completedTasks} / ${totalTasks}`;
}

button.addEventListener('click', function() {
    let taskText = input.value.trim();
    
    if (taskText !== '') {
        addNewTask(taskText, false)
        };

    });

function addNewTask(taskText, isCompleted)  {
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
            updateProgressBar();
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
            updateProgressBar(false);
            taskList.removeChild(listItem);
            if (taskList.children.length === 0) {
                emptyImage.style.display = 'block';
            }
            updateProgressBar();
        });

        
        taskList.appendChild(listItem);
        updateProgressBar();
        input.value = '';
        emptyImage.style.display = 'none';
    };



        