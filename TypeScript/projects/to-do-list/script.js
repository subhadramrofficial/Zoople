"use strict";
let tasks = [];
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            displayTasks();
        });
        const span = document.createElement("span");
        span.textContent = task.name;
        if (task.completed) {
            span.style.textDecoration = "line-through";
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            displayTasks();
        });
        li.append(checkbox, span, deleteBtn);
        taskList.appendChild(li);
    });
}
addBtn.addEventListener("click", () => {
    const name = input.value.trim();
    if (name === "") {
        return;
    }
    const newTask = {
        id: Date.now(),
        name: name,
        completed: false
    };
    tasks.push(newTask);
    input.value = "";
    displayTasks();
});
