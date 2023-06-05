document.addEventListener("DOMContentLoaded", function() {
    const savedTasks = localStorage.getItem("tasks");
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");
    const taskList = document.getElementById("task-list");

    function renderTasks() {
        taskList.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const listItem = document.createElement("li");
            const taskActions = document.createElement("div");
            const completeButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            const taskName = document.createElement("span");

            listItem.className = "task-item";
            if (task.complete) {
                listItem.classList.add("complete");
            }
            taskActions.className = "task-actions";

            completeButton.className = "complete-button";
            completeButton.innerHTML = task.complete ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check"></i>';
            completeButton.addEventListener("click", () => toggleTaskComplete(i));

            deleteButton.className = "delete-button";
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener("click", () => deleteTask(i));

            taskName.className = "task-name";
            taskName.textContent = `${i+1} - ${task.name}`;

            listItem.appendChild(taskName);

            taskActions.appendChild(completeButton);
            taskActions.appendChild(deleteButton);

            listItem.appendChild(taskActions);
            taskList.appendChild(listItem);
        }
    }

    function addTask() {
        const taskName = taskInput.value.trim();
        if (taskName !== "") {
            const task = { name: taskName, complete: false };
            tasks.push(task);
            renderTasks();
            taskInput.value = "";
            saveTasks();
        } else {
            alert("Task name cannot be empty!");
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
        saveTasks();
    }

    function toggleTaskComplete(index) {
        tasks[index].complete = !tasks[index].complete;
        renderTasks();
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    renderTasks();
});
