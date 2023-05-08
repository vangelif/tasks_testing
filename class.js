import itemsDisplay from "./index.js";

export class Task {
  constructor() {
    this.todo = JSON.parse(localStorage.getItem("storage-task")) ?? [];
  }

  addTask(description) {
    const completed = false;
    const index = this.todo.length + 1;
    const updatedToDo = [...this.todo, { completed, description, index }];
    this.updateStorage(updatedToDo);
  }

  removeTask(index) {
    const updatedToDo = this.todo.filter((todo) => todo.index !== index + 1);
    for (let i = 0; i < updatedToDo.length; i += 1) {
      updatedToDo[i].index = i + 1;
    }
    this.updateStorage(updatedToDo);
  }

  getFromStorage() {
    return this.todo;
  }

  updateStorage(data) {
    localStorage.setItem("storage-task", JSON.stringify(data));
    this.todo = data;
  }
}

export const eraseTicked = (tasks) => {
  tasks.todo = tasks.todo.filter((task) => !task.completed);
  for (let i = 0; i < tasks.todo.length; i += 1) {
    tasks.todo[i].index = i + 1;
  }
};

export const handleTasks = () => {
  const task = document.createElement("div");

  task.className = "todo-el";
  const isTicked = tasks.todo[i].completed ? "checked" : "";
  task.innerHTML = `
      <input type="checkbox" ${isTicked} onchange="toggleCheckbox(${i})">
      <p id="edit" contenteditable="true">${tasks.todo[i].description}</p>
      <div>
      <span class="trash" onclick="remove(${i})"><i class="fa-solid fa-trash-can">  </i></span>
        <button class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      </div>
      `;
  itemsDisplay.appendChild(task);
};

